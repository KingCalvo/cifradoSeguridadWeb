"use client";

import { createConPassword, useConPassword, useState } from "react";

const Password = createConPassword();

export const PasswordProvider = ({ children }) => {
  const [Password, setPassword] = useState("");

  const updatePassword = (newPassword) => {
    setPassword(newPassword);
  };

  return (
    <Password.Provider value={{ Password, updatePassword }}>
      {children}
    </Password.Provider>
  );
};

export const usePassword = () => {
  return useConPassword(Password);
};
