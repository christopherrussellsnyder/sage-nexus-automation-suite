
import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Image, Zap, Download, Save, RefreshCw } from 'lucide-react';
import { FileAnalyzerService } from '@/services/FileAnalyzerService';
import ApiKeySetup from './ApiKeySetup';

interface AnalysisResult {
  extractedText: string;
  contentType: 'campaign' | 'email' | 'website' | 'ad' | 'social' | 'other';
  insights: string[];
  recommendations: string[];
  improvements: string[];
}

const FileAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [userContext, setUserContext] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const checkApiKey = () => {
    const apiKey = FileAnalyzerService.getApiKey();
    if (!apiKey) {
      setShowApiSetup(true);
      return false;
    }
    return true;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/') || droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const analyzeFile = async () => {
    if (!file || !userContext.trim()) return;
    
    if (!checkApiKey()) return;

    setLoading(true);
    try {
      const result = await FileAnalyzerService.analyzeFile(file, userContext);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      if (error instanceof Error && error.message.includes('API key')) {
        setShowApiSetup(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const getContentTypeColor = (type: string) => {
    const colors = {
      campaign: 'bg-blue-100 text-blue-800',
      email: 'bg-purple-100 text-purple-800',
      website: 'bg-green-100 text-green-800',
      ad: 'bg-orange-100 text-orange-800',
      social: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  return (
    <div className="space-y-6">
      <ApiKeySetup 
        isVisible={showApiSetup} 
        onApiKeySet={() => setShowApiSetup(false)} 
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>File/Photo Analyzer</CardTitle>
              <CardDescription>
                Upload screenshots or files to get intelligent analysis and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload File</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm font-medium">
                      {file ? file.name : 'Drop files here or click to upload'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </label>
                </div>
              </div>

              {/* Context Input */}
              <div className="space-y-2">
                <Label htmlFor="context">What do you want to analyze?</Label>
                <Textarea
                  id="context"
                  placeholder="e.g., This is my email campaign - help me improve the subject line and content for better engagement"
                  value={userContext}
                  onChange={(e) => setUserContext(e.target.value)}
                  rows={4}
                />
              </div>

              <Button 
                onClick={analyzeFile}
                disabled={!file || !userContext.trim() || loading}
                className="w-full" 
                size="lg"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4 mr-2" />
                )}
                Analyze & Get Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {analysisResult && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Analysis Results</h3>
                <Badge className={getContentTypeColor(analysisResult.contentType)}>
                  {analysisResult.contentType.charAt(0).toUpperCase() + analysisResult.contentType.slice(1)}
                </Badge>
              </div>

              {/* Extracted Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Extracted Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm">{analysisResult.extractedText}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Strategic Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Strategic Insights</CardTitle>
                  <CardDescription>What's currently working in your content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.insights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>Specific actions to improve performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Optimization Strategies */}
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Strategies</CardTitle>
                  <CardDescription>Advanced tactics for better results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-sm">{improvement}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button size="sm" variant="outline">
                      <Save className="h-4 w-4 mr-2" />
                      Save Analysis
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!analysisResult && (
            <Card>
              <CardContent className="text-center py-12">
                <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Analyze Your Content?</h3>
                <p className="text-muted-foreground mb-4">
                  Upload a screenshot or file and get intelligent insights to improve your marketing performance
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <strong>Campaigns</strong>
                    <p className="text-xs mt-1">Analyze ad performance</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <strong>Emails</strong>
                    <p className="text-xs mt-1">Improve open rates</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <strong>Websites</strong>
                    <p className="text-xs mt-1">Optimize conversions</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <strong>Social Posts</strong>
                    <p className="text-xs mt-1">Boost engagement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileAnalyzer;
