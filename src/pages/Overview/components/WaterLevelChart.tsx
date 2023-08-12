import merge from "lodash/merge";
import ReactApexChart from "react-apexcharts";
import BaseOptionChart from "@/styles/global-styles";
import { Card, CardHeader } from "@/components/UI";

const waterLevelData = [
  { time: "00:00", waterLevel: 50 },
  { time: "03:00", waterLevel: 52 },
  { time: "06:00", waterLevel: 55 },
  { time: "09:00", waterLevel: 58 },
  { time: "12:00", waterLevel: 60 },
  { time: "15:00", waterLevel: 62 },
  { time: "18:00", waterLevel: 65 }
  // ... more data points ...
];
const WaterLevelChart = () => {
  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: "top", horizontalAlign: "right" },
    chart: {
      type: "area",
      height: 350
    },
    xaxis: {
      categories: waterLevelData.map((item) => item.time),
      title: {
        text: "Time"
      }
    },
    yaxis: {
      title: {
        text: "Water Level (%)"
      }
    }
  });

  const chartSeries = [
    {
      name: "Water Level",
      data: waterLevelData.map((item) => item.waterLevel)
    }
  ];

  return (
    <Card>
      <CardHeader>Water Level Readings</CardHeader>

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

export { WaterLevelChart };
