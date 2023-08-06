import { ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks";
import { Loader } from "@/components/UI";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Auth/Login";
import VerifyEmail from "@/pages/Auth/VerifyEmail";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isVerified, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (!isInitialized) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return (
      <AuthLayout>
        <Login />
      </AuthLayout>
    );
  }

  if (isAuthenticated && !isVerified) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return (
      <AuthLayout>
        <VerifyEmail />
      </AuthLayout>
    );
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
