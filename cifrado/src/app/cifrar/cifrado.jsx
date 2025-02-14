import {  useclient, } from "react";

const bits = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const password = "clave123";

// 1. XOR Encryption
const xorEncrypt = (bits, password) =>
  bits.map((b, i) => b ^ (password.charCodeAt(i % password.length) % 2));
const xorDecrypt = xorEncrypt;

// 2. Suma Mod 2
const sumMod2Encrypt = (bits, password) =>
  bits.map((b, i) => (b + (password.charCodeAt(i % password.length) % 2)) % 2);
const sumMod2Decrypt = sumMod2Encrypt;

// 3. Rotación de bits
const rotate = (bits, right = true) =>
  right ? [bits[bits.length - 1], ...bits.slice(0, -1)] : [...bits.slice(1), bits[0]];

const rotateEncrypt = (bits, password) => {
  let arr = [...bits];
  for (let c of password) arr = rotate(arr, c.charCodeAt(0) % 2 === 1);
  return arr;
};
const rotateDecrypt = (bits, password) => {
  let arr = [...bits];
  for (let c of [...password].reverse()) arr = rotate(arr, c.charCodeAt(0) % 2 === 0);
  return arr;
};

// 4. Inversión de bloque
const blockReverseEncrypt = (bits, password) =>
  password.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 2 === 1
    ? bits.reverse()
    : bits;
const blockReverseDecrypt = blockReverseEncrypt;

// 5. Permutación
const permuteEncrypt = (bits, password) => {
  let indices = [...bits.keys()];
  indices.sort(
    (a, b) =>
      (password.charCodeAt(a % password.length) % bits.length) -
      (password.charCodeAt(b % password.length) % bits.length)
  );
  return indices.map((i) => bits[i]);
};
const permuteDecrypt = (bits, password) => {
  let indices = [...bits.keys()];
  indices.sort(
    (a, b) =>
      (password.charCodeAt(a % password.length) % bits.length) -
      (password.charCodeAt(b % password.length) % bits.length)
  );
  let original = new Array(bits.length);
  indices.forEach((idx, i) => (original[idx] = bits[i]));
  return original;
};

// 6. Desplazamiento (Shift Left)
const shiftLeftEncrypt = (bits) => [...bits.slice(1), bits[0]];
const shiftLeftDecrypt = (bits) => [bits[bits.length - 1], ...bits.slice(0, -1)];

// 7. Desplazamiento (Shift Right)
const shiftRightEncrypt = (bits) => [bits[bits.length - 1], ...bits.slice(0, -1)];
const shiftRightDecrypt = (bits) => [...bits.slice(1), bits[0]];

// 8. Inversión por pares
const pairReverseEncrypt = (bits) => {
  let arr = [...bits];
  for (let i = 0; i < arr.length - 1; i += 2) [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
  return arr;
};
const pairReverseDecrypt = pairReverseEncrypt;

// 9. Suma alterna
const altSumEncrypt = (bits) =>
  bits.map((b, i) => (i % 2 === 0 ? (b + 1) % 2 : b));
const altSumDecrypt = altSumEncrypt;

// 10. AND con clave
const andEncrypt = (bits, password) =>
  bits.map((b, i) => b & (password.charCodeAt(i % password.length) % 2));
const andDecrypt = (bits, password) =>
  bits.map((b, i) => (b | (password.charCodeAt(i % password.length) % 2)) % 2);

// 11. OR con clave
const orEncrypt = (bits, password) =>
  bits.map((b, i) => b | (password.charCodeAt(i % password.length) % 2));
const orDecrypt = (bits, password) =>
  bits.map((b, i) => (b & (password.charCodeAt(i % password.length) % 2)));

// Métodos de cifrado/descifrado
const methods = [
  { name: "XOR", encrypt: xorEncrypt, decrypt: xorDecrypt },
  { name: "Suma Mod 2", encrypt: sumMod2Encrypt, decrypt: sumMod2Decrypt },
  { name: "Rotación", encrypt: rotateEncrypt, decrypt: rotateDecrypt },
  { name: "Inversión", encrypt: blockReverseEncrypt, decrypt: blockReverseDecrypt },
  { name: "Permutación", encrypt: permuteEncrypt, decrypt: permuteDecrypt },
  { name: "Shift Left", encrypt: shiftLeftEncrypt, decrypt: shiftLeftDecrypt },
  { name: "Shift Right", encrypt: shiftRightEncrypt, decrypt: shiftRightDecrypt },
  { name: "Inversión por Pares", encrypt: pairReverseEncrypt, decrypt: pairReverseEncrypt },
  { name: "Suma Alterna", encrypt: altSumEncrypt, decrypt: altSumEncrypt },
  { name: "AND con Clave", encrypt: andEncrypt, decrypt: andDecrypt },
  { name: "OR con Clave", encrypt: orEncrypt, decrypt: orDecrypt },
];

const EncryptionComponent = () => {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let encryptedBits = [...bits];
    let resultText = `Original: ${encryptedBits.join(" ")}\n`;

    // Cifrado
    methods.forEach((method) => {
      encryptedBits = method.encrypt(encryptedBits, password);
      resultText += `${method.name} Cifrado: ${encryptedBits.join(" ")}\n`;
    });

    // Descifrado
    methods.reverse().forEach((method) => {
      encryptedBits = method.decrypt(encryptedBits, password);
      resultText += `${method.name} Descifrado: ${encryptedBits.join(" ")}\n`;
    });

    resultText += `Final Resultado: ${encryptedBits.join(" ")}`;
    setOutput(resultText);
  }, []);

  return (
    <div>
      <h2>Proceso de Cifrado y Descifrado</h2>
      <textarea value={output} readOnly style={{ width: "100%", height: "200px" }} />
    </div>
  );
};

export default EncryptionComponent;
