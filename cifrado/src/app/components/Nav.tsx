import React from "react";
import Link from "next/link";

const Nav: React.FC = () => {
  return (
    <nav className="fixed w-full h-16 mt-4 flex justify-center items-center">
      <ul className="max-w-[700px] h-16 p-8 border-white border-2 bg-slate-600 flex justify-center items-center gap-8 rounded-3xl">
        <li className="hover:text-white hover:text-xl transition-all transform">
          <Link href="/acci">Acci</Link>
        </li>
        <li className="hover:text-white hover:text-xl transition-all transform">
          <Link href="/cifrar">Cifrar</Link>
        </li>
        <li className="hover:text-white hover:text-xl transition-all transform">
          <Link href="/hexadecimal">Desifrar</Link>
        </li>
        <li className="hover:text-white hover:text-xl transition-all transform">
          <Link href="/octal">Hash</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
