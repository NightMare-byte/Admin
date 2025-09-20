import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { DataTable, Column } from '../data-table';
import { Search, Shield, User, FileText } from 'lucide-react';

export function OfficerAudit() {
  const auditLogs = [
    {
      id: '1',
      timestamp: '2024-01-22T10:30:00Z',
      action: 'APPROVE_SUBMISSION',
      user: 'Officer Sharma',
      target: 'SUB-2024-001',
      details: 'Approved laptop purchase submission',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      timestamp: '2024-01-22T09:15:00Z',
      action: 'REJECT_SUBMISSION',
      user: 'Officer Patel',
      target: 'SUB-2024-002',
      details: 'Rejected due to poor image quality',
      ipAddress: '192.168.1.101'
    }
  ];

  const columns: Column<typeof auditLogs[0]>[] = [
    {
      key: 'timestamp',
      title: 'Time',
      render: (value) => new Date(value).toLocaleString(),
      sortable: true
    },
    {
      key: 'action',
      title: 'Action',
      render: (value) => <Badge variant="outline">{value}</Badge>,
      sortable: true
    },
    {
      key: 'user',
      title: 'User',
      sortable: true
    },
    {
      key: 'target',
      title: 'Target',
      sortable: true
    },
    {
      key: 'details',
      title: 'Details',
      sortable: false
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Audit Log</h1>
        <p className="text-muted-foreground">
          Track all system activities and user actions
        </p>
      </div>

      <DataTable
        data={auditLogs}
        columns={columns}
        searchable
        filterable
        exportable
        pageSize={20}
      />
    </div>
  );
}