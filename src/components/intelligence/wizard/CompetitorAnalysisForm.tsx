
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Search } from 'lucide-react';

interface CompetitorAnalysisFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const CompetitorAnalysisForm = ({ data, onChange }: CompetitorAnalysisFormProps) => {
  const addCompetitor = () => {
    const competitors = data.competitors || [];
    onChange('competitors', [...competitors, { name: '', website: '', strengths: '', weaknesses: '' }]);
  };

  const removeCompetitor = (index: number) => {
    const competitors = data.competitors || [];
    onChange('competitors', competitors.filter((_: any, i: number) => i !== index));
  };

  const updateCompetitor = (index: number, field: string, value: string) => {
    const competitors = data.competitors || [];
    const updated = [...competitors];
    updated[index] = { ...updated[index], [field]: value };
    onChange('competitors', updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Competitive Analysis</CardTitle>
        <CardDescription>
          Identify your main competitors to understand market positioning and opportunities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Competitor Information</Label>
            <Button onClick={addCompetitor} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Competitor
            </Button>
          </div>

          {(data.competitors || []).map((competitor: any, index: number) => (
            <Card key={index} className="border-dashed">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-medium">Competitor {index + 1}</h4>
                  <Button
                    onClick={() => removeCompetitor(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input
                      placeholder="Competitor name"
                      value={competitor.name || ''}
                      onChange={(e) => updateCompetitor(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Website URL</Label>
                    <Input
                      placeholder="https://competitor.com"
                      value={competitor.website || ''}
                      onChange={(e) => updateCompetitor(index, 'website', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Key Strengths</Label>
                    <Textarea
                      placeholder="What do they do well?"
                      value={competitor.strengths || ''}
                      onChange={(e) => updateCompetitor(index, 'strengths', e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Weaknesses/Gaps</Label>
                    <Textarea
                      placeholder="Where can you do better?"
                      value={competitor.weaknesses || ''}
                      onChange={(e) => updateCompetitor(index, 'weaknesses', e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {(!data.competitors || data.competitors.length === 0) && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No competitors added yet. Click "Add Competitor" to get started.</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="marketPosition">Your Market Position</Label>
          <Textarea
            id="marketPosition"
            placeholder="How do you position yourself against competitors? What makes you unique?"
            value={data.marketPosition || ''}
            onChange={(e) => onChange('marketPosition', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="competitiveAdvantage">Competitive Advantage</Label>
          <Textarea
            id="competitiveAdvantage"
            placeholder="What gives you an edge over competitors?"
            value={data.competitiveAdvantage || ''}
            onChange={(e) => onChange('competitiveAdvantage', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorAnalysisForm;
