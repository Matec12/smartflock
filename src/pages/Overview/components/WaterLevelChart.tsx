import merge from "lodash/merge";
import { format } from "date-fns";
import ReactApexChart from "react-apexcharts";
import { useGetWaterLevelQuery } from "@/api/readings";
import BaseOptionChart from "@/styles/global-styles";
import { Card, CardHeader, Skeleton } from "@/components/UI";

const WaterLevelChart = () => {
  const { data, isLoading } = useGetWaterLevelQuery();

  const waterLevelData = data?.payload?.data ? data?.payload?.data : [];

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: "top", horizontalAlign: "right" },
    chart: {
      type: "area",
      height: 350
    },
    xaxis: {
      categories: waterLevelData.map((item) =>
        format(new Date(item?.timestamp), "HH:mm")
      ),
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
      data: waterLevelData?.slice(-10).map((item) => item.value)
    }
  ];

  if (isLoading) {
    return <Skeleton className="w-full h-96" />;
  }

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
