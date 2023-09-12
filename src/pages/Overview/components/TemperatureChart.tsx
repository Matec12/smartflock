import merge from "lodash/merge";
import { format } from "date-fns";
import ReactApexChart from "react-apexcharts";
// import { useGetHumTempReadingQuery } from "@/api/readings";
import BaseOptionChart from "@/styles/global-styles";
import { Card, CardHeader, Skeleton } from "@/components/UI";

const temperatureData = [
  { timestamp: "00:00", humValue: 25 },
  { timestamp: "03:00", humValue: 26 },
  { timestamp: "06:00", humValue: 27 },
  { timestamp: "09:00", humValue: 24 },
  { timestamp: "12:00", humValue: 23 },
  { timestamp: "15:00", humValue: 22 },
  { timestamp: "18:00", humValue: 25 }
];

const TemperatureChart = () => {
  // const { data, isLoading } = useGetHumTempReadingQuery();

  // const temperatureData = data?.payload?.data ? data?.payload?.data : [];

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: "top", horizontalAlign: "right" },
    chart: {
      type: "area",
      height: 350
    },
    xaxis: {
      categories: temperatureData
        ?.slice(-10)
        ?.map((item) => item.timestamp),
      title: {
        text: "Time"
      }
    },
    yaxis: {
      title: {
        text: "Temperature (°C)"
      }
    }
  });

  const chartSeries = [
    {
      name: "Temperature",
      data: temperatureData?.slice(-10).map((item) => item.humValue)
    }
  ];

  // if (isLoading) {
  //   return <Skeleton className="w-full h-96" />;
  // }

  return (
    <Card>
      <CardHeader>Temperature Readings</CardHeader>

      <div className="mt-12 mx-12">
        <ReactApexChart
          type="area"
          series={chartSeries}
          options={chartOptions}
          height={364}
        />
      </div>
    </Card>
  );
};

export { TemperatureChart };
