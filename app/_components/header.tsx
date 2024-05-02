"use client";

import Link from "next/link";
import React from "react";

function header() {
  return (
    <header className="bg-black min-h-[10vh]">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="block text-teal-600">
          <span className="font-bold text-2xl text-red-600">Canvas</span>
          <span className="font-bold text-2xl text-sky-600">Craft</span>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-white transition hover:text-sky-300"
                  href="#"
                >
                  {" "}
                  About{" "}
                </Link>
              </li>

              <li>
                <Link
                  className="text-white transition hover:text-sky-300"
                  href="#"
                >
                  {" "}
                  Services{" "}
                </Link>
              </li>

              <li>
                <Link
                  className="text-white transition hover:text-sky-300"
                  href="#"
                >
                  {" "}
                  Projects{" "}
                </Link>
              </li>

              <li>
                <Link
                  className="text-white transition hover:text-sky-300"
                  href="#"
                >
                  {" "}
                  Blog{" "}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link
                href="signin"
                className="block rounded-md px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:text-black"
              >
                Login
              </Link>

              <Link
                href="signup"
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200 sm:block"
              >
                Register
              </Link>
            </div>

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default header;
