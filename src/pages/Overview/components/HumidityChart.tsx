import merge from "lodash/merge";
import { format } from "date-fns";
import ReactApexChart from "react-apexcharts";
import { useGetEnvironmentReadingsQuery } from "@/api/readings";
import BaseOptionChart from "@/styles/global-styles";
import { Card, CardHeader, Skeleton } from "@/components/UI";

const HumidityChart = () => {
  const { data, isLoading } = useGetEnvironmentReadingsQuery();

  const humidityData = data?.payload?.data
    ? data?.payload?.data.map((data) => data)
    : [];

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: "top", horizontalAlign: "right" },
    chart: {
      type: "area",
      height: 350
    },
    xaxis: {
      categories: humidityData
        ?.slice(-10)
        ?.map((item) => format(new Date(item?.timestamp), "MMM dd, HH:mm")),
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
      data: humidityData?.slice(-10).map((item) => item.humValue)
    }
  ];

  if (isLoading) {
    return <Skeleton className="w-full h-96" />;
  }

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
