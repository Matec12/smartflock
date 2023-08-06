import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/index.scss";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext.tsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <AuthProvider>
      <CollapseDrawerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CollapseDrawerProvider>
    </AuthProvider>
  </QueryClientProvider>
);
