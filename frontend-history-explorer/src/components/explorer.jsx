"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Component() {
  const [data, setData] = useState([]);
  const fetchData = () => {
    // Fetch data here and update the state
    // This is just a placeholder data
    setData([
      {
        id: 1,
        version: "Version 1",
        image: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex items-center mb-12">
        <Input className="flex-1 mr-4" placeholder="Enter identifier" />
        <Button onClick={fetchData}>Search</Button>
      </div>

      <div>
        {data.map((item, index) => (
          <div key={item.id}>
            <div className="flex items-center mb-4">
              <img
                alt={item.version}
                className="block w-24 h-24 mr-4 border border-gray-200 rounded"
                height="100"
                src={item.image}
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="100"
              />
              <div className="ml-4">
                <p className="font-semibold text-lg mb-1">{item.version}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
            {index < data.length - 1 && (
              <ArrowDownIcon className="text-gray-500 ml-9 mb-5" />
            )}
          </div>
        ))}
      </div>
    </div>
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
