import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from "../context/UserContext";

const CreateNewProject = ({ changeIshasProject }) => {
  // get the current user email
  const { email, setEmail } = useContext(UserContext);
  const [projectName, setProjectName] = useState("");
  const [memberCount, setMemberCount] = useState(null);
  const [acadamicYear, setAcadamicYear] = useState("");
  const [department, setDepartment] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [description, setDescription] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [studentList, setStudentList] = useState([email]);
  const [validateError, setValidateError] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [filteredStudentsEmailList, setFilteredStudentsEmailList] = useState(
    []
  );

  const getAllStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/getAllStudents"
      );

      if (response.data.success == true) {
        console.log(response.data);
        setStudents(response.data.students);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTeachers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/getAllLectures"
      );

      if (response.data.success == true) {
        console.log(response.data);
        setTeachers(response.data.lectures);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Set the clicked user name in the search input
  const handleUserClick = (email) => {
    setStudentList((pre) => [...pre, email]); // Set input to the selected user's name
    setFilteredStudentsEmailList([]); // Clear the filtered list after selecting a user
    setStudentEmail("");
  };

  const handleProjectName = (event) => {
    setProjectName(event.target.value);
    console.log(event.target.value);
  };

  const handleMemberCount = (event) => {
    setMemberCount(event.target.value);
    console.log(event.target.value);
  };

  const handleAcadamicYear = (event) => {
    setAcadamicYear(event.target.value);
    console.log(event.target.value);
  };

  const handleDepartment = (event) => {
    setDepartment(event.target.value);
    console.log(event.target.value);
  };

  const handleLectureName = (event) => {
    setLectureName(event.target.value);
    console.log(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
    console.log(event.target.value);
  };

  // Need to chek this function where the emial is exists
  // Adjust the filtering logic
  const handleStudentEmailChange = (event) => {
    setStudentEmail(event.target.value);
    if (event.target.value !== "") {
      const filteredStudents = students.filter((student) =>
        student.email.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredStudentsEmailList(filteredStudents);
    }
  };

  const handleSubmitClick = async () => {
    setIsFormSubmitted(true);
    if (
      !projectName ||
      !memberCount ||
      !acadamicYear ||
      !department ||
      !lectureName ||
      !description
    ) {
      console.log("Enter all details");
      setValidateError(true);
      setIsFormSubmitted(false);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/project/create",
        {
          name: projectName,
          numberOfMembers: memberCount,
          emailsOfMembers: studentList,
          year: acadamicYear,
          department: department,
          lectureName: lectureName,
        }
      );

      if (response.data.success == true) {
        setProjectCreated(true);
        setTimeout(() => {
          changeIshasProject(true);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setValidateError(true);
      setIsFormSubmitted(false);
    }
  };

  useEffect(() => {
    getAllStudents(); // Get all student for search
    getAllTeachers(); // Get all teachers for search
  }, []);

  // Adding the curretn user email to email list

  return (
    <>
      <div class="max-w-[85rem] px-4 pb-10 sm:px-6 lg:px-8 mx-auto">
        <div class="max-w-xl mx-auto">
          <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-800 sm:text-4xl">
              Ready to create a Project
            </h1>
            <p class="mt-1 text-gray-600">Start your next Innovation</p>
          </div>

          <div class="mt-12">
            <div>
              <div class="grid gap-4 lg:gap-6">
                <div class="grid grid-cols-1 sm:grid-cols-1 gap-4 lg:gap-6">
                  <div>
                    <label
                      for="hs-company-hire-us-2"
                      class="block mb-2 text-sm text-gray-700 font-medium"
                    >
                      Project Name
                    </label>
                    <input
                      value={projectName}
                      onChange={handleProjectName}
                      type="text"
                      name="hs-company-hire-us-2"
                      id="hs-company-hire-us-2"
                      class="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label
                      for="hs-firstname-hire-us-2"
                      class="block mb-2 text-sm text-gray-700 font-medium"
                    >
                      Number Of Members
                    </label>
                    <input
                      value={memberCount}
                      onChange={handleMemberCount}
                      type="text"
                      name="hs-firstname-hire-us-2"
                      id="hs-firstname-hire-us-2"
                      class="py-3 px-4 block w-full mb-4 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                  </div>

                  <div>
                    <label
                      for="hs-lastname-hire-us-2"
                      class="block mb-2 text-sm text-gray-700 font-medium"
                    >
                      Acadamic year
                    </label>
                    <input
                      value={acadamicYear}
                      onChange={handleAcadamicYear}
                      type="text"
                      name="hs-lastname-hire-us-2"
                      id="hs-lastname-hire-us-2"
                      class="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    for="hs-lastname-hire-us-2"
                    class="block mb-2 text-sm text-gray-700 font-medium"
                  >
                    Department
                  </label>
                  <form class="w-full mx-auto">
                    <select
                      id="countries"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-12"
                      value={department}
                      onChange={handleDepartment}
                    >
                      <option selected></option>
                      <option value="Department of Electrical and Information">
                        Department of Electrical and Information Engineering
                      </option>
                      <option value="Department Civil and Environment Engineering">
                        Department Civil and Environment Engineering
                      </option>
                      <option value="Department of Mechenical and Manufacturing Engineering">
                        Department of Mechenical and Manufacturing Engineering
                      </option>
                    </select>
                  </form>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-1 gap-4 lg:gap-6">
                  <div>
                    <label
                      for="hs-company-hire-us-2"
                      class="block mb-2 text-sm text-gray-700 font-medium"
                    >
                      Leture Name
                    </label>
                    <form class="w-full mx-auto">
                      <select
                        id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-12"
                        value={lectureName}
                        onChange={handleLectureName}
                      >
                        <option selected></option>

                        {teachers.map((teacher, index) => (
                          <option key={index} value={teacher.name}>
                            {teacher.name}
                          </option>
                        ))}
                      </select>
                    </form>
                  </div>
                </div>

                <div>
                  <label
                    for="hs-about-hire-us-2"
                    class="block mb-2 text-sm text-gray-700 font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={handleDescription}
                    id="hs-about-hire-us-2"
                    name="hs-about-hire-us-2"
                    rows="4"
                    class="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  ></textarea>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-1 gap-4 lg:gap-6">
                <div className="mt-4">
                  <label
                    for="hs-company-hire-us-2"
                    class="block mb-2 text-sm text-gray-700 font-medium"
                  >
                    Add your Teammates
                  </label>
                  <div className="flex gap-5 items-center">
                    <input
                      value={studentEmail}
                      onChange={handleStudentEmailChange}
                      type="text"
                      name="hs-company-hire-us-2"
                      id="hs-company-hire-us-2"
                      class="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                  </div>
                  <div className="mt-2">
                    <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredStudentsEmailList.length > 0 && (
                        <ul
                          style={{
                            border: "1px solid #ccc",
                            padding: "0",
                            listStyleType: "none",
                          }}
                        >
                          {filteredStudentsEmailList.map((student, index) => (
                            <li
                              key={index}
                              onClick={() => handleUserClick(student.email)}
                              style={{
                                padding: "10px",
                                cursor: "pointer",
                                backgroundColor: "#f9f9f9",
                                borderBottom: "1px solid #eee",
                              }}
                            >
                              {student.email} {/* Display student email */}
                            </li>
                          ))}
                        </ul>
                      )}
                      {studentList.map((item, index) => (
                        <li key={index} class="pb-3 sm:pb-4">
                          <div class="flex items-center space-x-4 rtl:space-x-reverse">
                            <div class="flex-shrink-0">
                              <img
                                class="w-8 h-8 rounded-full"
                                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="Neil image"
                              />
                            </div>
                            <div class="flex-1 min-w-0">
                              <p class="text-sm font-medium text-gray-900 truncate">
                                {item}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {validateError && (
                <div className="mt-4">
                  <div
                    class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                    role="alert"
                  >
                    <svg
                      class="flex-shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Info</span>
                    <div>
                      <span class="font-medium">Error!</span> Error in adding
                      the project
                    </div>
                  </div>
                </div>
              )}

              {projectCreated && (
                <div className="mt-4">
                  <div
                    class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 "
                    role="alert"
                  >
                    <svg
                      class="flex-shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Info</span>
                    <div>
                      <span class="font-medium">Success!</span> Project Created
                      Successfully
                    </div>
                  </div>
                </div>
              )}

              {isFormSubmitted == false ? (
                <div class="mt-6 grid">
                  <button
                    onClick={() => {
                      handleSubmitClick();
                    }}
                    type="submit"
                    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Create new Project
                  </button>
                </div>
              ) : (
                <div class="mt-6 grid">
                  <button
                    type="submit"
                    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-300 text-white hover:bg-blue-300 focus:outline-none focus:bg-blue-300 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <ClipLoader color="#3498db" loading={true} size={20} />
                    Creating ...
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewProject;
