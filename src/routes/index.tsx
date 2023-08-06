import { Suspense, lazy } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
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
const Home = Loadable(lazy(() => import("../pages/Home")));
/**
 * App Router
 */
export const Router = () => {
  return useRoutes([
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
        { path: "home", element: <Home /> },
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
    { path: "/", element: <Navigate to="/auth/login" replace /> }
  ]);
};
