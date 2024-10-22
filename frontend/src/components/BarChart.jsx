import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const BarChart = ({ projectId }) => {
  const [marks, setMarks] = useState([0, 0, 0]); // Initialize marks with zeros
  const [isMarksEmpty, setIsMarksEmpty] = useState(false);

  const getMarks = async () => {
    try {
      console.log("Project ID:", projectId);  // Add this to verify
      const response = await axios.post(
        "http://localhost:4000/api/v1/mark/getAllMarks",
        {
          projectId: projectId,
        }
      );
  
      console.log("API Response:", response.data);
  
      if (response.data.success) {
        const fetchedMarks = response.data.mark; // Check if this is structured as expected
        console.log("Fetched Marks:", fetchedMarks);
  
        // Ensure the data contains proposal, mid, and final marks
        setMarks([
          fetchedMarks.proposal || 0, // Assuming these fields exist in the response
          fetchedMarks.mid || 0,
          fetchedMarks.final || 0,
        ]);
      } else {
        setMarks([0, 0, 0]); // In case of failure, reset marks
      }
  
      if (response.data.mark.length === 0) {
        setIsMarksEmpty(true);
      }
    } catch (error) {
      console.log("Error fetching marks fuck fuck:", error);
    }
  };
  

  useEffect(() => {
    getMarks();
  }, [projectId]);

  const chartOptions = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["Proposal", "Mid", "Final"],
    },
  };

  const chartSeries = [
    {
      name: "Marks",
      data: marks, // Use fetched marks
      color: "#1A56DB",
    },
  ];

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-xl font-bold text-gray-900 mb-4">
            Current Results
          </h5>
        </div>
      </div>
      <div id="area-chart">
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default BarChart;
