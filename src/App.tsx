import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
// import { useGetEnvironmentReadingsQuery } from "./api/readings";

export function App() {
  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }, []);
  // const {} = useGetEnvironmentReadingsQuery();

  return <RouterProvider router={router} />;
}

export default App;
