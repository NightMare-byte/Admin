import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { StatusBadge } from '../status-badge';
import { 
  Search, 
  Filter, 
  Eye, 
  Calendar,
  IndianRupee,
  MapPin,
  MessageSquare,
  Download,
  RefreshCw
} from 'lucide-react';

interface BeneficiarySubmissionsProps {
  submissionId?: string;
  onNavigate: (path: string) => void;
}

export function BeneficiarySubmissions({ submissionId, onNavigate }: BeneficiarySubmissionsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const submissions = [
    {
      id: 'SUB-001',
      item: 'Dell Laptop - Inspiron 15',
      amount: 25000,
      status: 'approved' as const,
      submittedOn: '2024-01-15',
      reviewedOn: '2024-01-16',
      aiScore: 0.92,
      location: { lat: 12.9716, lng: 77.5946 },
      files: ['laptop_front.jpg', 'invoice.pdf'],
      remarks: 'All documents verified. Purchase approved.',
      reviewer: 'Officer Sharma'
    },
    {
      id: 'SUB-002',
      item: 'Adobe Creative Suite License',
      amount: 10000,
      status: 'ai-review' as const,
      submittedOn: '2024-01-20',
      aiScore: 0.85,
      location: { lat: 12.9716, lng: 77.5946 },
      files: ['license_screenshot.jpg', 'receipt.jpg'],
      remarks: 'Under AI review. Some additional verification needed.',
      estimatedCompletion: '2024-01-22'
    },
    {
      id: 'SUB-003',
      item: 'Office Chair - Herman Miller',
      amount: 8000,
      status: 'pending' as const,
      submittedOn: '2024-01-22',
      location: { lat: 12.9716, lng: 77.5946 },
      files: ['chair_photo.jpg', 'bill.jpg']
    },
    {
      id: 'SUB-004',
      item: 'Mobile Phone - iPhone 14',
      amount: 75000,
      status: 'rejected' as const,
      submittedOn: '2024-01-10',
      reviewedOn: '2024-01-12',
      aiScore: 0.23,
      location: { lat: 12.9716, lng: 77.5946 },
      files: ['phone_photo.jpg'],
      remarks: 'Item not in approved category list. Mobile phones are not covered under this loan scheme.',
      reviewer: 'Officer Patel'
    }
  ];

  // If viewing a specific submission
  if (submissionId) {
    const submission = submissions.find(s => s.id === submissionId) || submissions[0];
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('/b/submissions')}
              className="mb-2"
            >
              ← Back to Submissions
            </Button>
            <h1>Submission Details</h1>
            <p className="text-muted-foreground">
              {submission.item} - {submission.id}
            </p>
          </div>
          <StatusBadge status={submission.status} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Files */}
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {submission.files.map((file, index) => (
                    <div key={index} className="border rounded-lg p-4 text-center">
                      <div className="w-16 h-16 bg-muted rounded mx-auto mb-2 flex items-center justify-center">
                        <Eye className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium">{file}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Download className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            {submission.aiScore && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Analysis</CardTitle>
                  <CardDescription>
                    Automated verification results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Confidence Score</span>
                        <span className="text-sm font-medium">
                          {(submission.aiScore * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            submission.aiScore > 0.8 ? 'bg-secondary' :
                            submission.aiScore > 0.5 ? 'bg-accent' :
                            'bg-destructive'
                          }`}
                          style={{ width: `${submission.aiScore * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Analysis Results:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Object Recognition</span>
                          <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                            ✓ Match
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>GPS Verification</span>
                          <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                            ✓ Valid
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Document Analysis</span>
                          <Badge variant="outline" className="bg-accent text-accent-foreground">
                            ⚠ Review
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Status Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="font-medium">Submitted</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(submission.submittedOn).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {submission.status !== 'pending' && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <div>
                        <p className="font-medium">AI Review Completed</p>
                        <p className="text-sm text-muted-foreground">
                          Confidence score: {(submission.aiScore! * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  )}

                  {submission.reviewedOn && (
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        submission.status === 'approved' ? 'bg-secondary' : 'bg-destructive'
                      }`} />
                      <div>
                        <p className="font-medium">
                          {submission.status === 'approved' ? 'Approved' : 'Rejected'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(submission.reviewedOn).toLocaleDateString()} by {submission.reviewer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium">₹{submission.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">Electronics</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    <span>Bangalore, Karnataka</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Officer Remarks */}
            {submission.remarks && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {submission.status === 'ai-review' ? 'AI Remarks' : 'Officer Remarks'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{submission.remarks}</p>
                  {submission.estimatedCompletion && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Expected completion: {new Date(submission.estimatedCompletion).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                {submission.status === 'pending' && (
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Check Status
                  </Button>
                )}
                
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                
                {submission.status === 'rejected' && (
                  <Button className="w-full" onClick={() => onNavigate('/b/submit')}>
                    Submit Correction
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Main submissions list view
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || submission.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    'ai-review': submissions.filter(s => s.status === 'ai-review').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>My Submissions</h1>
          <p className="text-muted-foreground">
            Track your utilization submissions and their status
          </p>
        </div>
        <Button onClick={() => onNavigate('/b/submit')}>
          New Submission
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Status Tabs */}
      <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            All ({statusCounts.all})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({statusCounts.pending})
          </TabsTrigger>
          <TabsTrigger value="ai-review">
            AI Review ({statusCounts['ai-review']})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({statusCounts.approved})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({statusCounts.rejected})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus} className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No submissions found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredSubmissions.map((submission) => (
                <Card 
                  key={submission.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate(`/b/submissions/${submission.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{submission.item}</h3>
                          <StatusBadge status={submission.status} />
                          {submission.aiScore && (
                            <Badge variant="outline" className="text-xs">
                              AI: {(submission.aiScore * 100).toFixed(0)}%
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="h-3 w-3" />
                            <span>₹{submission.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(submission.submittedOn).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{submission.files.length} files</span>
                          </div>
                          <div>
                            <span className="text-xs">ID: {submission.id}</span>
                          </div>
                        </div>

                        {submission.remarks && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {submission.remarks}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}