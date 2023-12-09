/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Ap9KXWZm3oi
 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex items-center mb-8">
        <Input className="flex-1 mr-4" placeholder="Enter identifier" />
        <Button>Search</Button>
      </div>
      <div>
        <div className="flex items-center mb-4">
          <img
            alt="Version 1"
            className="block w-24 h-24 mr-4"
            height="100"
            src="/placeholder.svg"
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
          <ArrowDownIcon className="text-gray-500" />
          <div className="ml-4">
            <p className="font-semibold text-lg mb-1">Version 1</p>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <img
            alt="Version 2"
            className="block w-24 h-24 mr-4"
            height="100"
            src="/placeholder.svg"
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
          <ArrowDownIcon className="text-gray-500" />
          <div className="ml-4">
            <p className="font-semibold text-lg mb-1">Version 2</p>
            <p className="text-gray-600">
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <img
            alt="Version 3"
            className="block w-24 h-24 mr-4"
            height="100"
            src="/placeholder.svg"
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          />
          <ArrowDownIcon className="text-gray-500" />
          <div className="ml-4">
            <p className="font-semibold text-lg mb-1">Version 3</p>
            <p className="text-gray-600">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
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
