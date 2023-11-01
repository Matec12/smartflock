import axios from "..";
import { useQuery } from "@tanstack/react-query";
import { EnvironmentReading } from "./types";

const playSound = (url: string) => {
  const audio = new Audio(url);
  const resp = audio.play();

  if (resp !== undefined) {
    resp
      .then((_) => {})
      .catch((error) => {
        console.log(error);
      });
  }
};

const beep =
  "https://res.cloudinary.com/matec-technology-services/video/upload/v1692170386/smartflock/mixkit-appliance-ready-beep-1076_dzhdck.wav";

const clickAndNotify = (noti: Notification) => {
  noti.onclick = () => {
    window.open(`/dashboard/overview`);
    noti.close();
  };

  noti.onshow = () => {
    beep && playSound(beep);
  };
};

const checkAndNotifyEnviroment = (latestReading: EnvironmentReading) => {
  const previousEnviromentId = localStorage.getItem("latestEnviromentId");
  if (
    previousEnviromentId !== null &&
    previousEnviromentId !== latestReading._id
  ) {
    const currGasValue = latestReading?.gasValue;
    const currTempValue = latestReading?.tempValue;
    const currHumValue = latestReading?.humValue;
    
    if (currGasValue > 60) {
      const noti = new Notification(
        `New Environment Reading Received from SMARTLOCK`,
        {
          body: `Ammonia Value: ${latestReading.gasValue}`,
          icon: "SMARTLOCK"
        }
      );
      clickAndNotify(noti);
    }
    if (currTempValue > 30) {
      const noti = new Notification(
        `New Temperature Reading Received from SMARTLOCK`,
        {
          body: `Temperature Value: ${latestReading.tempValue}`,
          icon: "SMARTLOCK"
        }
      );

      clickAndNotify(noti);
    }
    if (currHumValue > 30) {
      const noti = new Notification(
        `New Humidity Reading Received from SMARTLOCK`,
        {
          body: `Humidity Value: ${latestReading.humValue}`,
          icon: "SMARTLOCK"
        }
      );

      clickAndNotify(noti);
    }
  }

  localStorage.setItem("latestEnviromentId", latestReading._id);
};

/**
 * org get all gas reading
 * @returns
 */
const _getEnvironmentReadingsRequest = async (): Promise<
  ApiResponse<{ message: string; data: EnvironmentReading[] }>
> => {
  const { data } = await axios.get("environment_reading");
  return data;
};

/**
 * hook wrapper
 * @param environment
 * @returns
 */
export const useGetEnvironmentReadingsQuery = () =>
  useQuery({
    queryKey: ["gas_reading"],
    queryFn: () => _getEnvironmentReadingsRequest(),
    refetchInterval: 10000,
    onSuccess: (data) => {
      const latestReading = data?.payload?.data?.slice(-1)[0];
      if (latestReading) {
        checkAndNotifyEnviroment(latestReading);
      }
    }
  });
