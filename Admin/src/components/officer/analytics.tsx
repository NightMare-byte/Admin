import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export function OfficerAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Performance metrics and fraud detection insights
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-semibold">2.3h</p>
                <p className="text-xs text-muted-foreground">Avg Approval Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-semibold">3.2%</p>
                <p className="text-xs text-muted-foreground">Fraud Detection Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-semibold">94.5%</p>
                <p className="text-xs text-muted-foreground">SLA Compliance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-semibold">1,247</p>
                <p className="text-xs text-muted-foreground">Total Processed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Submissions by District</CardTitle>
            <CardDescription>Volume distribution across regions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Chart placeholder</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fraud Trends</CardTitle>
            <CardDescription>AI detection accuracy over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Chart placeholder</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}