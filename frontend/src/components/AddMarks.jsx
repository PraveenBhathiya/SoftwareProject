import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TeacherContext } from "../context/TeacherContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMarks = () => {
  const [emailForLogin, setEmailForLogin] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [logInError, setLogInError] = useState("");
  const [slecteAssignemtId, setSlecteAssignemtId] = useState("");
  const [validateError, setValidateError] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [criteriaList, setCriteriaList] = useState([
    { criteria: "", marks: "" },
  ]);
  const { projectId } = useContext(TeacherContext);
  const navigate = useNavigate();

  const handleSelectEmail = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleAssignmentId = (event) => {
    setSlecteAssignemtId(event.target.value);
  };

  const getEmailByProjectName = async () => {
    if (projectId) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/project/getUserEmialsByProjectId",
          {
            projectId: projectId,
          }
        );
        if (response.data.success) {
          setStudentList(response.data.studentEmails);
        } else {
          alert("No emails found");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getEmailByProjectName();
  }, []);

  // Handle criteria input changes
  const handleCriteriaChange = (index, field, value) => {
    const updatedCriteriaList = [...criteriaList];
    updatedCriteriaList[index][field] = value;
    setCriteriaList(updatedCriteriaList);
  };

  // Add a new empty criteria field
  const addCriteriaField = () => {
    setCriteriaList([...criteriaList, { criteria: "", marks: "" }]);
  };

  // Delete a specific criteria field
  const deleteCriteriaField = (index) => {
    const updatedCriteriaList = criteriaList.filter((_, i) => i !== index);
    setCriteriaList(updatedCriteriaList);
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    if (!selectedStudent) {
      setLogInError("Please select a student.");
      setValidateError(true);
      return;
    }

    let final = 0;
    criteriaList.forEach((element) => {
      final += Number(element.marks);
    });
    const marksData = {
      value: Math.ceil((final / criteriaList.length) * 100) / 100,
      assignmentId: slecteAssignemtId,
      userEmail: selectedStudent,
      projectId: projectId,
      criteria: criteriaList,
    };

    try {
      setIsFormSubmitted(true);
      const response = await axios.post(
        "http://localhost:4000/api/v1/mark/create",
        marksData
      );
      setIsFormSubmitted(false);
      if (response.data.success) {
        toast("Marks added successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(`/teacherDashboard/${projectId}`);
      } else {
        alert("Failed to add marks.");
      }
    } catch (error) {
      console.log(error);
      setLogInError("Error while adding marks.");
      setIsFormSubmitted(false);
    }
  };

  return (
    <div>
      <div className="lg:mx-auto lg:pt-8">
        <div className="p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">
              Add Project Marks
            </h1>
          </div>

          <div className="mt-4 max-w-lg">
            <div className="relative col-span-full mt-12">
              <h1 className="block text-sm font-bold text-gray-800">
                Student Email
              </h1>
            </div>
            <div className="mb-4">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-12"
                value={selectedStudent}
                onChange={handleSelectEmail}
              >
                <option value="">Choose Student</option>
                {studentList.map((student, index) => (
                  <option key={index} value={student}>
                    {student}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="relative col-span-full mt-4">
                <h1 className="block text-sm font-bold text-gray-800">
                  Assignment Name
                </h1>
              </div>
              <div className="mb-4">
                <div class="w-full mx-auto">
                  <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-12"
                    value={slecteAssignemtId}
                    onChange={handleAssignmentId}
                  >
                    <option selected>Choose Assignment</option>
                    <option value="EE01">Project Proposal</option>
                    <option value="EE02">Mid Evaluvation</option>
                    <option value="EE03">Final Evaluvationi</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h1 className="block text-sm font-bold text-gray-800">
                Criteria
              </h1>
              {criteriaList.map((criteria, index) => (
                <div key={index} className="mb-4 flex space-x-4">
                  <input
                    type="text"
                    placeholder="Criteria Name"
                    className="p-2 border rounded w-full"
                    value={criteria.criteria}
                    onChange={(e) =>
                      handleCriteriaChange(index, "criteria", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Marks"
                    className="p-2 border rounded w-1/3"
                    value={criteria.marks}
                    onChange={(e) =>
                      handleCriteriaChange(index, "marks", e.target.value)
                    }
                  />
                  <button
                    onClick={() => deleteCriteriaField(index)}
                    className="py-2 px-4 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={addCriteriaField}
                className="py-2 px-4 bg-blue-500 text-white rounded"
              >
                Add Another Criteria
              </button>
            </div>

            {validateError && (
              <div className="mt-4 text-red-600">
                <p>{logInError}</p>
              </div>
            )}

            <div className="mt-5">
              {isFormSubmitted ? (
                <button
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-300 text-white"
                  disabled
                >
                  Saving...
                </button>
              ) : (
                <button
                  onClick={handleFormSubmit}
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMarks;
