import merge from "lodash/merge";
import { format } from "date-fns";
import ReactApexChart from "react-apexcharts";
import { useGetEnvironmentReadingsQuery } from "@/api/readings";
import BaseOptionChart from "@/styles/global-styles";
import { Card, CardHeader, Skeleton } from "@/components/UI";

const AmmoniaGasChart = () => {
  const { data, isLoading } = useGetEnvironmentReadingsQuery();

  const ammoniaGasData = data?.payload?.data
    ? data?.payload?.data.map((data) => data)
    : [];

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: "top", horizontalAlign: "right" },
    chart: {
      type: "area",
      height: 350
    },
    xaxis: {
      categories: ammoniaGasData
        ?.slice(-10)
        ?.map((item) => format(new Date(item?.timestamp), "HH:mm")),
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
      name: "Ammonia Gas Level",
      data: ammoniaGasData?.slice(-10).map((item) => item.gasValue)
    }
  ];

  if (isLoading) {
    return <Skeleton className="w-full h-96" />;
  }

  return (
    <Card>
      <CardHeader>Ammonia Gas Readings</CardHeader>

      <div className="mt-12 mx-6">
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
