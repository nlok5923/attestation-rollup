import logo from "./logo.svg";
import "./App.css";
import { Button, Flex, Input } from "antd";
import { useState } from "react";

const { TextArea } = Input;

function App() {

  const [base64, setbase64] = useState("");

  return (
    <div className="App">
      <h1> Image Editor</h1>
     {base64 && <img src={base64} alt="uploaded image" height={200} width={200} />}
      <TextArea rows={4} placeholder="Enter image base 64 encoding" maxLength={6} />
      <Button className="upload-btn" type="primary">Upload</Button>
      <Button>Color Invert</Button>
    </div>
  );
}

export default App;
