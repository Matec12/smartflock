import axios from "..";
import { useQuery } from "@tanstack/react-query";
import { HumTempReading, Reading } from "./types";

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

const checkAndNotifyAmmonia = (latestAmmoniaData: Reading) => {
  const previousAmmoniaId = localStorage.getItem("latestAmmoniaId");
  if (
    previousAmmoniaId !== null &&
    previousAmmoniaId !== latestAmmoniaData._id
  ) {
    const currValue = latestAmmoniaData?.value;
    if (currValue > 1) {
      const noti = new Notification(`New Gas Reading Received from SMARTLOCK`, {
        body: `Ammonia Value: ${latestAmmoniaData.value}`,
        icon: "SMARTLOCK"
      });

      clickAndNotify(noti);
    }
  }

  localStorage.setItem("latestAmmoniaId", latestAmmoniaData._id);
};

/**
 * org get all gas reading
 * @returns
 */
const _getGasReadingsRequest = async (): Promise<
  ApiResponse<{ message: string; data: Reading[] }>
> => {
  const { data } = await axios.get("gas_reading");
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useGetGasReadingsQuery = () =>
  useQuery({
    queryKey: ["gas_reading"],
    queryFn: () => _getGasReadingsRequest(),
    refetchInterval: 30000,
    onSuccess: (data) => {
      const latestAmmoniaData = data?.payload?.data?.slice(-1)[0];
      if (latestAmmoniaData) {
        checkAndNotifyAmmonia(latestAmmoniaData);
      }
    }
  });

/**
 * org get all water level reading
 * @returns
 */
const _getWaterLevelRequest = async (): Promise<
  ApiResponse<{ message: string; data: Reading[] }>
> => {
  const { data } = await axios.get("water_level");
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useGetWaterLevelQuery = () =>
  useQuery({
    queryKey: ["water_level"],
    queryFn: () => _getWaterLevelRequest(),
    refetchInterval: 60000
  });

const checkAndNotifyHumTemp = (latestHumTempData: HumTempReading) => {
  const previousHumTempId = localStorage.getItem("latestHumTempId");
  if (
    previousHumTempId !== null &&
    previousHumTempId !== latestHumTempData._id
  ) {
    const currHumValue = latestHumTempData?.humValue;
    const currTempValue = latestHumTempData?.tempValue;

    if (currHumValue > 81 || currHumValue < 40) {
      const noti = new Notification(
        `New Humidity Reading Received from SMARTLOCK`,
        {
          body: `Humidity Value: ${latestHumTempData.humValue}`,
          icon: "SMARTLOCK"
        }
      );

      clickAndNotify(noti);
    }

    if (currTempValue > 30 || currTempValue < 20) {
      const noti = new Notification(
        `New Temperature Reading Received from SMARTLOCK`,
        {
          body: `Temperature Value: ${latestHumTempData.tempValue}`,
          icon: "SMARTLOCK"
        }
      );

      clickAndNotify(noti);
    }
  }

  localStorage.setItem("latestHumTempId", latestHumTempData._id);
};

/**
 * org get all gas reading
 * @returns
 */
const _getHumTempReadingRequest = async (): Promise<
  ApiResponse<{ message: string; data: HumTempReading[] }>
> => {
  const { data } = await axios.get("hum_temp");
  return data;
};

/**
 * hook wrapper
 * @param user
 * @returns
 */
export const useGetHumTempReadingQuery = () =>
  useQuery({
    queryKey: ["hum_temp"],
    queryFn: () => _getHumTempReadingRequest(),
    refetchInterval: 60000,
    onSuccess: (data) => {
      const latestHumTempData = data?.payload?.data?.slice(-1)[0];
      if (latestHumTempData) {
        checkAndNotifyHumTemp(latestHumTempData);
      }
    }
  });
