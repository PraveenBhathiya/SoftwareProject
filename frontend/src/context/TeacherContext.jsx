import React, { createContext, useState } from "react";

// Create the context
const TeacherContext = createContext();

// Create a provider component
const TeacherProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [projectId, setProjectId] = useState("");

  return (
    <TeacherContext.Provider
      value={{ email, setEmail, projectId, setProjectId }}
    >
      {children}
    </TeacherContext.Provider>
  );
};

export { TeacherContext, TeacherProvider };
