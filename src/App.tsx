import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";

export function App() {
  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
