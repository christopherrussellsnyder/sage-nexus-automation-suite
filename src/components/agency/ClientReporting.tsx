
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  FileText, 
  Send, 
  Download, 
  Eye, 
  Calendar,
  TrendingUp,
  DollarSign,
  Target,
  Users
} from 'lucide-react';

interface ClientReport {
  id: string;
  clientName: string;
  reportType: 'monthly' | 'weekly' | 'quarterly';
  period: string;
  status: 'generated' | 'sent' | 'viewed' | 'draft';
  metrics: {
    adSpend: number;
    impressions: number;
    clicks: number;
    conversions: number;
    roi: number;
    leadGenerated: number;
  };
  lastSent: string;
  viewCount: number;
}

const ClientReporting = () => {
  const [reports, setReports] = useState<ClientReport[]>([
    {
      id: '1',
      clientName: 'TechStartup Inc',
      reportType: 'monthly',
      period: 'January 2024',
      status: 'sent',
      metrics: {
        adSpend: 15000,
        impressions: 245000,
        clicks: 12300,
        conversions: 342,
        roi: 285,
        leadGenerated: 89
      },
      lastSent: '2024-02-01',
      viewCount: 7
    },
    {
      id: '2',
      clientName: 'E-commerce Store',
      reportType: 'weekly',
      period: 'Week of Jan 15, 2024',
      status: 'viewed',
      metrics: {
        adSpend: 3500,
        impressions: 89000,
        clicks: 4200,
        conversions: 98,
        roi: 420,
        leadGenerated: 23
      },
      lastSent: '2024-01-22',
      viewCount: 12
    },
    {
      id: '3',
      clientName: 'Software Company',
      reportType: 'monthly',
      period: 'January 2024',
      status: 'generated',
      metrics: {
        adSpend: 8500,
        impressions: 156000,
        clicks: 7800,
        conversions: 167,
        roi: 180,
        leadGenerated: 45
      },
      lastSent: '',
      viewCount: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-500';
      case 'viewed': return 'bg-green-500';
      case 'generated': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const totalAdSpend = reports.reduce((sum, report) => sum + report.metrics.adSpend, 0);
  const avgROI = reports.reduce((sum, report) => sum + report.metrics.roi, 0) / reports.length;
  const totalLeads = reports.reduce((sum, report) => sum + report.metrics.leadGenerated, 0);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reports">Client Reports</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          {/* Report Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{reports.length}</p>
                    <p className="text-sm text-muted-foreground">Total Reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{formatCurrency(totalAdSpend)}</p>
                    <p className="text-sm text-muted-foreground">Total Ad Spend</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">{Math.round(avgROI)}%</p>
                    <p className="text-sm text-muted-foreground">Avg ROI</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">{totalLeads}</p>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Client Reports Dashboard</CardTitle>
              <CardDescription>Automated client reporting with performance insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{report.clientName}</div>
                            <div className="text-sm text-muted-foreground capitalize">
                              {report.reportType} Report
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{report.period}</span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Spend: {formatCurrency(report.metrics.adSpend)}</span>
                              <span>ROI: {report.metrics.roi}%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Leads: {report.metrics.leadGenerated}</span>
                              <span>Conv: {report.metrics.conversions}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(report.status)}`} />
                            <span className="capitalize font-medium">{report.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Views: {report.viewCount}</div>
                            {report.lastSent && (
                              <div className="text-xs text-muted-foreground">
                                Sent: {new Date(report.lastSent).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Send className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Customize your client reporting templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Executive Summary</h4>
                    <p className="text-sm text-muted-foreground mb-2">High-level overview for C-suite</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Preview</Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Detailed Performance</h4>
                    <p className="text-sm text-muted-foreground mb-2">Comprehensive metrics and insights</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Preview</Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Campaign Focus</h4>
                    <p className="text-sm text-muted-foreground mb-2">Campaign-specific performance</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Preview</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>White Label Settings</CardTitle>
                <CardDescription>Customize branding for client reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Agency Logo</label>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Upload your logo</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Brand Colors</label>
                    <div className="mt-1 flex space-x-2">
                      <div className="w-8 h-8 rounded bg-blue-500 border"></div>
                      <div className="w-8 h-8 rounded bg-gray-200 border"></div>
                      <Button size="sm" variant="outline">Customize</Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Footer Text</label>
                    <div className="mt-1">
                      <input 
                        type="text" 
                        placeholder="© 2024 Your Agency Name. All rights reserved."
                        className="w-full px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle>Report Automation</CardTitle>
              <CardDescription>Set up automated report generation and delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Delivery Schedule</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="schedule" defaultChecked />
                        <span className="text-sm">Weekly (every Monday)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="schedule" />
                        <span className="text-sm">Monthly (1st of month)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="schedule" />
                        <span className="text-sm">Quarterly</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="schedule" />
                        <span className="text-sm">Custom schedule</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Delivery Options</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Email delivery</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">Slack integration</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Client portal upload</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">PDF attachment</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">AI Insights</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Include AI-generated insights</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Performance recommendations</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">Competitor analysis</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Next month projections</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientReporting;
