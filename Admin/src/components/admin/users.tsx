import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DataTable, Column } from '../data-table';
import { Plus, UserPlus } from 'lucide-react';

export function AdminUsers() {
  const users = [
    {
      id: 'USR-001',
      name: 'Priya Sharma',
      email: 'priya.sharma@pmegp.gov.in',
      role: 'officer',
      status: 'Active',
      district: 'Bangalore Urban',
      lastLogin: '2024-01-22T10:30:00Z',
      submissionsHandled: 45
    },
    {
      id: 'USR-002',
      name: 'Amit Patel',
      email: 'amit.patel@mudra.gov.in',
      role: 'officer',
      status: 'Active',
      district: 'Mumbai',
      lastLogin: '2024-01-22T09:15:00Z',
      submissionsHandled: 67
    },
    {
      id: 'USR-003',
      name: 'Admin User',
      email: 'admin@loantrack.gov.in',
      role: 'admin',
      status: 'Active',
      district: 'All',
      lastLogin: '2024-01-22T11:00:00Z',
      submissionsHandled: 0
    }
  ];

  const columns: Column<typeof users[0]>[] = [
    {
      key: 'name',
      title: 'User',
      render: (_, row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
      sortable: true
    },
    {
      key: 'role',
      title: 'Role',
      render: (value) => (
        <Badge variant={value === 'admin' ? 'default' : 'outline'}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
      sortable: true
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      ),
      sortable: true
    },
    {
      key: 'district',
      title: 'District',
      sortable: true
    },
    {
      key: 'submissionsHandled',
      title: 'Submissions',
      render: (value) => value || 'N/A',
      sortable: true
    },
    {
      key: 'lastLogin',
      title: 'Last Login',
      render: (value) => new Date(value).toLocaleDateString(),
      sortable: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>User Management</h1>
          <p className="text-muted-foreground">
            Manage system users and their roles
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <DataTable
        data={users}
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