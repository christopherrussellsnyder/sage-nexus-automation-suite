
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface GoalsObjectivesFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const GoalsObjectivesForm = ({ data, onChange }: GoalsObjectivesFormProps) => {
  const goalOptions = [
    'Increase Revenue',
    'Improve Conversion Rates',
    'Reduce Customer Acquisition Cost',
    'Enhance Brand Awareness',
    'Expand Market Share',
    'Improve Customer Retention',
    'Launch New Products/Services',
    'Enter New Markets',
    'Optimize Marketing ROI',
    'Scale Operations'
  ];

  const handleGoalToggle = (goal: string, checked: boolean) => {
    const currentGoals = data.primaryGoals || [];
    if (checked) {
      onChange('primaryGoals', [...currentGoals, goal]);
    } else {
      onChange('primaryGoals', currentGoals.filter((g: string) => g !== goal));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals & Objectives</CardTitle>
        <CardDescription>Define your business goals and success metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Primary Business Goals (Select up to 3)</Label>
          <div className="grid grid-cols-2 gap-3">
            {goalOptions.map((goal) => (
              <div key={goal} className="flex items-center space-x-2">
                <Checkbox
                  id={goal}
                  checked={(data.primaryGoals || []).includes(goal)}
                  onCheckedChange={(checked) => handleGoalToggle(goal, checked as boolean)}
                  disabled={(data.primaryGoals || []).length >= 3 && !(data.primaryGoals || []).includes(goal)}
                />
                <Label htmlFor={goal} className="text-sm">{goal}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="revenueTarget">Revenue Target (Next 12 Months)</Label>
            <Input
              id="revenueTarget"
              placeholder="e.g., $500,000"
              value={data.revenueTarget || ''}
              onChange={(e) => onChange('revenueTarget', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeline">Achievement Timeline</Label>
            <Select value={data.timeline || ''} onValueChange={(value) => onChange('timeline', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-months">3 Months</SelectItem>
                <SelectItem value="6-months">6 Months</SelectItem>
                <SelectItem value="12-months">12 Months</SelectItem>
                <SelectItem value="18-months">18 Months</SelectItem>
                <SelectItem value="24-months">24 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="successMetrics">How do you measure success?</Label>
          <Textarea
            id="successMetrics"
            placeholder="Describe your key success metrics and KPIs"
            value={data.successMetrics || ''}
            onChange={(e) => onChange('successMetrics', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentObstacles">Current Obstacles</Label>
          <Textarea
            id="currentObstacles"
            placeholder="What's currently preventing you from achieving these goals?"
            value={data.currentObstacles || ''}
            onChange={(e) => onChange('currentObstacles', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalsObjectivesForm;
