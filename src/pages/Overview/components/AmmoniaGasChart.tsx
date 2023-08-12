import merge from "lodash/merge";
import ReactApexChart from "react-apexcharts";
import BaseOptionChart from "@/styles/global-styles";
import { Card, CardHeader } from "@/components/UI";

const ammoniaGasData = [
  { time: "00:00", ammoniaLevel: 10 },
  { time: "03:00", ammoniaLevel: 12 },
  { time: "06:00", ammoniaLevel: 15 },
  { time: "09:00", ammoniaLevel: 18 },
  { time: "12:00", ammoniaLevel: 20 },
  { time: "15:00", ammoniaLevel: 22 },
  { time: "18:00", ammoniaLevel: 25 }
  // ... more data points ...
];
const AmmoniaGasChart = () => {
  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: "top", horizontalAlign: "right" },
    chart: {
      type: "area",
      height: 350
    },
    xaxis: {
      categories: ammoniaGasData.map((item) => item.time),
      title: {
        text: "Time"
      }
    },
    yaxis: {
      title: {
        text: "Ammonia Gas Level (ppm)"
      }
    }
  });

  const chartSeries = [
    {
      name: "Ammonia Gas",
      data: ammoniaGasData.map((item) => item.ammoniaLevel)
    }
  ];

  return (
    <Card>
      <CardHeader>Ammonia Gas Readings</CardHeader>

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

export { AmmoniaGasChart };
