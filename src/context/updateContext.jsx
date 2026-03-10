/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

// Create context
const UpdateContext = createContext();

// Create provider
export const UpdateProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);

  return (
    <UpdateContext.Provider value={{ update, setUpdate }}>
      {children}
    </UpdateContext.Provider>
  );
};

// Custom hook
export const useUpdate = () => useContext(UpdateContext);
