import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter, useLocation } from "react-router-dom";
import { Loader } from "@/components/UI/Loader";
import { AuthGuard, GuestGuard } from "@/guards";
import { AuthLayout, DashboardLayout } from "@/layouts";

function Loadable<T extends JSX.IntrinsicAttributes>(Component: React.FC<T>) {
  return (props: T) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();

    return (
      <Suspense
        fallback={
          !pathname.includes("/dashboard") ? (
            <div className="w-full h-[calc(100vh-var(--header-height))] flex items-center justify-center">
              <Loader />
            </div>
          ) : null
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
}

// AUTHENTICATION
const Register = Loadable(lazy(() => import("../pages/Auth/Register")));
const Login = Loadable(lazy(() => import("../pages/Auth/Login")));
const VerifyEmail = Loadable(lazy(() => import("../pages/Auth/VerifyEmail")));
const ForgotPassword = Loadable(
  lazy(() => import("../pages/Auth/ForgotPassword"))
);
const ResetPassword = Loadable(
  lazy(() => import("../pages/Auth/ResetPassword"))
);

// DASHBOARD
const Overview = Loadable(lazy(() => import("../pages/Overview")));
const Activity = Loadable(lazy(() => import("../pages/Activity")));
const Cycle = Loadable(lazy(() => import("../pages/Cycle")));
const CycleDetails = Loadable(
  lazy(() => import("../pages/Cycle/components/CycleDetails"))
);

/**
 * App Router
 */
const router = createBrowserRouter([
  {
    path: "auth",
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />
      }
    ]
  },
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { path: "overview", element: <Overview /> },
      { path: "activity", element: <Activity /> },
      { path: "system-data/cycles", element: <Cycle /> },
      { path: "system-data/cycles/:id/:name/:tab", element: <CycleDetails /> },

      {
        path: "verify-email/:token",
        element: (
          <GuestGuard>
            <VerifyEmail />
          </GuestGuard>
        )
      }
    ]
  },
  { path: "/", element: <Navigate to="/auth/login" replace /> },
  { path: "*", element: <Navigate to="/auth/login" replace /> }
]);

export default router;
