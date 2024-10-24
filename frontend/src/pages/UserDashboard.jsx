import { BellDot, Highlighter, Settings, Upload } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import CreateNewProject from "../components/createNewProject";
import StatCard from "../components/StatCard";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import MarkSection from "../components/MarkSection";

import SettingComponent from "../components/Settings";
import NotificationComponent from "../components/NotificationComponent";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import MarkSectionStudent from "../components/MarkSectionStudent";
import UploadComponent from "../components/UploadComponent";

const UserDashboard = () => {
  const { email, setEmail, setProjectId } = useContext(UserContext);
  const [hasProject, setHasProject] = useState(false);
  const [tabName, setTabName] = useState("Dashboard");
  const [userProject, setUserProject] = useState({});
  const [allNotices, setAllNotices] = useState([]);
  const [isNoticeDeleted, setIsNoticedeleted] = useState(false); // capture the deleting of notifications
  const [marks, setMarks] = useState([]);
  const [isMarksEmpty, setIsMarksEmpty] = useState(false);

  // Get the project details of the user
  const getProject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/project/get",
        {
          email: email,
        }
      );

      if (response.data.success == true) {
        console.log(response.data);

        // set the projet details
        setUserProject(response.data.project);
        setProjectId(response.data.project.projectId);

        setHasProject(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get all users
  const getAllNotices = async () => {
    if (email) {
      try {
        const currentYear = new Date(Date.now()).getFullYear();
        const batch = currentYear - 2002;
        const response = await axios.get(
          `http://localhost:4000/api/v1/notification/getNotifications/${batch}`
        );
        setAllNotices(response.data.notifications);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.error("Email is required to get notifications");
    }
  };

  useEffect(() => {
    getProject();
    getAllNotices();
  }, []);
  return (
    <>
      <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
        <div class="flex items-center py-2">
          <button
            type="button"
            class="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-application-sidebar"
            aria-label="Toggle navigation"
            data-hs-overlay="#hs-application-sidebar"
          >
            <span class="sr-only">Toggle Navigation</span>
            <svg
              class="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M15 3v18" />
              <path d="m8 9 3 3-3 3" />
            </svg>
          </button>

          <ol class="ms-3 flex items-center whitespace-nowrap">
            <li class="flex items-center text-sm text-gray-800">
              Application Layout
              <svg
                class="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </li>
            <li
              class="text-sm font-semibold text-gray-800 truncate"
              aria-current="page"
            >
              Dashboard
            </li>
          </ol>
        </div>
      </div>

      {/* <!-- Sidebar --> */}
      <div
        id="hs-application-sidebar"
        class="hs-overlay  [--auto-close:lg]
  hs-overlay-open:translate-x-0
  -translate-x-full transition-all duration-300 transform
  w-[260px] h-full
  hidden
  fixed inset-y-0 start-0 z-[60]
  bg-white border-e border-gray-200
  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
 "
        role="dialog"
        tabindex="-1"
        aria-label="Sidebar"
      >
        <div class="relative flex flex-col h-full max-h-full">
          <div className="ml-6 mt-5 h-20 w-10">
            <img
              className="bg-contain bg-center"
              src="https://upload.wikimedia.org/wikipedia/en/6/65/LOGO_OF_RUHUNA.jpg"
              alt="logo"
            />
          </div>

          {/* <!-- Content --> */}
          <div class="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <nav
              class="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul class="flex flex-col space-y-1">
                <li>
                  <button
                    onClick={() => {
                      setTabName("Dashboard");
                    }}
                    class="w-full flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    href="#"
                  >
                    <svg
                      class="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Dashboard
                  </button>
                </li>

                <li class="hs-accordion" id="users-accordion">
                  <button
                    onClick={() => {
                      setTabName("Results");
                    }}
                    type="button"
                    class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    aria-expanded="true"
                    aria-controls="users-accordion-child"
                  >
                    <Highlighter size={16} />
                    Results
                  </button>
                </li>

                <li class="hs-accordion" id="account-accordion">
                  <button
                    onClick={() => {
                      setTabName("Uploads");
                    }}
                    type="button"
                    class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    aria-expanded="true"
                    aria-controls="account-accordion-child"
                  >
                    <Upload size={16} />
                    Uploads
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setTabName("Notices");
                    }}
                    class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
                  >
                    <BellDot size={16} />
                    Notices
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setTabName("Settings");
                    }}
                    class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* <!-- End Sidebar --> */}

      <div class="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
        {tabName === "Dashboard" ? (
          hasProject ? (
            <div>
              <h2 className="mb-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
                {userProject.name}
              </h2>
              <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded mb-4">
                Approved
              </span>
              <StatCard
                projectId={userProject.projectId}
                email={email}
                numberOfMumbers={userProject.numberOfMembers}
                yearOfTheProject={userProject.year}
                lectureName={userProject.lectureName}
              />
              <h2 className="mt-2 mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
                Project Statistics
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 mt-4">
                <BarChart projectId={userProject.projectId} email={email} />
              </div>
            </div>
          ) : (
            <CreateNewProject changeIshasProject={setHasProject} />
          )
        ) : (
          <div></div>
        )}
        {tabName === "Results" ? (
          <div>
            <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
              Project Results
            </h2>
            <MarkSectionStudent
              isProjectExists={hasProject}
              projectId={userProject.projectId}
            />
          </div>
        ) : (
          <div></div>
        )}
        {tabName === "Uploads" ? (
          <div>
            <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
              Project Uploads
            </h2>
            <UploadComponent />
          </div>
        ) : (
          <div></div>
        )}
        {tabName === "Notices" ? (
          <div>
            <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
              Notifications
            </h2>
            <NotificationComponent
              isTeacher={false}
              email={email}
              notices={allNotices}
            />
          </div>
        ) : (
          <div></div>
        )}
        {tabName === "Settings" ? (
          <div>
            <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
              Profile Settings
            </h2>
            <SettingComponent />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default UserDashboard;