import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  Send, 
  Eye, 
  HelpCircle, 
  Calendar, 
  IndianRupee,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface BeneficiaryDashboardProps {
  onNavigate: (path: string) => void;
}

export function BeneficiaryDashboard({ onNavigate }: BeneficiaryDashboardProps) {
  const loanData = {
    id: 'LN-2024-001234',
    amount: 50000,
    sanctionedItems: ['Laptop', 'Software License', 'Office Furniture'],
    dueDate: '2024-03-15',
    utilized: 35000,
    pending: 15000
  };

  const recentSubmissions = [
    {
      id: 'SUB-001',
      item: 'Laptop Purchase',
      amount: 25000,
      status: 'approved' as const,
      submittedOn: '2024-01-15',
      aiScore: 0.92
    },
    {
      id: 'SUB-002', 
      item: 'Software License',
      amount: 10000,
      status: 'ai-review' as const,
      submittedOn: '2024-01-20',
      aiScore: 0.85
    },
    {
      id: 'SUB-003',
      item: 'Office Chair',
      amount: 8000,
      status: 'pending' as const,
      submittedOn: '2024-01-22'
    }
  ];

  const utilizationProgress = (loanData.utilized / loanData.amount) * 100;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1>Welcome, Rajesh Kumar</h1>
        <p className="text-muted-foreground">
          Track your loan utilization and submit proofs of purchase
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Send className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">New Submission</h3>
                <p className="text-sm text-muted-foreground">
                  Upload purchase proofs
                </p>
              </div>
            </div>
            <Button 
              className="w-full mt-4" 
              onClick={() => onNavigate('/b/submit')}
            >
              Submit Now
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">My Submissions</h3>
                <p className="text-sm text-muted-foreground">
                  {recentSubmissions.length} submissions
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate('/b/submissions')}
            >
              View All
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <HelpCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">Help & Support</h3>
                <p className="text-sm text-muted-foreground">
                  Guidelines & FAQ
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate('/b/help')}
            >
              Get Help
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Loan Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5" />
            Loan Summary
          </CardTitle>
          <CardDescription>
            Loan ID: {loanData.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Sanctioned</p>
              <p className="text-2xl font-semibold">
                ₹{loanData.amount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Utilized</p>
              <p className="text-2xl font-semibold text-secondary">
                ₹{loanData.utilized.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold text-amber-600">
                ₹{loanData.pending.toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">Utilization Progress</p>
              <p className="text-sm text-muted-foreground">
                {utilizationProgress.toFixed(1)}%
              </p>
            </div>
            <Progress value={utilizationProgress} className="h-2" />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Due Date: {new Date(loanData.dueDate).toLocaleDateString()}</span>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Sanctioned Items</p>
            <div className="flex flex-wrap gap-2">
              {loanData.sanctionedItems.map((item, index) => (
                <Badge key={index} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Timeline</CardTitle>
          <CardDescription>
            Track your recent submissions and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSubmissions.map((submission, index) => (
              <div key={submission.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="p-2 rounded-full">
                  {submission.status === 'approved' && (
                    <CheckCircle className="h-5 w-5 text-secondary" />
                  )}
                  {submission.status === 'ai-review' && (
                    <Clock className="h-5 w-5 text-blue-500" />
                  )}
                  {submission.status === 'pending' && (
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{submission.item}</p>
                    <Badge 
                      variant={
                        submission.status === 'approved' ? 'default' :
                        submission.status === 'ai-review' ? 'secondary' :
                        'outline'
                      }
                      className={
                        submission.status === 'approved' 
                          ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          : ''
                      }
                    >
                      {submission.status === 'approved' ? 'Approved' :
                       submission.status === 'ai-review' ? 'AI Review' :
                       'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>₹{submission.amount.toLocaleString()}</span>
                    <span>{new Date(submission.submittedOn).toLocaleDateString()}</span>
                  </div>
                  {submission.aiScore && (
                    <div className="text-xs text-muted-foreground mt-1">
                      AI Confidence: {(submission.aiScore * 100).toFixed(0)}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => onNavigate('/b/submissions')}
          >
            View All Submissions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}