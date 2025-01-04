import React, { createContext, useEffect, useState } from "react";

export const FacultyContext = createContext();

export const FacultyProvider = ({ children }) => {
  const [faculty, setFaculty] = useState(() => {
    const savedFaculty = localStorage.getItem("faculty");
    return savedFaculty ? JSON.parse(savedFaculty) : null;
  });

  useEffect(() => {
    if (faculty) {
      localStorage.setItem("faculty", JSON.stringify(faculty));
    } else {
      localStorage.removeItem("faculty");
    }
  }, [faculty]);

  return (
    <FacultyContext.Provider value={{ faculty, setFaculty }}>
      {children}
    </FacultyContext.Provider>
  );
};
