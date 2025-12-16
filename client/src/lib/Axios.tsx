import { createContext, useContext } from "react";
import type { ReactNode } from "react"; // ✅ type-only import

// 1️⃣ Context type define karo
interface ApiContextType {
  serverurl: string;
}

// 2️⃣ Default value
const defaultValue: ApiContextType = {
  serverurl: "http://localhost:3000",
};

// 3️⃣ Create context
const ApiContext = createContext<ApiContextType>(defaultValue);

// 4️⃣ Provider component (simpler)
function ApiProvider({ children }: { children: ReactNode }) {
  const value: ApiContextType = { serverurl: "http://localhost:3000" };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

// 5️⃣ Custom hook (optional, easy access)
function useApi() {
  return useContext(ApiContext);
}

export { ApiProvider, useApi, ApiContext };
