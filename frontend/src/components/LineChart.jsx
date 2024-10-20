import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = () => {
  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Sales Growth",
      align: "left",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    yaxis: {
      title: {
        text: "Revenue",
      },
    },
  };

  const chartSeries = [
    {
      name: "2023 Sales",
      data: [10, 41, 35, 51, 49, 62, 69],
    },
    {
      name: "2022 Sales",
      data: [30, 29, 50, 60, 70, 91, 125],
    },
  ];

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height={400}
      width={400}
    />
  );
};

export default LineChart;
