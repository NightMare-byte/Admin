import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DataTable, Column } from '../data-table';
import { StatusBadge, RiskBadge } from '../status-badge';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle,
  MapPin,
  Calendar,
  IndianRupee,
  User,
  MoreHorizontal,
  AlertTriangle
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface OfficerInboxProps {
  onNavigate: (path: string) => void;
}

interface Submission {
  id: string;
  beneficiaryName: string;
  beneficiaryId: string;
  loanId: string;
  item: string;
  amount: number;
  submittedOn: string;
  status: 'pending' | 'ai-review' | 'flagged' | 'approved' | 'rejected';
  riskLevel: 'green' | 'amber' | 'red';
  aiScore: number;
  district: string;
  scheme: string;
  daysInQueue: number;
}

export function OfficerInbox({ onNavigate }: OfficerInboxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSubmissions, setSelectedSubmissions] = useState<Submission[]>([]);

  const submissions: Submission[] = [
    {
      id: 'SUB-2024-001',
      beneficiaryName: 'Rajesh Kumar',
      beneficiaryId: 'BEN-2024-5678',
      loanId: 'LN-2024-001234',
      item: 'Dell Laptop - Inspiron 15',
      amount: 25000,
      submittedOn: '2024-01-20',
      status: 'flagged',
      riskLevel: 'red',
      aiScore: 0.23,
      district: 'Bangalore Urban',
      scheme: 'PMEGP',
      daysInQueue: 3
    },
    {
      id: 'SUB-2024-002',
      beneficiaryName: 'Priya Sharma',
      beneficiaryId: 'BEN-2024-5679',
      loanId: 'LN-2024-001235',
      item: 'Office Chair - Herman Miller',
      amount: 8000,
      submittedOn: '2024-01-21',
      status: 'ai-review',
      riskLevel: 'amber',
      aiScore: 0.67,
      district: 'Mumbai',
      scheme: 'MUDRA',
      daysInQueue: 2
    },
    {
      id: 'SUB-2024-003',
      beneficiaryName: 'Amit Patel',
      beneficiaryId: 'BEN-2024-5680',
      loanId: 'LN-2024-001236',
      item: 'Software License - Adobe Creative',
      amount: 15000,
      submittedOn: '2024-01-22',
      status: 'ai-review',
      riskLevel: 'green',
      aiScore: 0.89,
      district: 'Pune',
      scheme: 'PMEGP',
      daysInQueue: 1
    },
    {
      id: 'SUB-2024-004',
      beneficiaryName: 'Sarah Khan',
      beneficiaryId: 'BEN-2024-5681',
      loanId: 'LN-2024-001237',
      item: 'MacBook Pro 14-inch',
      amount: 95000,
      submittedOn: '2024-01-19',
      status: 'pending',
      riskLevel: 'amber',
      aiScore: 0.78,
      district: 'Delhi',
      scheme: 'STAND-UP',
      daysInQueue: 4
    },
    {
      id: 'SUB-2024-005',
      beneficiaryName: 'Kiran Reddy',
      beneficiaryId: 'BEN-2024-5682',
      loanId: 'LN-2024-001238',
      item: 'Industrial Printer',
      amount: 45000,
      submittedOn: '2024-01-18',
      status: 'ai-review',
      riskLevel: 'green',
      aiScore: 0.92,
      district: 'Hyderabad',
      scheme: 'PMEGP',
      daysInQueue: 5
    }
  ];

  const handleBulkApprove = () => {
    // Handle bulk approval
    console.log('Bulk approve:', selectedSubmissions);
  };

  const handleBulkReject = () => {
    // Handle bulk rejection
    console.log('Bulk reject:', selectedSubmissions);
  };

  const columns: Column<Submission>[] = [
    {
      key: 'beneficiaryName',
      title: 'Beneficiary',
      render: (_, row) => (
        <div>
          <p className="font-medium">{row.beneficiaryName}</p>
          <p className="text-xs text-muted-foreground">{row.beneficiaryId}</p>
        </div>
      ),
      sortable: true
    },
    {
      key: 'loanId',
      title: 'Loan ID',
      render: (value) => <span className="font-mono text-xs">{value}</span>,
      sortable: true
    },
    {
      key: 'item',
      title: 'Item',
      render: (value, row) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-muted-foreground">₹{row.amount.toLocaleString()}</p>
        </div>
      ),
      sortable: true
    },
    {
      key: 'submittedOn',
      title: 'Submitted',
      render: (value, row) => (
        <div>
          <p className="text-sm">{new Date(value).toLocaleDateString()}</p>
          <p className="text-xs text-muted-foreground">
            {row.daysInQueue} days ago
          </p>
        </div>
      ),
      sortable: true
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => <StatusBadge status={value} />,
      sortable: true
    },
    {
      key: 'riskLevel',
      title: 'Risk',
      render: (value, row) => (
        <RiskBadge level={value} score={row.aiScore} />
      ),
      sortable: true
    },
    {
      key: 'district',
      title: 'District',
      render: (value) => <span className="text-sm">{value}</span>,
      sortable: true
    },
    {
      key: 'actions',
      title: '',
      render: (_, row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onNavigate(`/o/submission/${row.id}`)}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="text-green-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              Quick Approve
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <XCircle className="h-4 w-4 mr-2" />
              Quick Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  // Calculate stats
  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    aiReview: submissions.filter(s => s.status === 'ai-review').length,
    flagged: submissions.filter(s => s.status === 'flagged').length,
    highRisk: submissions.filter(s => s.riskLevel === 'red').length,
    overdue: submissions.filter(s => s.daysInQueue > 3).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Submission Inbox</h1>
          <p className="text-muted-foreground">
            Review and process loan utilization submissions
          </p>
        </div>
        <div className="flex gap-2">
          {selectedSubmissions.length > 0 && (
            <>
              <Button onClick={handleBulkApprove} size="sm" className="bg-secondary hover:bg-secondary/80">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve ({selectedSubmissions.length})
              </Button>
              <Button onClick={handleBulkReject} size="sm" variant="destructive">
                <XCircle className="h-4 w-4 mr-2" />
                Reject ({selectedSubmissions.length})
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-semibold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-amber-600">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-blue-600">{stats.aiReview}</p>
              <p className="text-xs text-muted-foreground">AI Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-red-600">{stats.flagged}</p>
              <p className="text-xs text-muted-foreground">Flagged</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-red-600">{stats.highRisk}</p>
              <p className="text-xs text-muted-foreground">High Risk</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-orange-600">{stats.overdue}</p>
              <p className="text-xs text-muted-foreground">Overdue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by beneficiary, loan ID, or item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Districts</SelectItem>
            <SelectItem value="bangalore">Bangalore Urban</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="pune">Pune</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="hyderabad">Hyderabad</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedRisk} onValueChange={setSelectedRisk}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk</SelectItem>
            <SelectItem value="red">High Risk</SelectItem>
            <SelectItem value="amber">Medium Risk</SelectItem>
            <SelectItem value="green">Low Risk</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="ai-review">AI Review</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* High Priority Alerts */}
      {stats.flagged > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-900">
                  {stats.flagged} high-risk submissions require immediate attention
                </p>
                <p className="text-sm text-red-700">
                  These submissions have been flagged by AI for potential fraud or irregularities
                </p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                Review Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Table */}
      <DataTable
        data={submissions}
        columns={columns}
        onRowClick={(row) => onNavigate(`/o/submission/${row.id}`)}
        onRowSelect={setSelectedSubmissions}
        selectable
        searchable={false} // We're handling search separately
        pageSize={10}
      />
    </div>
  );
}