import { DataTable, Column } from '../data-table';
import { StatusBadge, RiskBadge } from '../status-badge';
import { Eye } from 'lucide-react';
import { Button } from '../ui/button';

interface AdminSubmissionsProps {
  onNavigate: (path: string) => void;
}

export function AdminSubmissions({ onNavigate }: AdminSubmissionsProps) {
  const submissions = [
    {
      id: 'SUB-2024-001',
      beneficiaryName: 'Rajesh Kumar',
      beneficiaryId: 'BEN-2024-5678',
      item: 'Dell Laptop',
      amount: 25000,
      status: 'approved' as const,
      riskLevel: 'green' as const,
      submittedOn: '2024-01-20',
      reviewedBy: 'Officer Sharma',
      district: 'Bangalore Urban'
    }
  ];

  const columns: Column<typeof submissions[0]>[] = [
    {
      key: 'id',
      title: 'Submission ID',
      render: (value) => <span className="font-mono text-xs">{value}</span>,
      sortable: true
    },
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
      key: 'item',
      title: 'Item & Amount',
      render: (_, row) => (
        <div>
          <p className="font-medium">{row.item}</p>
          <p className="text-xs text-muted-foreground">₹{row.amount.toLocaleString()}</p>
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
      render: (value) => <RiskBadge level={value} />,
      sortable: true
    },
    {
      key: 'submittedOn',
      title: 'Submitted',
      render: (value) => new Date(value).toLocaleDateString(),
      sortable: true
    },
    {
      key: 'reviewedBy',
      title: 'Reviewed By',
      sortable: true
    },
    {
      key: 'actions',
      title: '',
      render: (_, row) => (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate(`/o/submission/${row.id}`)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>All Submissions</h1>
        <p className="text-muted-foreground">
          Global view of all loan utilization submissions
        </p>
      </div>

      <DataTable
        data={submissions}
        columns={columns}
        searchable
        filterable
        exportable
        pageSize={20}
      />
    </div>
  );
}