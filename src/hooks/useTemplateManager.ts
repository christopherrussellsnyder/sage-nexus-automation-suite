
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface SavedTemplate {
  id: string;
  template_name: string;
  feature_type: 'website' | 'advertising' | 'email' | 'social';
  template_data: any;
  business_info: any;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export const useTemplateManager = () => {
  const [templates, setTemplates] = useState<SavedTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('saved_templates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTemplate = async (
    templateName: string,
    featureType: 'website' | 'advertising' | 'email' | 'social',
    templateData: any,
    businessInfo: any
  ): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('saved_templates')
        .insert({
          user_id: user.id,
          template_name: templateName,
          feature_type: featureType,
          template_data: templateData,
          business_info: businessInfo
        });

      if (error) throw error;

      toast({
        title: "Template Saved",
        description: `"${templateName}" has been saved to your templates.`,
      });

      await fetchTemplates();
      return true;
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: "Error",
        description: "Failed to save template. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteTemplate = async (templateId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('saved_templates')
        .delete()
        .eq('id', templateId);

      if (error) throw error;

      toast({
        title: "Template Deleted",
        description: "Template has been removed from your saved templates.",
      });

      await fetchTemplates();
      return true;
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Error",
        description: "Failed to delete template. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const toggleFavorite = async (templateId: string, isFavorite: boolean): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('saved_templates')
        .update({ is_favorite: isFavorite })
        .eq('id', templateId);

      if (error) throw error;

      setTemplates(prev => prev.map(template => 
        template.id === templateId ? { ...template, is_favorite: isFavorite } : template
      ));

      return true;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  };

  const getTemplatesByType = (featureType: string) => {
    return templates.filter(template => template.feature_type === featureType);
  };

  const getFavoriteTemplates = () => {
    return templates.filter(template => template.is_favorite);
  };

  return {
    templates,
    loading,
    saveTemplate,
    deleteTemplate,
    toggleFavorite,
    getTemplatesByType,
    getFavoriteTemplates,
    refreshTemplates: fetchTemplates
  };
};
