import React from "react";
import AsciiHexTable from "../components/AsciiHexTable";
import EncryptionComponent from "../cifrar/cifrado";
const Page: React.FC = () => {
  return (
    <div className="mt-40">
      <AsciiHexTable />
    </div>
  );

  return (
    <div>
      <h1>Mi Proyecto de Cifrado</h1>
      <EncryptionComponent />
    </div>
  );
  };

export default Page;

  
