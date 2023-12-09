"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Landing() {
  const [data, setData] = useState([]);
  const fetchData = () => {
    // Fetch data here and update the state
    // This is just a placeholder data
    setData([
      {
        id: 1,
        version: "Version 1",
        image: "",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. adipiscing elit. adipiscing elit. adipiscing elit. ",
      },
      {
        id: 2,
        version: "Version 2",
        image: "",
        description:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 3,
        version: "Version 3",
        image: "",
        description:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ]);
  };

  return (
    <section className="w-[100vw] flex justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div
            className={`space-y-2 mt-40 transition-all ${
              data.length > 0 ? "mt-5" : ""
            }`}
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Welcome to Our Company
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Enter your query below to start searching
            </p>
          </div>
          <div
            className={`flex flex-col mt-14 transition-all ${
              data.length > 0 ? "mt-6" : ""
            } md:flex-row w-full max-w-md items-center space-x-2`}
          >
            <Input
              className="focus:(mt-0)"
              placeholder="Search here..."
              type="search"
            />
            <Button onClick={fetchData}>Search</Button>
          </div>
          <div className="flex flex-col items-center my-10">
            {data.map((item, index) => (
              <div key={item.id}>
                <div className="flex items-center mb-4 w-[50vw]">
                  <div className="w-40 h-40 mr-4 ">
                    <img
                      alt={item.version}
                      className="h-full w-full border border-gray-200 rounded"
                      src={item.image}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="ml-4 flex flex-col items-start w-[80%]">
                    <p className="font-semibold text-lg mb-1">{item.version}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                {index < data.length - 1 && (
                  <ArrowDownIcon className="text-gray-500 ml-16 mb-5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function ArrowDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}
