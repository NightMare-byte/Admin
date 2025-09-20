import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  IndianRupee, 
  Calendar, 
  User, 
  Building2, 
  FileText, 
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Download,
  Phone,
  Mail
} from 'lucide-react';

export function BeneficiaryLoan() {
  const loanDetails = {
    id: 'LN-2024-001234',
    scheme: 'PMEGP - Technology Development',
    amount: 50000,
    sanctionedDate: '2024-01-01',
    dueDate: '2024-03-31',
    status: 'Active',
    utilized: 35000,
    pending: 15000,
    beneficiary: {
      name: 'Rajesh Kumar',
      id: 'BEN-2024-5678',
      district: 'Bangalore Urban',
      state: 'Karnataka'
    },
    sanctionedItems: [
      { category: 'Laptop/Computer', maxAmount: 30000, description: 'Business laptop for software development' },
      { category: 'Software License', maxAmount: 15000, description: 'Development tools and productivity software' },
      { category: 'Office Furniture', maxAmount: 5000, description: 'Desk, chair and storage' }
    ],
    requiredDocuments: [
      { name: 'Purchase Receipt/Invoice', required: true, submitted: true },
      { name: 'Item Photograph', required: true, submitted: true },
      { name: 'Serial Number/Model Details', required: true, submitted: false },
      { name: 'Location Verification', required: true, submitted: true },
      { name: 'Beneficiary Declaration', required: false, submitted: false }
    ],
    officer: {
      name: 'Priya Sharma',
      designation: 'Loan Officer',
      phone: '+91-9876543210',
      email: 'priya.sharma@pmegp.gov.in'
    }
  };

  const utilizationProgress = (loanDetails.utilized / loanDetails.amount) * 100;
  const daysRemaining = Math.ceil((new Date(loanDetails.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Loan Details</h1>
        <p className="text-muted-foreground">
          Complete information about your sanctioned loan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loan Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {loanDetails.scheme}
                  </CardTitle>
                  <CardDescription>
                    Loan ID: {loanDetails.id}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                  {loanDetails.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Details */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Sanctioned</p>
                  <p className="text-2xl font-semibold">
                    ₹{loanDetails.amount.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Utilized</p>
                  <p className="text-2xl font-semibold text-secondary">
                    ₹{loanDetails.utilized.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-2xl font-semibold text-amber-600">
                    ₹{loanDetails.pending.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Utilization Progress</p>
                  <p className="text-sm text-muted-foreground">
                    {utilizationProgress.toFixed(1)}%
                  </p>
                </div>
                <Progress value={utilizationProgress} className="h-3" />
              </div>

              {/* Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Sanctioned Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(loanDetails.sanctionedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Utilization Due Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(loanDetails.dueDate).toLocaleDateString()}
                      <span className={`ml-2 ${daysRemaining < 30 ? 'text-red-600' : 'text-green-600'}`}>
                        ({daysRemaining} days remaining)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sanctioned Items */}
          <Card>
            <CardHeader>
              <CardTitle>Sanctioned Items & Categories</CardTitle>
              <CardDescription>
                Items approved for purchase under this loan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loanDetails.sanctionedItems.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{item.category}</h4>
                      <Badge variant="outline">
                        Max: ₹{item.maxAmount.toLocaleString()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Required Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Document Requirements</CardTitle>
              <CardDescription>
                Documents needed for each submission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {loanDetails.requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {doc.submitted ? (
                        <CheckCircle className="h-5 w-5 text-secondary" />
                      ) : doc.required ? (
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      ) : (
                        <HelpCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.required ? 'Required' : 'Optional'}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={doc.submitted ? "default" : doc.required ? "destructive" : "secondary"}
                      className={doc.submitted ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : ""}
                    >
                      {doc.submitted ? 'Submitted' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Beneficiary Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Beneficiary Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{loanDetails.beneficiary.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Beneficiary ID</p>
                <p className="font-medium">{loanDetails.beneficiary.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">
                  {loanDetails.beneficiary.district}, {loanDetails.beneficiary.state}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Loan Officer */}
          <Card>
            <CardHeader>
              <CardTitle>Assigned Officer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{loanDetails.officer.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Designation</p>
                <p className="font-medium">{loanDetails.officer.designation}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  {loanDetails.officer.phone}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                New Submission
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Loan Copy
              </Button>
              <Button variant="outline" className="w-full">
                <HelpCircle className="h-4 w-4 mr-2" />
                Guidelines & FAQ
              </Button>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-amber-800">Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-amber-700">
              <p>• All purchases must be completed within the due date</p>
              <p>• Submit utilization proofs within 7 days of purchase</p>
              <p>• Keep original receipts and invoices safe</p>
              <p>• Contact your loan officer for any queries</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}