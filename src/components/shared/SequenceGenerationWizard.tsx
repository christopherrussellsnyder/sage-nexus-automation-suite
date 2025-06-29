
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SequenceWizard from './SequenceWizard';
import { SequenceWizardData } from '@/types/sequenceWizard';

interface SequenceGenerationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (sequence: any) => void;
  type: 'sales' | 'agency';
}

const SequenceGenerationWizard = ({ isOpen, onClose, onGenerated, type }: SequenceGenerationWizardProps) => {
  const handleComplete = (data: SequenceWizardData) => {
    // Generate the sequence based on the data
    const generatedSequence = {
      id: Date.now().toString(),
      name: `${data.businessName} - ${data.sequenceType.replace('-', ' ')}`,
      description: `${data.campaignGoal.replace('-', ' ')} sequence for ${data.targetAudience}`,
      type: type,
      category: data.sequenceType,
      status: 'draft',
      emails: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      businessData: data,
      qualificationCriteria: [],
      stats: {
        sent: 0,
        opened: 0,
        clicked: 0,
        converted: 0,
        revenue: 0
      }
    };

    onGenerated(generatedSequence);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {type === 'sales' ? 'Create AI Email Sequence' : 'Create Client Nurture Sequence'}
          </DialogTitle>
          <DialogDescription>
            Complete the wizard to generate your personalized email sequence
          </DialogDescription>
        </DialogHeader>
        <SequenceWizard
          type={type}
          onComplete={handleComplete}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SequenceGenerationWizard;
