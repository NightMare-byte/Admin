import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DataTable, Column } from '../data-table';
import { Plus, FileText } from 'lucide-react';

export function AdminLoans() {
  const loans = [
    {
      id: 'LN-2024-001234',
      beneficiaryName: 'Rajesh Kumar',
      beneficiaryId: 'BEN-2024-5678',
      scheme: 'PMEGP',
      amount: 50000,
      sanctionedDate: '2024-01-01',
      dueDate: '2024-03-31',
      status: 'Active',
      utilized: 35000,
      pending: 15000,
      district: 'Bangalore Urban'
    },
    {
      id: 'LN-2024-001235',
      beneficiaryName: 'Priya Sharma',
      beneficiaryId: 'BEN-2024-5679',
      scheme: 'MUDRA',
      amount: 75000,
      sanctionedDate: '2024-01-02',
      dueDate: '2024-04-02',
      status: 'Active',
      utilized: 60000,
      pending: 15000,
      district: 'Mumbai'
    }
  ];

  const columns: Column<typeof loans[0]>[] = [
    {
      key: 'id',
      title: 'Loan ID',
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
      key: 'scheme',
      title: 'Scheme',
      render: (value) => <Badge variant="outline">{value}</Badge>,
      sortable: true
    },
    {
      key: 'amount',
      title: 'Amount',
      render: (_, row) => (
        <div>
          <p className="font-medium">₹{row.amount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">
            ₹{row.utilized.toLocaleString()} utilized
          </p>
        </div>
      ),
      sortable: true
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => <Badge variant="outline">{value}</Badge>,
      sortable: true
    },
    {
      key: 'dueDate',
      title: 'Due Date',
      render: (value) => new Date(value).toLocaleDateString(),
      sortable: true
    },
    {
      key: 'district',
      title: 'District',
      sortable: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Loan Management</h1>
          <p className="text-muted-foreground">
            Manage loan programs and assignments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Bulk Assign
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Loan
          </Button>
        </div>
      </div>

      <DataTable
        data={loans}
        columns={columns}
        selectable
        searchable
        filterable
        exportable
        pageSize={20}
      />
    </div>
  );
}