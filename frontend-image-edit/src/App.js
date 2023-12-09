import logo from "./logo.svg";
import "./App.css";
import { Button, Flex, Input } from "antd";
import { useState } from "react";

const { TextArea } = Input;

function App() {
  const [previousImageBase64, setPreviousImageBase64] = useState("");
  const [updatedImageBase64, setUpdatedImageBase64] = useState("");

  return (
    <div className="App">
      <h1> Image Editor</h1>

      {previousImageBase64 && (
        <div>
          <h3> Previous Image </h3>
          <img
            src={`data:image/gif;base64,` + previousImageBase64}
            alt="previous"
            height={200}
            width={200}
          />
        </div>
      )}

      {updatedImageBase64 && (
        <div>
          <h3> Updated Image </h3>
          <img
            src={`data:image/gif;base64,` + updatedImageBase64}
            alt="updated"
            height={200}
            width={200}
          />
        </div>
      )}
      <Input
        className="txt-area"
        rows={4}
        placeholder="Enter image uuid"
        onChange={(e) => {
          console.log("Value", e.target.value);
          setPreviousImageBase64(e.target.value);
        }}
      />
      <Button className="btn">Color Invert</Button>
    </div>
  );
}

export default App;
