import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { StatusBadge, RiskBadge } from '../status-badge';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  MapPin, 
  Calendar, 
  IndianRupee,
  Eye,
  Download,
  Flag,
  UserCheck
} from 'lucide-react';

interface OfficerSubmissionDetailProps {
  submissionId: string;
  onNavigate: (path: string) => void;
}

export function OfficerSubmissionDetail({ submissionId, onNavigate }: OfficerSubmissionDetailProps) {
  const submission = {
    id: submissionId,
    beneficiaryName: 'Rajesh Kumar',
    beneficiaryId: 'BEN-2024-5678',
    loanId: 'LN-2024-001234',
    item: 'Dell Laptop - Inspiron 15',
    amount: 25000,
    submittedOn: '2024-01-20',
    status: 'ai-review' as const,
    riskLevel: 'amber' as const,
    aiScore: 0.67,
    district: 'Bangalore Urban',
    scheme: 'PMEGP',
    files: [
      { name: 'laptop_photo.jpg', type: 'image', size: '2.4 MB' },
      { name: 'invoice.pdf', type: 'document', size: '1.1 MB' },
      { name: 'serial_number.jpg', type: 'image', size: '1.8 MB' }
    ],
    location: { lat: 12.9716, lng: 77.5946, accuracy: 5 },
    aiAnalysis: {
      objectDetection: { confidence: 0.89, result: 'Laptop detected' },
      gpsVerification: { valid: true, distance: 2.1 },
      documentAnalysis: { confidence: 0.45, issues: ['Low quality scan'] },
      duplicateCheck: { found: false },
      tamperDetection: { score: 0.12, status: 'Low risk' }
    },
    metadata: {
      deviceInfo: 'iPhone 13, iOS 16.1',
      timestamp: '2024-01-20T14:30:22Z',
      ipAddress: '203.192.x.x'
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('/o/inbox')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1>Submission Review</h1>
            <p className="text-muted-foreground">
              {submission.item} - {submission.id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={submission.status} />
          <RiskBadge level={submission.riskLevel} score={submission.aiScore} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Media Viewer */}
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {submission.files.map((file, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="aspect-video bg-muted rounded flex items-center justify-center mb-3">
                      <Eye className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Results</CardTitle>
              <CardDescription>
                Automated verification and risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Object Detection</span>
                    <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                      ✓ {submission.aiAnalysis.objectDetection.result}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">GPS Verification</span>
                    <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                      ✓ Valid ({submission.aiAnalysis.gpsVerification.distance}km)
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Document Quality</span>
                    <Badge variant="outline" className="bg-accent text-accent-foreground">
                      ⚠ Low Quality
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Duplicate Check</span>
                    <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                      ✓ No Duplicates
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tamper Detection</span>
                    <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                      ✓ Low Risk
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Overall Score</span>
                    <Badge variant="outline">
                      {(submission.aiScore * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Map View</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Coordinates</p>
                  <p className="font-mono">{submission.location.lat}, {submission.location.lng}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Accuracy</p>
                  <p>±{submission.location.accuracy}m</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Submission Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Beneficiary</p>
                <p className="font-medium">{submission.beneficiaryName}</p>
                <p className="text-xs text-muted-foreground">{submission.beneficiaryId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium">₹{submission.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="font-medium">{new Date(submission.submittedOn).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">District</p>
                <p className="font-medium">{submission.district}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Review Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Remarks</label>
                <Textarea 
                  placeholder="Add your review comments..."
                  className="mt-1"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Rejection Reason</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select reason (if rejecting)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blurry">Blurry/unclear images</SelectItem>
                    <SelectItem value="gps">GPS location mismatch</SelectItem>
                    <SelectItem value="object">Object not matching</SelectItem>
                    <SelectItem value="invoice">Invoice not visible</SelectItem>
                    <SelectItem value="duplicate">Duplicate submission</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-secondary hover:bg-secondary/80">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button variant="destructive" className="w-full">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button variant="outline" className="w-full">
                  <Flag className="h-4 w-4 mr-2" />
                  Mark for Field Visit
                </Button>
                <Button variant="outline" className="w-full">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Assign to Officer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Device</span>
                <span className="font-mono text-xs">{submission.metadata.deviceInfo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timestamp</span>
                <span className="font-mono text-xs">
                  {new Date(submission.metadata.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IP Address</span>
                <span className="font-mono text-xs">{submission.metadata.ipAddress}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}