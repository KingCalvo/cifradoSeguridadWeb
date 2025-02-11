import { createContext, useState, useContext, ReactNode } from "react";

type EncryptionContextType = {
  password: string;
  setPassword: (password: string) => void;
};

const EncryptionContext = createContext<EncryptionContextType | undefined>(undefined);

export const EncryptionProvider = ({ children }: { children: ReactNode }) => {
  const [password, setPassword] = useState<string>("");

  return (
    <EncryptionContext.Provider value={{ password, setPassword }}>
      {children}
    </EncryptionContext.Provider>
  );
};

export const useEncryptionContext = () => {
  const context = useContext(EncryptionContext);
  console.log(context);
  
  if (!context) {
    throw new Error("useEncryptionContext must be used within an EncryptionProvider");
  }
  return context;
};
