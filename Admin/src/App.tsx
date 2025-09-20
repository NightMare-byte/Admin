import React from 'react';
import { useState } from 'react';
import { AppShell, UserRole } from './components/app-shell';
import { LandingPage } from './components/landing-page';
import { BeneficiaryDashboard } from './components/beneficiary/dashboard';
import { BeneficiaryLoan } from './components/beneficiary/loan';
import { BeneficiarySubmit } from './components/beneficiary/submit';
import { BeneficiarySubmissions } from './components/beneficiary/submissions';
import { OfficerInbox } from './components/officer/inbox';
import { OfficerAnalytics } from './components/officer/analytics';
import { OfficerAudit } from './components/officer/audit';
import { OfficerSubmissionDetail } from './components/officer/submission-detail';
import { AdminOverview } from './components/admin/overview';
import { AdminBeneficiaries } from './components/admin/beneficiaries';
import { AdminLoans } from './components/admin/loans';
import { AdminSubmissions } from './components/admin/submissions';
import { AdminUsers } from './components/admin/users';
import { AdminImports } from './components/admin/imports';
import { AdminSettings } from './components/admin/settings';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [currentPath, setCurrentPath] = useState('/');

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
    // Set default path for each role
    const defaultPaths = {
      beneficiary: '/b/dashboard',
      officer: '/o/inbox',
      admin: '/a/overview'
    } as const;
    setCurrentPath(defaultPaths[role]);
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const renderContent = () => {
    if (!currentRole) {
      return <LandingPage onRoleSelect={handleRoleSelect} />;
    }

    // Beneficiary routes
    if (currentPath.startsWith('/b/')) {
      if (currentPath === '/b/dashboard') {
        return <BeneficiaryDashboard onNavigate={handleNavigate} />;
      }
      if (currentPath === '/b/loan') {
        return <BeneficiaryLoan />;
      }
      if (currentPath === '/b/submit') {
        return <BeneficiarySubmit onNavigate={handleNavigate} />;
      }
      if (currentPath === '/b/submissions') {
        return <BeneficiarySubmissions onNavigate={handleNavigate} />;
      }
      // /b/submissions/:id
      if (currentPath.startsWith('/b/submissions/')) {
        const submissionId = currentPath.split('/').pop() || '';
        return <BeneficiarySubmissions submissionId={submissionId} onNavigate={handleNavigate} />;
      }
    }

    // Officer routes
    if (currentPath.startsWith('/o/')) {
      if (currentPath === '/o/inbox') {
        return <OfficerInbox onNavigate={handleNavigate} />;
      }
      if (currentPath === '/o/analytics') {
        return <OfficerAnalytics />;
      }
      if (currentPath === '/o/audit') {
        return <OfficerAudit />;
      }
      // /o/submission/:id
      if (currentPath.startsWith('/o/submission/')) {
        const submissionId = currentPath.split('/').pop() || '';
        return <OfficerSubmissionDetail submissionId={submissionId} onNavigate={handleNavigate} />;
      }
    }

    // Admin routes
    if (currentPath.startsWith('/a/')) {
      if (currentPath === '/a/overview') {
        return <AdminOverview />;
      }
      if (currentPath === '/a/beneficiaries') {
        return <AdminBeneficiaries />;
      }
      if (currentPath === '/a/loans') {
        return <AdminLoans />;
      }
      if (currentPath === '/a/submissions') {
        return <AdminSubmissions onNavigate={handleNavigate} />;
      }
      if (currentPath === '/a/users') {
        return <AdminUsers />;
      }
      if (currentPath === '/a/imports') {
        return <AdminImports />;
      }
      if (currentPath === '/a/settings') {
        return <AdminSettings />;
      }
    }

    // Fallback generic view
    return (
      <div className="p-8">
        <h1>Welcome to {currentRole} dashboard</h1>
        <p className="text-muted-foreground">Current path: {currentPath}</p>
        <div className="mt-4 space-x-2">
          <button 
            onClick={() => handleNavigate('/b/dashboard')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Beneficiary Dashboard
          </button>
          <button 
            onClick={() => handleNavigate('/o/inbox')}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
          >
            Officer Inbox
          </button>
          <button 
            onClick={() => handleNavigate('/a/overview')}
            className="px-4 py-2 bg-accent text-accent-foreground rounded"
          >
            Admin Overview
          </button>
        </div>
      </div>
    );
  };

  if (!currentRole) {
    return (
      <>
        <LandingPage onRoleSelect={handleRoleSelect} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <AppShell 
        role={currentRole} 
        currentPath={currentPath} 
        onNavigate={handleNavigate}
      >
        {renderContent()}
      </AppShell>
      <Toaster />
    </>
  );
}