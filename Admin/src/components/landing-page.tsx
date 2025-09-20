import { Building2, Users, Shield, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { UserRole } from './app-shell';

interface LandingPageProps {
  onRoleSelect: (role: UserRole) => void;
}

export function LandingPage({ onRoleSelect }: LandingPageProps) {
  const roles = [
    {
      id: 'beneficiary' as UserRole,
      title: 'Beneficiary Portal',
      description: 'Submit utilization proofs and track your loan status',
      icon: Users,
      features: [
        'Submit photos and videos of purchased items',
        'Track submission status in real-time',
        'View loan details and requirements',
        'Get help and support'
      ],
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'officer' as UserRole,
      title: 'Loan Officer Console',
      description: 'Review submissions and manage approvals',
      icon: FileText,
      features: [
        'Review utilization submissions',
        'AI-powered fraud detection',
        'Bulk approval workflows',
        'Analytics and reporting'
      ],
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'admin' as UserRole,
      title: 'System Admin Panel',
      description: 'Manage users, loans, and system settings',
      icon: Shield,
      features: [
        'User and role management',
        'Loan program configuration',
        'Data imports and exports',
        'System monitoring and settings'
      ],
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">LoanTrack</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive loan utilization tracking and management platform
            for government lending programs
          </p>
          <Badge variant="secondary" className="mt-4">
            Government-Grade Security & Compliance
          </Badge>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card 
                key={role.id}
                className={`${role.color} transition-all duration-200 cursor-pointer transform hover:scale-105`}
                onClick={() => onRoleSelect(role.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onRoleSelect(role.id);
                    }}
                  >
                    Access {role.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Demo Notice */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 border border-amber-200">
            <div className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse" />
            <span className="text-sm text-amber-800">
              Demo Environment - Sample data and mock authentication
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { title: 'AI-Powered', description: 'Automated fraud detection and image analysis' },
            { title: 'Mobile-First', description: 'Optimized for smartphones and tablets' },
            { title: 'Real-Time', description: 'Instant status updates and notifications' },
            { title: 'Secure', description: 'End-to-end encryption and audit trails' }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 rounded bg-primary" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}