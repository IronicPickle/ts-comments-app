import { createContext } from "react";

export const defaultGlobalContext = {
  user: "Unknown",
  setUser: (user: string) => {},
};

export default createContext(defaultGlobalContext);
