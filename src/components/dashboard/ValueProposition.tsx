
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ValueProposition = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Why Choose Sage.ai?</CardTitle>
        <CardDescription>
          Advanced AI technology that analyzes the best-performing content across all industries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
              <div>
                <h4 className="font-medium">Industry Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes top-performing content across all industries to understand what works
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
              <div>
                <h4 className="font-medium">Personalized Content</h4>
                <p className="text-sm text-muted-foreground">
                  Every template is customized using your specific business details and target audience
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
              <div>
                <h4 className="font-medium">Multiple Approaches</h4>
                <p className="text-sm text-muted-foreground">
                  Get 5 completely different templates using various psychology triggers and strategies
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-orange-500 mt-2" />
              <div>
                <h4 className="font-medium">Implementation Guidance</h4>
                <p className="text-sm text-muted-foreground">
                  Each template includes specific recommendations on how and where to implement the content
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-red-500 mt-2" />
              <div>
                <h4 className="font-medium">Save & Customize</h4>
                <p className="text-sm text-muted-foreground">
                  Save your favorite templates and customize them as your business evolves
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-teal-500 mt-2" />
              <div>
                <h4 className="font-medium">Proven Results</h4>
                <p className="text-sm text-muted-foreground">
                  Based on analysis of thousands of high-converting campaigns and websites
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValueProposition;
