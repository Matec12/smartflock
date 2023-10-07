import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useGetGasReadingsQuery } from "./api/readings";
import router from "./router";

export function App() {
  // eslint-disable-next-line no-empty-pattern
  // const {} = useGetGasReadingsQuery();

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
