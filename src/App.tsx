import { Toaster } from "react-hot-toast";
import { Router } from "./routes";

function App() {
  return (
    <>
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

      <Router />
    </>
  );
}

export default App;
