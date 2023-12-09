import "./App.css";
import { Button, Input } from "antd";
import { useState } from "react";

import Lottie from "lottie-react";
import editorAnimation from "./data/editorAnimation.json";

function App() {
  const [previousImageBase64, setPreviousImageBase64] = useState("");
  const [updatedImageBase64, setUpdatedImageBase64] = useState("");

  return (
    <div className="App">
      <h1
        style={{
          fontSize: "3.25rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Image Editor
      </h1>

      <Lottie
        animationData={editorAnimation}
        loop={true}
        style={{ width: 250, borderRadius: 100, margin: "20px 0" }}
      />

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

      <div>
        <Input
          className="txt-area"
          rows={4}
          placeholder="Enter image uuid"
          onChange={(e) => {
            console.log("Value", e.target.value);
            setPreviousImageBase64(e.target.value);
          }}
          style={{ fontSize: "1rem" }}
        />
        <Button
          size="large"
          style={{
            background: "#2066ff",
            color: "#fff",
            margin: "1.25rem 0 0 0",
          }}
        >
          Invert Color
        </Button>
      </div>
    </div>
  );
}

export default App;
