import React, { useEffect, useState } from "react";
import axios from "axios";

const StatCard = ({ projectId, email, numberOfMumbers, yearOfTheProject, lectureName }) => {
  const [totalMarks, setTotalMarks] = useState(0); // State for total marks percentage
  const [maxMarks, setMaxMarks] = useState(0);
  const [isMarksEmpty, setIsMarksEmpty] = useState(false);

  // Function to calculate total marks
  const getMarks = async () => {
    try {
      console.log("projectId:", projectId);
console.log("userEmail:", email);

      const response = await axios.post(
        "http://localhost:4000/api/v1/mark/getAllMarks",
        {
          projectId: projectId,
          userEmail: email,
        }
      );
      console.log(response.data); // Add this to check the full response data
      

      if (response.data.success) {
        const totalMarks = response.data.mark.reduce((acc, element) => acc + element.value, 0);
        const maxMarks = response.data.mark.length*10; // Assuming each mark is out of 100
        const percentage = (totalMarks);

        setTotalMarks(percentage.toFixed(0)); // Set percentage with 2 decimal places
        setMaxMarks(maxMarks.toFixed(0));
      }

      if (response.data.mark.length === 0) {
        setIsMarksEmpty(true);
      } else {
        setIsMarksEmpty(false);
      }
    } catch (error) {
      console.log(error);
      setIsMarksEmpty(true);
    }
  };

  // Use effect to load marks when component mounts
  useEffect(() => {
    getMarks();
  }, []);

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid items-center lg:grid-cols-12 gap-6 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:pe-6 xl:pe-12">
            <p className="text-6xl font-bold leading-10 text-blue-600">
              {totalMarks}/{maxMarks}
            </p>
            <p className="mt-1 text-gray-500">Total Marks</p>
          </div>
        </div>

        <div className="lg:col-span-8 relative lg:before:absolute lg:before:top-0 lg:before:-start-12 lg:before:w-px lg:before:h-full lg:before:bg-gray-200 lg:before:">
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-3 sm:gap-8">
            <div>
              <p className="text-3xl font-semibold text-blue-600">{numberOfMumbers}</p>
              <p className="mt-1 text-gray-500">Number of Members</p>
            </div>

            <div>
              <p className="text-3xl font-semibold text-blue-600">{yearOfTheProject}</p>
              <p className="mt-1 text-gray-500">Year of the Project</p>
            </div>

            <div>
              <p className="text-3xl font-semibold text-blue-600">{lectureName}</p>
              <p className="mt-1 text-gray-500">Lecture Incharge</p>
            </div>
          </div>
        </div>
      </div>

      {/* Show message if marks are empty */}
      {isMarksEmpty && <p className="text-red-600">No marks found for this project.</p>}
    </div>
  );
};

export default StatCard;
