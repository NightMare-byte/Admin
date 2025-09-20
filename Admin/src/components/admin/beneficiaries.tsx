import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DataTable, Column } from '../data-table';
import { Plus, Upload } from 'lucide-react';

export function AdminBeneficiaries() {
  const beneficiaries = [
    {
      id: 'BEN-2024-5678',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91-9876543210',
      district: 'Bangalore Urban',
      state: 'Karnataka',
      status: 'Active',
      loansCount: 1,
      totalAmount: 50000,
      registeredOn: '2024-01-01'
    },
    {
      id: 'BEN-2024-5679',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91-9876543211',
      district: 'Mumbai',
      state: 'Maharashtra',
      status: 'Active',
      loansCount: 2,
      totalAmount: 125000,
      registeredOn: '2024-01-02'
    }
  ];

  const columns: Column<typeof beneficiaries[0]>[] = [
    {
      key: 'name',
      title: 'Beneficiary',
      render: (_, row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.id}</p>
        </div>
      ),
      sortable: true
    },
    {
      key: 'email',
      title: 'Contact',
      render: (_, row) => (
        <div>
          <p className="text-sm">{row.email}</p>
          <p className="text-xs text-muted-foreground">{row.phone}</p>
        </div>
      ),
      sortable: true
    },
    {
      key: 'district',
      title: 'Location',
      render: (_, row) => (
        <div>
          <p className="text-sm">{row.district}</p>
          <p className="text-xs text-muted-foreground">{row.state}</p>
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
      key: 'loansCount',
      title: 'Loans',
      render: (_, row) => (
        <div>
          <p className="text-sm">{row.loansCount} loans</p>
          <p className="text-xs text-muted-foreground">₹{row.totalAmount.toLocaleString()}</p>
        </div>
      ),
      sortable: true
    },
    {
      key: 'registeredOn',
      title: 'Registered',
      render: (value) => new Date(value).toLocaleDateString(),
      sortable: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Beneficiaries</h1>
          <p className="text-muted-foreground">
            Manage loan beneficiaries and their information
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Beneficiary
          </Button>
        </div>
      </div>

      <DataTable
        data={beneficiaries}
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