import React from 'react';
import { useState } from 'react';
import { 
  Building2, 
  Users, 
  FileText, 
  Upload, 
  Settings, 
  Bell, 
  Search, 
  Menu,
  ChevronDown,
  BarChart3,
  Shield,
  Home,
  Send,
  Eye,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { cn } from './ui/utils';

export type UserRole = 'beneficiary' | 'officer' | 'admin';

interface NavigationItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
}

interface AppShellProps {
  role: UserRole;
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

const navigationConfig: Record<UserRole, NavigationItem[]> = {
  beneficiary: [
    { title: 'Dashboard', icon: Home, href: '/b/dashboard' },
    { title: 'My Loan', icon: FileText, href: '/b/loan' },
    { title: 'New Submission', icon: Send, href: '/b/submit' },
    { title: 'My Submissions', icon: Eye, href: '/b/submissions' },
  ],
  officer: [
    { title: 'Inbox', icon: FileText, href: '/o/inbox', badge: '12' },
    { title: 'Analytics', icon: BarChart3, href: '/o/analytics' },
    { title: 'Audit Log', icon: Shield, href: '/o/audit' },
  ],
  admin: [
    { title: 'Overview', icon: Home, href: '/a/overview' },
    { title: 'Beneficiaries', icon: Users, href: '/a/beneficiaries' },
    { title: 'Loans', icon: Building2, href: '/a/loans' },
    { title: 'Submissions', icon: FileText, href: '/a/submissions' },
    { title: 'Users', icon: User, href: '/a/users' },
    { title: 'Imports', icon: Upload, href: '/a/imports' },
    { title: 'Settings', icon: Settings, href: '/a/settings' },
  ],
};

const roleLabels: Record<UserRole, string> = {
  beneficiary: 'Beneficiary',
  officer: 'Loan Officer',
  admin: 'System Admin',
};

export function AppShell({ role, currentPath, onNavigate, children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = navigationConfig[role];

  const Sidebar = ({ className }: { className?: string }) => (
    <div className={cn('flex h-full w-64 flex-col border-r bg-card', className)}>
      <div className="flex h-16 items-center px-6 border-b">
        <Building2 className="h-8 w-8 text-primary" />
        <span className="ml-2 font-semibold">LoanTrack</span>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <button
              key={item.href}
              onClick={() => {
                onNavigate(item.href);
                setSidebarOpen(false);
              }}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              )}
            >
              <div className="flex items-center">
                <item.icon className="h-5 w-5 mr-3" />
                {item.title}
              </div>
              {item.badge && (
                <Badge variant="secondary" className="h-5 text-xs">
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="h-screen flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar - Simple overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search loans, beneficiaries..." 
                className="pl-9 w-80"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/api/placeholder/32/32" />
                    <AvatarFallback>
                      {role === 'admin' ? 'AD' : role === 'officer' ? 'OF' : 'BE'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="text-sm">John Doe</div>
                    <div className="text-xs text-muted-foreground">
                      {roleLabels[role]}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Switch Role</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}