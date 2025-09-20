import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { UploadWidget, UploadFile } from '../upload-widget';
import { 
  Upload, 
  Download, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText,
  Users,
  Building2
} from 'lucide-react';

export function AdminImports() {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  
  const importHistory = [
    {
      id: 'IMP-001',
      type: 'Beneficiaries',
      fileName: 'beneficiaries_jan_2024.csv',
      uploadedOn: '2024-01-20T10:30:00Z',
      status: 'Completed',
      totalRecords: 150,
      successfulRecords: 147,
      errorRecords: 3,
      uploadedBy: 'Admin User'
    },
    {
      id: 'IMP-002',
      type: 'Loans',
      fileName: 'loans_batch_5.xlsx',
      uploadedOn: '2024-01-19T14:15:00Z',
      status: 'Completed',
      totalRecords: 89,
      successfulRecords: 89,
      errorRecords: 0,
      uploadedBy: 'Admin User'
    },
    {
      id: 'IMP-003',
      type: 'Beneficiaries',
      fileName: 'beneficiaries_dec_2023.csv',
      uploadedOn: '2024-01-18T09:45:00Z',
      status: 'Failed',
      totalRecords: 200,
      successfulRecords: 0,
      errorRecords: 200,
      uploadedBy: 'Officer Sharma'
    }
  ];

  const templates = [
    {
      name: 'Beneficiaries Template',
      description: 'Template for importing beneficiary data',
      fileName: 'beneficiaries_template.csv',
      requiredFields: ['Name', 'Email', 'Phone', 'District', 'State']
    },
    {
      name: 'Loans Template',
      description: 'Template for importing loan information',
      fileName: 'loans_template.xlsx',
      requiredFields: ['Beneficiary ID', 'Scheme', 'Amount', 'Sanctioned Date']
    },
    {
      name: 'Users Template',
      description: 'Template for importing system users',
      fileName: 'users_template.csv',
      requiredFields: ['Name', 'Email', 'Role', 'District']
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Data Import/Export</h1>
        <p className="text-muted-foreground">
          Import data from CSV/Excel files and manage data exports
        </p>
      </div>

      <Tabs defaultValue="import" className="space-y-6">
        <TabsList>
          <TabsTrigger value="import">Import Data</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">Import History</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Data File</CardTitle>
                  <CardDescription>
                    Upload CSV or Excel files to import data into the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UploadWidget
                    accept=".csv,.xlsx,.xls"
                    maxSize={50}
                    maxFiles={1}
                    multiple={false}
                    onFilesChange={setUploadFiles}
                    onUpload={async (files) => {
                      // Simulate upload
                      await new Promise(resolve => setTimeout(resolve, 2000));
                    }}
                  />
                </CardContent>
              </Card>

              {/* Mapping Step (shown after file upload) */}
              {uploadFiles.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Column Mapping</CardTitle>
                    <CardDescription>
                      Map the columns from your file to system fields
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">File Column</label>
                          <p className="text-sm text-muted-foreground">Name</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">System Field</label>
                          <select className="w-full px-3 py-2 border rounded-md">
                            <option>Beneficiary Name</option>
                            <option>First Name</option>
                            <option>Full Name</option>
                          </select>
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        Start Import
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Import Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Use the provided templates for best results</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>File size limit: 50MB</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Supported formats: CSV, XLSX, XLS</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Always backup before importing large datasets</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Imports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {importHistory.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="text-sm font-medium">{item.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.successfulRecords}/{item.totalRecords} records
                        </p>
                      </div>
                      <Badge 
                        variant={
                          item.status === 'Completed' ? 'default' :
                          item.status === 'Failed' ? 'destructive' :
                          'secondary'
                        }
                        className={
                          item.status === 'Completed' 
                            ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            : ''
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {template.name.includes('Beneficiaries') && <Users className="h-4 w-4" />}
                    {template.name.includes('Loans') && <Building2 className="h-4 w-4" />}
                    {template.name.includes('Users') && <FileText className="h-4 w-4" />}
                    {template.name}
                  </CardTitle>
                  <CardDescription>
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Required Fields:</p>
                    <div className="space-y-1">
                      {template.requiredFields.map((field, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground">
                          • {field}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="space-y-4">
            {importHistory.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{item.fileName}</h3>
                        <Badge 
                          variant={
                            item.status === 'Completed' ? 'default' :
                            item.status === 'Failed' ? 'destructive' :
                            'secondary'
                          }
                          className={
                            item.status === 'Completed' 
                              ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                              : ''
                          }
                        >
                          {item.status}
                        </Badge>
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span>Total Records: {item.totalRecords}</span>
                        </div>
                        <div>
                          <span>Successful: {item.successfulRecords}</span>
                        </div>
                        <div>
                          <span>Errors: {item.errorRecords}</span>
                        </div>
                        <div>
                          <span>By: {item.uploadedBy}</span>
                        </div>
                      </div>

                      {item.status === 'Completed' && item.errorRecords > 0 && (
                        <div className="mt-3">
                          <Progress 
                            value={(item.successfulRecords / item.totalRecords) * 100} 
                            className="h-2"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {((item.successfulRecords / item.totalRecords) * 100).toFixed(1)}% success rate
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {item.errorRecords > 0 && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download Errors
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}