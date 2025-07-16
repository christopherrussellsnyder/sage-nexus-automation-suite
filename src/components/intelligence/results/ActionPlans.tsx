import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  CheckCircle, 
  Clock,
  Target,
  Users,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface ActionPlansProps {
  data: any;
  businessType: string;
}

const ActionPlans = ({ data, businessType }: ActionPlansProps) => {
  const clientDeliveryPlan = data.clientDeliveryPlan || {};
  const agencyGrowthPlan = data.agencyGrowthPlan || {};
  
  const clientPlan = Array.isArray(clientDeliveryPlan.plan) 
    ? clientDeliveryPlan.plan 
    : clientDeliveryPlan['30DayPlan'] 
      ? Array.isArray(clientDeliveryPlan['30DayPlan']) 
        ? clientDeliveryPlan['30DayPlan']
        : [clientDeliveryPlan['30DayPlan']]
      : [];
      
  const agencyPlan = Array.isArray(agencyGrowthPlan.plan) 
    ? agencyGrowthPlan.plan 
    : agencyGrowthPlan['30DayPlan'] 
      ? Array.isArray(agencyGrowthPlan['30DayPlan'])
        ? agencyGrowthPlan['30DayPlan']
        : [agencyGrowthPlan['30DayPlan']]
      : [];

  const showDualPlans = businessType === 'agency' && (clientPlan.length > 0 || agencyPlan.length > 0);
  const hasAnyPlan = clientPlan.length > 0 || agencyPlan.length > 0;

  if (!hasAnyPlan) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>30-Day Action Plans</span>
          </CardTitle>
          <CardDescription>Detailed weekly action plans for business growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
            <Calendar className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-yellow-700 mb-2">No Action Plans Generated</h3>
            <p className="text-sm text-yellow-600 mb-4">
              30-day action plans were not generated or are missing from the response.
            </p>
            <p className="text-xs text-yellow-600">
              Please regenerate the report to get detailed weekly action plans.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>30-Day Action Plans</span>
        </CardTitle>
        <CardDescription>
          Detailed weekly action plans for business growth and optimization
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showDualPlans ? (
          <Tabs defaultValue="agency" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="agency">
                <TrendingUp className="h-4 w-4 mr-2" />
                Agency Growth
              </TabsTrigger>
              <TabsTrigger value="client">
                <Users className="h-4 w-4 mr-2" />
                Client Delivery
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="agency">
              <ActionPlanGrid plan={agencyPlan} planType="Agency Growth" />
            </TabsContent>
            
            <TabsContent value="client">
              <ActionPlanGrid plan={clientPlan} planType="Client Delivery" />
            </TabsContent>
          </Tabs>
        ) : (
          <ActionPlanGrid 
            plan={clientPlan.length > 0 ? clientPlan : agencyPlan} 
            planType={businessType === 'sales' ? 'Sales Growth' : 'Business Growth'} 
          />
        )}
      </CardContent>
    </Card>
  );
};

const ActionPlanGrid = ({ plan, planType }: { plan: any[], planType: string }) => {
  if (!plan || plan.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No action plan available for {planType}.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{planType} Plan</h3>
        <Badge variant="outline">{plan.length} Action Items</Badge>
      </div>
      
      <div className="space-y-4">
        {plan.map((item: any, index: number) => (
          <ActionPlanCard key={index} action={item} weekNumber={index + 1} />
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-700">4</p>
                <p className="text-xs text-blue-600">Weeks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-700">{plan.length}</p>
                <p className="text-xs text-green-600">Action Items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-700">AI</p>
                <p className="text-xs text-purple-600">Generated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ActionPlanCard = ({ action, weekNumber }: { action: any, weekNumber: number }) => {
  // Handle both string and object formats
  const actionText = typeof action === 'string' ? action : action.action || action.description || action.task || 'No action specified';
  const details = typeof action === 'object' ? action.details || action.description : null;
  const timeline = typeof action === 'object' ? action.timeline || `Week ${weekNumber}` : `Week ${weekNumber}`;
  const priority = typeof action === 'object' ? action.priority || 'Medium' : 'Medium';

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{timeline}</h4>
                <p className="text-sm text-gray-700">{actionText}</p>
              </div>
            </div>
            <Badge className={getPriorityColor(priority)}>
              {priority} Priority
            </Badge>
          </div>

          {details && (
            <div className="ml-11">
              <div className="bg-gray-50 p-3 rounded border">
                <p className="text-xs text-gray-600">{details}</p>
              </div>
            </div>
          )}

          <div className="ml-11 flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{timeline}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ArrowRight className="h-3 w-3" />
              <span>Action Required</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionPlans;