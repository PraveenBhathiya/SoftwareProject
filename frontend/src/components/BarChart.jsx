import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const BarChart = ({ projectId, email }) => {
  const [marks, setMarks] = useState([]);
  const [markArray, setMarksArray] = useState([]);
  const [isMarksEmpty, setIsMarksEmpty] = useState(false);

  const getMarks = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/mark/getAllMarks",
        {
          projectId: projectId,
          userEmail: email,
        }
      );

      console.log(response);

      if (response.data.success) {
        setMarks((prevMarks) => [...prevMarks, ...response.data.mark]);
      }

      if (response.data.mark.length === 0) {
        setIsMarksEmpty(true);
      } else {
        setIsMarksEmpty(false);
        response.data.mark.forEach((element) => {
          setMarksArray((prevMark) => [...prevMark, element.value]);
        });
      }
    } catch (error) {
      console.log(error);
      setIsMarksEmpty(true);
    }
  };

  const chartOptions = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["EE01", "EE02", "EE03"], // 3 Evaluvations
    },
  };

  let chartSeries = [
    {
      name: "Series 1",
      data: markArray.length > 0 ? markArray : [0], // Ensure it doesn't break if empty
      color: "#1A56DB",
    },
  ];

  useEffect(() => {
    getMarks();
  }, [projectId, email]);

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-xl font-bold text-gray-900 mb-4">
            Marks Distribution
          </h5>

          <p className="text-base font-normal text-gray-500">Out of 10</p>
        </div>
      </div>

      {/* Conditional rendering if data is empty */}
      {isMarksEmpty ? (
        <p className="text-center text-gray-500">No data available</p>
      ) : (
        <div id="area-chart">
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>
      )}

      <div className="grid grid-cols-1 items-center border-gray-200 border-t justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="lastDaysdropdown"
            data-dropdown-placement="bottom"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 text-center inline-flex items-center"
            type="button"
          >
            Last 7 days
          </button>

          <div
            id="lastDaysdropdown"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Yesterday
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Today
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Last 7 days
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Last 30 days
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Last 90 days
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;