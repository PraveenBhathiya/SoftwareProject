import React, { createContext, useState } from "react";

// Create the context
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [projectId, setProjectId] = useState("");

  return (
    <UserContext.Provider value={{ email, setEmail, projectId, setProjectId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
