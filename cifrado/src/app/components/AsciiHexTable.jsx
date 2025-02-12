"use client"; // Importante para usar hooks en Next.js (app router)

import { useState } from "react";
function AsciiHexTable() {
  const [message, setMessage] = useState("esto es una prueba".split(""));
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleChange = (index, value, isHex) => {
    let updatedMessage = [...message];
    if (isHex) {
      updatedMessage[index] = String.fromCharCode(parseInt(value, 16));
    } else {
      updatedMessage[index] = value;
    }
    setMessage(updatedMessage);
  };

  return (
    <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
      {/* Mensaje */}
      <div className="text-center text-lg font-semibold mb-4">
        {message.join("")}
      </div>

      {/* Tablas */}
      <div className="grid grid-cols-2 gap-4 bg-black">
        {/* Tabla ASCII */}
        <div className="border p-2 rounded-md bg-whie shadow">
          <div className="grid grid-cols-12 gap-1 text-center">
            {["#", ...Array.from({ length: 10 }, (_, i) => i)].map(
              (item, index) => (
                <div key={index} className="font-bold bg-gray-200 p-1">
                  {item}
                </div>
              )
            )}
            {message.map((char, index) => (
              <div
                key={index}
                className={`border p-1 text-center ${
                  hoverIndex === index ? "bg-blue-200" : ""
                }`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {char}
              </div>
            ))}
          </div>
        </div>

        {/* Tabla Hex */}
        <div className="border p-2 rounded-md bg-black shadow">
          <div className="grid grid-cols-12 gap-1 text-center">
            {["#", ...Array.from({ length: 10 }, (_, i) => i)].map(
              (item, index) => (
                <div key={index} className="font-bold bg-gray-200 p-1">
                  {item}
                </div>
              )
            )}
            {message.map((char, index) => (
              <div
                key={index}
                className={`border p-1 text-center ${
                  hoverIndex === index ? "bg-blue-200" : ""
                }`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {char.charCodeAt(0).toString(16).toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Posición y edición */}
      {hoverIndex !== null && (
        <div className="mt-4 flex justify-between items-center p-2 bg-black rounded shadow">
          <div>Posición: {hoverIndex}</div>
          <div>
            ASCII:
            <input
              type="text"
              className="border px-2 w-12 mx-2"
              value={message[hoverIndex]}
              onChange={(e) => handleChange(hoverIndex, e.target.value, false)}
            />
          </div>
          <div>
            Hex:
            <input
              type="text"
              className="border px-2 w-12 mx-2"
              value={message[hoverIndex]
                .charCodeAt(0)
                .toString(16)
                .toUpperCase()}
              onChange={(e) => handleChange(hoverIndex, e.target.value, true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AsciiHexTable;
