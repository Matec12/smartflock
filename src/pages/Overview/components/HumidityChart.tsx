import merge from "lodash/merge";
import ReactApexChart from "react-apexcharts";
import BaseOptionChart from "@/styles/global-styles";
import { Card, CardHeader } from "@/components/UI";

const humidityData = [
  { time: "00:00", humidity: 40 },
  { time: "03:00", humidity: 45 },
  { time: "06:00", humidity: 50 },
  { time: "09:00", humidity: 55 },
  { time: "12:00", humidity: 60 },
  { time: "15:00", humidity: 65 },
  { time: "18:00", humidity: 70 }
  // ... more data points ...
];
const HumidityChart = () => {
  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: "top", horizontalAlign: "right" },
    chart: {
      type: "area",
      height: 350
    },
    xaxis: {
      categories: humidityData.map((item) => item.time),
      title: {
        text: "Time"
      }
    },
    yaxis: {
      title: {
        text: "Humidity (%)"
      }
    }
  });

  const chartSeries = [
    {
      name: "Humidity",
      data: humidityData.map((item) => item.humidity)
    }
  ];

  return (
    <Card>
      <CardHeader>Humidity Readings</CardHeader>

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

export { HumidityChart };
