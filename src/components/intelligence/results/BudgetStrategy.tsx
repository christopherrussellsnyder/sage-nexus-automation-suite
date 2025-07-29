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
  
  // Handle both agency growth and client budget management
  const agencyGrowth = budgetData.agencyGrowth || {};
  const clientBudgetManagement = budgetData.clientBudgetManagement || {};
  
  // Primary budget data (agency growth or general)
  const primaryBudget = Object.keys(agencyGrowth).length > 0 ? agencyGrowth : budgetData;
  
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
            {primaryBudget.recommendation || primaryBudget.recommendedStrategy || 'Focus on high-ROI activities with gradual scaling based on performance metrics.'}
          </p>
          {(primaryBudget.reasoning || agencyGrowth.recommendation) && (
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm">{primaryBudget.reasoning || agencyGrowth.recommendation}</p>
            </div>
          )}
        </div>

        <Separator />

        {/* Budget Allocation */}
        {(budgetData.allocation || primaryBudget.monthlyBudgetAllocation || primaryBudget.budgetAllocation) && (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center">
              <PieChart className="h-4 w-4 mr-2" />
              Budget Allocation {budgetData.totalBudget && `(${budgetData.totalBudget})`}
            </h4>
            
            {/* Visual Budget Allocation */}
            {budgetData.allocation && (
              <div className="space-y-3">
                {Object.entries(budgetData.allocation).map(([category, percentage]) => {
                  const amount = budgetData.totalBudget ? 
                    parseInt(budgetData.totalBudget.replace(/[^\d]/g, '')) * (percentage as number) / 100 : 0;
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize font-medium">{category}</span>
                        <span>{String(percentage)}% (${amount})</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Fallback for other allocation formats */}
            {!budgetData.allocation && (primaryBudget.monthlyBudgetAllocation || primaryBudget.budgetAllocation) && (
              <div className="grid gap-3">
                {Object.entries(primaryBudget.monthlyBudgetAllocation || primaryBudget.budgetAllocation || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <Badge variant="outline">{value as string}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Budget Recommendations */}
        {budgetData.recommendations && Array.isArray(budgetData.recommendations) && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-semibold">Budget Recommendations</h4>
              <div className="space-y-2">
                {budgetData.recommendations.map((recommendation: string, index: number) => (
                  <div key={index} className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Performance Targets */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance Targets
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {(primaryBudget.expectedROAS || primaryBudget.targetROAS) && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Expected ROAS</p>
                <p className="text-sm font-semibold">{primaryBudget.expectedROAS || primaryBudget.targetROAS}</p>
              </div>
            )}
            {primaryBudget.targetCPM && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Target CPM</p>
                <p className="text-sm font-semibold">{primaryBudget.targetCPM}</p>
              </div>
            )}
            {primaryBudget.targetCPA && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Target CPA</p>
                <p className="text-sm font-semibold">{primaryBudget.targetCPA}</p>
              </div>
            )}
            {primaryBudget.conversionTarget && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Conversion Target</p>
                <p className="text-sm font-semibold">{primaryBudget.conversionTarget}</p>
              </div>
            )}
          </div>
        </div>

        {/* Business Type Specific Details */}
        {businessType === 'agency' && (clientBudgetManagement.recommendation || budgetData.clientBudgetStrategy) && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-semibold">Client Budget Management</h4>
              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                <p className="text-sm">{clientBudgetManagement.recommendation || budgetData.clientBudgetStrategy}</p>
              </div>
            </div>
          </>
        )}

        {businessType === 'sales' && (primaryBudget.leadGenerationStrategy || budgetData.leadGenerationBudget) && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-semibold">Lead Generation Budget</h4>
              <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                <p className="text-sm">{primaryBudget.leadGenerationStrategy || budgetData.leadGenerationBudget}</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetStrategy;