
import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, Users, DollarSign } from "lucide-react";

const StatsGrid = () => {
  const stats = [
    {
      title: 'Time Saved',
      value: '40+ hrs/week',
      description: 'Average time saved per business',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'ROI Generated',
      value: '400%',
      description: 'Average return on investment',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Businesses Served',
      value: '10,000+',
      description: 'Successful businesses using Sage.ai',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Revenue Impact',
      value: '$2M+',
      description: 'Additional revenue generated',
      icon: DollarSign,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6 text-center">
            <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.title}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
