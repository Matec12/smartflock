import merge from "lodash/merge";
import ReactApexChart from "react-apexcharts";
import BaseOptionChart from "@/styles/global-styles";
import { Card, CardHeader } from "@/components/UI";

const temperatureData = [
  { time: "00:00", temperature: 25 },
  { time: "03:00", temperature: 26 },
  { time: "06:00", temperature: 27 },
  { time: "09:00", temperature: 24 },
  { time: "12:00", temperature: 23 },
  { time: "15:00", temperature: 22 },
  { time: "18:00", temperature: 25 }
];

const TemperatureChart = () => {
  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: "top", horizontalAlign: "right" },
    chart: {
      type: "area",
      height: 350
    },
    xaxis: {
      categories: temperatureData.map((item) => item.time),
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
      data: temperatureData.map((item) => item.temperature)
    }
  ];

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
