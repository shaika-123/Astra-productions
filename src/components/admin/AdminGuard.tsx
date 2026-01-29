'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminContext } from '@/contexts/AdminContext';
import { Loader2, ShieldX, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminGuardProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

export function AdminGuard({ children, requiredPermission }: AdminGuardProps) {
  const router = useRouter();
  const { isLoading, isStaff, hasPermission, staff } = useAdminContext();

  useEffect(() => {
    if (!isLoading && !isStaff) {
      // Will show forbidden screen instead of redirect for better UX
    }
  }, [isLoading, isStaff, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Not authenticated or not staff
  if (!isStaff) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full mx-4 p-8 bg-card rounded-xl border border-border text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldX className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don&apos;t have permission to access the admin panel. 
            Please sign in with an authorized staff account.
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={() => router.push('/auth/signin')} className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/')} 
              className="w-full"
            >
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Check specific permission if required
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full mx-4 p-8 bg-card rounded-xl border border-border text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-yellow-500/10 flex items-center justify-center">
            <ShieldX className="h-8 w-8 text-yellow-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Permission Required</h1>
          <p className="text-muted-foreground mb-4">
            You don&apos;t have the required permission to view this page.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Required: <code className="bg-muted px-2 py-1 rounded">{requiredPermission}</code>
          </p>
          <Button 
            variant="outline" 
            onClick={() => router.push('/admin')} 
            className="w-full"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default AdminGuard;
