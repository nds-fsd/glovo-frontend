import { createContext, useState } from 'react';

export const RestoDataContext = createContext();

export const RestoDataContextProvider = ({ children }) => {
  const [allRestoData, setAllRestoData] = useState([]);

  const value = {
    allRestoData,
    setAllRestoData,
  };

  return <RestoDataContext.Provider value={value}>{children}</RestoDataContext.Provider>;
};
