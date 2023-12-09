import { createContext, useState } from "react";

const ImageContext = createContext(null);

const ImageProvider = ({ children }) => {
  const [uri, setUri] = useState("");
  const [base64, setBase64] = useState("");
  const [uuid, setUuid] = useState("");
  const [bonsaiUrl, setBonsaiUrl] = useState("");

  const value = {
    uri,
    setUri,
    base64,
    setBase64,
    uuid,
    setUuid,
    bonsaiUrl,
    setBonsaiUrl,
  };

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};

export { ImageContext, ImageProvider };
