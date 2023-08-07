import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext.tsx";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/index.scss";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <HelmetProvider>
      <AuthProvider>
        <CollapseDrawerProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                padding: "16px",
                borderRadius: "4px",
                maxWidth: "100%"
              }
            }}
          />
          <App />
        </CollapseDrawerProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
