import  { createContext, useContext, useState } from "react";
import Loader from "../widgets/Loader";
import { loaderProviderProp } from "../models/PropType";

// Create the context
const LoaderContext = createContext({
  showLoader: () => {},
  hideLoader: () => {},
});

// Provider component
export const LoaderProvider:React.FC<loaderProviderProp> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {loading && <Loader status="full" />} {/* Attach loader here */}
    </LoaderContext.Provider>
  );
};

// Custom hook to use the loader context
export const useLoader = () => useContext(LoaderContext);
