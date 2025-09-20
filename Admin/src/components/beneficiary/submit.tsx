import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { UploadWidget, UploadFile } from '../upload-widget';
import { 
  MapPin, 
  Camera, 
  AlertCircle, 
  CheckCircle, 
  Wifi, 
  WifiOff,
  Navigation
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface BeneficiarySubmitProps {
  onNavigate: (path: string) => void;
}

export function BeneficiarySubmit({ onNavigate }: BeneficiarySubmitProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState('');
  const [consent, setConsent] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    'Laptop/Computer',
    'Software License',
    'Office Furniture',
    'Machinery/Equipment',
    'Vehicle',
    'Other'
  ];

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationError('');
        toast.success('Location captured successfully');
      },
      (error) => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable location permissions.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out.');
            break;
          default:
            setLocationError('An unknown error occurred while retrieving location.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleSubmit = async () => {
    if (!files.length) {
      toast.error('Please upload at least one file');
      return;
    }

    if (!description.trim()) {
      toast.error('Please provide a description');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!category) {
      toast.error('Please select a category');
      return;
    }

    if (!consent) {
      toast.error('Please provide consent to proceed');
      return;
    }

    setSubmitting(true);

    try {
      // Simulate submission process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const submissionId = 'SUB-' + Date.now();
      
      if (isOnline) {
        toast.success('Submission uploaded successfully!');
        onNavigate(`/b/submissions/${submissionId}`);
      } else {
        toast.success('Submission saved offline - will sync when connected');
        onNavigate('/b/submissions');
      }
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>New Submission</h1>
        <p className="text-muted-foreground">
          Upload photos/videos and details of your purchase
        </p>
      </div>

      {/* Offline Indicator */}
      {!isOnline && (
        <Alert className="border-amber-200 bg-amber-50">
          <WifiOff className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            You're offline. Your submission will be saved locally and uploaded when connection is restored.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Upload Files
              </CardTitle>
              <CardDescription>
                Upload clear photos or videos showing the purchased item, 
                invoice, and any identifying marks or serial numbers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadWidget
                accept="image/*,video/*"
                maxSize={10}
                maxFiles={5}
                onFilesChange={setFiles}
                onUpload={async (files) => {
                  // Simulate upload
                  await new Promise(resolve => setTimeout(resolve, 1000));
                }}
              />
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">
                  Photo Guidelines:
                </h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Include the full item in frame</li>
                  <li>• Capture serial numbers, model details clearly</li>
                  <li>• Include invoice or receipt in a separate photo</li>
                  <li>• Ensure good lighting and focus</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Details Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submission Details</CardTitle>
              <CardDescription>
                Provide information about your purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="25000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the item purchased, where you bought it, and any other relevant details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Verification
              </CardTitle>
              <CardDescription>
                Capture your current location to verify the submission
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {location ? (
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      Location Captured
                    </p>
                    <p className="text-xs text-green-700">
                      Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <Button 
                    variant="outline" 
                    onClick={handleGetLocation}
                    className="w-full"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Use My Location
                  </Button>
                  {locationError && (
                    <Alert className="mt-3 border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        {locationError}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Loan Information */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Loan ID</p>
                <p className="font-medium">LN-2024-001234</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining Amount</p>
                <p className="font-medium text-amber-600">₹15,000</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved Categories</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {['Laptop', 'Software', 'Furniture'].map(cat => (
                    <Badge key={cat} variant="outline" className="text-xs">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submission Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-amber-500" />
                )}
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Connection</span>
                  <Badge variant={isOnline ? "default" : "secondary"}>
                    {isOnline ? "Online" : "Offline"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Queue</span>
                  <Badge variant="outline">0 pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consent & Submit */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked === true)}
                />
                <div>
                  <Label htmlFor="consent" className="text-sm">
                    I consent to the collection and processing of this data for loan verification purposes.
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your data will be used only for verification and will be handled securely.
                  </p>
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                disabled={submitting || !consent}
                className="w-full"
                size="lg"
              >
                {submitting ? 'Submitting...' : 'Submit for Review'}
              </Button>

              <Button 
                variant="outline"
                onClick={() => onNavigate('/b/dashboard')}
                className="w-full"
              >
                Save as Draft
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}