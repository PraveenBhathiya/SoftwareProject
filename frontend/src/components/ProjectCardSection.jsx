import React, { useContext, useEffect, useState } from "react";
import { TeacherContext } from "../context/TeacherContext";
import { useNavigate } from "react-router-dom";
import noProjects from "../../public/noProjects.svg";

const ProjectCardSection = ({ inputValueFromSearch, projects }) => {
  const [wantedProjects, setWantedProject] = useState([]);
  const { setProjectId } = useContext(TeacherContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (inputValueFromSearch === "") {
      // If the search input is empty, display all projects
      setWantedProject(projects);
    } else {
      // Filter projects based on the search input (case-insensitive)
      const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(inputValueFromSearch.toLowerCase())
      );
      setWantedProject(filteredProjects);
    }
  }, [inputValueFromSearch, projects]);

  const handleProjectClick = (id) => {
    setProjectId(id);
    navigate(`/teacherDashboard/${id}`);
  };
  return (
    <>
      {projects.length == 0 ? (
        <div>
          <div className="inline-flex flex-col justify-center items-center h-full mt-20 w-full">
            <img src={noProjects} alt="No projects" height={350} width={350} />
            <p class="text-md text-gray-600 mt-10">No Projects found</p>
          </div>
        </div>
      ) : (
        <div>
          <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            {/* <!-- Grid --> */}
            <div class="grid lg:grid-cols-2 lg:gap-y-12 gap-8">
              {/* <!-- Card --> */}
              {wantedProjects.map((project, index) => (
                <a
                  onClick={() => {
                    handleProjectClick(project.projectId);
                  }}
                  key={index}
                  class="group block rounded-xl overflow-hidden focus:outline-none border-2 border-gray-200"
                  href="#"
                >
                  <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                    <div class="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
                      <img
                        class="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
                        src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80"
                        alt="Blog Image"
                      />
                    </div>

                    <div class="grow">
                      <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600">
                        {project.name}
                      </h3>
                      <p class="mt-3 text-gray-600">{project.department}</p>
                      <p class="mt-4 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium">
                        Read more
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
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCardSection;
