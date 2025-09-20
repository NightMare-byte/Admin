import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  Building2, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive
} from 'lucide-react';

export function AdminOverview() {
  const systemStats = {
    totalUsers: 1247,
    activeLoans: 892,
    totalSubmissions: 5643,
    storageUsed: 67.4,
    systemHealth: 98.5,
    dailyActiveUsers: 234,
    processingQueue: 45,
    fraudAlerts: 3
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>System Overview</h1>
        <p className="text-muted-foreground">
          Monitor system health, user activity, and key metrics
        </p>
      </div>

      {/* System Health */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            System Status: Operational
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-green-700">Uptime</p>
              <p className="text-lg font-semibold text-green-900">{systemStats.systemHealth}%</p>
            </div>
            <div>
              <p className="text-sm text-green-700">Storage Used</p>
              <p className="text-lg font-semibold text-green-900">{systemStats.storageUsed}%</p>
              <Progress value={systemStats.storageUsed} className="mt-1 h-2" />
            </div>
            <div>
              <p className="text-sm text-green-700">Processing Queue</p>
              <p className="text-lg font-semibold text-green-900">{systemStats.processingQueue} items</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-semibold">{systemStats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-semibold">{systemStats.activeLoans.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Active Loans</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-semibold">{systemStats.totalSubmissions.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Submissions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-semibold">{systemStats.dailyActiveUsers}</p>
                <p className="text-xs text-muted-foreground">Daily Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {systemStats.fraudAlerts > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-900">
                  {systemStats.fraudAlerts} fraud alerts require attention
                </p>
                <p className="text-sm text-red-700">
                  High-risk submissions detected by AI analysis
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'New user registration', time: '2 minutes ago', type: 'user' },
                { action: 'Submission approved', time: '5 minutes ago', type: 'approval' },
                { action: 'Loan created', time: '12 minutes ago', type: 'loan' },
                { action: 'Data import completed', time: '1 hour ago', type: 'import' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    {item.type === 'user' && <Users className="h-4 w-4 text-blue-600" />}
                    {item.type === 'approval' && <CheckCircle className="h-4 w-4 text-secondary" />}
                    {item.type === 'loan' && <Building2 className="h-4 w-4 text-accent" />}
                    {item.type === 'import' && <HardDrive className="h-4 w-4 text-primary" />}
                    <span className="text-sm">{item.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Queue</CardTitle>
            <CardDescription>Items awaiting processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">AI Analysis Queue</span>
                <Badge variant="outline">23 items</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Manual Review Queue</span>
                <Badge variant="outline">12 items</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Notification Queue</span>
                <Badge variant="outline">10 items</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Export Queue</span>
                <Badge variant="outline">0 items</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}