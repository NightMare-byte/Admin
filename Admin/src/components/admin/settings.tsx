import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { 
  Building2, 
  Bell, 
  Shield, 
  Database,
  Settings as SettingsIcon,
  Save
} from 'lucide-react';

export function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1>System Settings</h1>
        <p className="text-muted-foreground">
          Configure system-wide settings and preferences
        </p>
      </div>

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data & Storage</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Organization Information
              </CardTitle>
              <CardDescription>
                Basic information about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input id="orgName" defaultValue="Ministry of MSME" />
                </div>
                <div>
                  <Label htmlFor="orgCode">Organization Code</Label>
                  <Input id="orgCode" defaultValue="MSME-001" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" defaultValue="support@pmegp.gov.in" />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input id="contactPhone" defaultValue="+91-11-23061771" />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="Nirman Bhawan, New Delhi - 110011" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="multiLanguage" defaultChecked />
                <Label htmlFor="multiLanguage">Enable multi-language support</Label>
              </div>

              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Send email alerts for important events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Send SMS alerts for critical events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Real-time Dashboard Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Show live updates on dashboards
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Triggers</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New submission received</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High-risk submission flagged</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SLA breach warning</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System maintenance</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security & Access
              </CardTitle>
              <CardDescription>
                Configure security policies and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" className="w-32" />
                </div>

                <div>
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input id="passwordMinLength" type="number" defaultValue="8" className="w-32" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Require Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Mandatory 2FA for all users
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">IP Address Restrictions</p>
                    <p className="text-sm text-muted-foreground">
                      Restrict access to specific IP ranges
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Audit Logging</p>
                    <p className="text-sm text-muted-foreground">
                      Log all user actions for audit trail
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Data & Storage
              </CardTitle>
              <CardDescription>
                Manage data retention and storage policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dataRetention">Data Retention Period (years)</Label>
                  <Input id="dataRetention" type="number" defaultValue="7" className="w-32" />
                  <p className="text-xs text-muted-foreground mt-1">
                    How long to keep submission data
                  </p>
                </div>

                <div>
                  <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
                  <Input id="maxFileSize" type="number" defaultValue="10" className="w-32" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Automatic Backup</p>
                    <p className="text-sm text-muted-foreground">
                      Daily automatic backups
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Compression</p>
                    <p className="text-sm text-muted-foreground">
                      Compress stored files to save space
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Storage Statistics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-muted rounded">
                    <p className="text-muted-foreground">Total Storage</p>
                    <p className="font-medium">2.4 TB</p>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <p className="text-muted-foreground">Used</p>
                    <p className="font-medium">1.6 TB (67%)</p>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <p className="text-muted-foreground">Available</p>
                    <p className="font-medium">800 GB</p>
                  </div>
                </div>
              </div>

              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Data Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                AI Analysis Settings
              </CardTitle>
              <CardDescription>
                Configure AI models and detection thresholds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="confidenceThreshold">Confidence Threshold</Label>
                  <Input 
                    id="confidenceThreshold" 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    max="1" 
                    defaultValue="0.7" 
                    className="w-32" 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum confidence score for auto-approval
                  </p>
                </div>

                <div>
                  <Label htmlFor="gpsAccuracy">GPS Accuracy Tolerance (meters)</Label>
                  <Input id="gpsAccuracy" type="number" defaultValue="100" className="w-32" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Object Detection</p>
                    <p className="text-sm text-muted-foreground">
                      Verify objects in uploaded images
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Duplicate Detection</p>
                    <p className="text-sm text-muted-foreground">
                      Check for duplicate submissions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable OCR Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      Extract text from documents
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Risk Thresholds</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Low Risk (Green)</span>
                    <span className="text-sm font-mono">≥ 0.8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Medium Risk (Amber)</span>
                    <span className="text-sm font-mono">0.5 - 0.8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Risk (Red)</span>
                    <span className="text-sm font-mono">{'< 0.5'}</span>
                  </div>
                </div>
              </div>

              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save AI Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}