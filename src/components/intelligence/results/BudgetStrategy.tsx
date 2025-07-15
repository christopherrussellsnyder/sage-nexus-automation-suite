import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DollarSign, TrendingUp, Target, PieChart } from 'lucide-react';

interface BudgetStrategyProps {
  data: any;
  businessType: string;
}

const BudgetStrategy = ({ data, businessType }: BudgetStrategyProps) => {
  const budgetData = data.budgetStrategy || {};
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <CardTitle>Budget Strategy</CardTitle>
        </div>
        <CardDescription>
          Optimized budget allocation and strategy recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recommended Strategy */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Recommended Strategy
          </h4>
          <p className="text-sm text-muted-foreground">
            {budgetData.recommendedStrategy || 'Focus on high-ROI activities with gradual scaling based on performance metrics.'}
          </p>
          {budgetData.reasoning && (
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm">{budgetData.reasoning}</p>
            </div>
          )}
        </div>

        <Separator />

        {/* Budget Allocation */}
        {budgetData.monthlyBudgetAllocation && (
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center">
              <PieChart className="h-4 w-4 mr-2" />
              Monthly Budget Allocation
            </h4>
            <div className="grid gap-3">
              {Object.entries(budgetData.monthlyBudgetAllocation).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <Badge variant="outline">{value as string}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Performance Targets */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance Targets
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {budgetData.expectedROAS && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Expected ROAS</p>
                <p className="text-sm font-semibold">{budgetData.expectedROAS}</p>
              </div>
            )}
            {budgetData.targetCPM && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Target CPM</p>
                <p className="text-sm font-semibold">{budgetData.targetCPM}</p>
              </div>
            )}
            {budgetData.targetCPA && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Target CPA</p>
                <p className="text-sm font-semibold">{budgetData.targetCPA}</p>
              </div>
            )}
            {budgetData.conversionTarget && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Conversion Target</p>
                <p className="text-sm font-semibold">{budgetData.conversionTarget}</p>
              </div>
            )}
          </div>
        </div>

        {/* Business Type Specific Details */}
        {businessType === 'agency' && budgetData.clientBudgetStrategy && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-semibold">Client Budget Management</h4>
              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                <p className="text-sm">{budgetData.clientBudgetStrategy}</p>
              </div>
            </div>
          </>
        )}

        {businessType === 'sales' && budgetData.leadGenerationBudget && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-semibold">Lead Generation Budget</h4>
              <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                <p className="text-sm">{budgetData.leadGenerationBudget}</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetStrategy;