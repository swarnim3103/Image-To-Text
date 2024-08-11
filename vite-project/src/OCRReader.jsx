import React, { useState } from "react";
import Tesseract from "tesseract.js";

import ImageUpload from "./imageupoad";

const OCRReader = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("------------------------");

  const handleImageChange = (imageData) => {
    setImage(imageData);
    processImage(imageData);
  };

  const processImage = (imageData) => {
    Tesseract.recognize(imageData, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      setText(text);
    });
  };

  return (
    <div>
      <p>OCRReaderV1</p>
      <ImageUpload onImageChange={handleImageChange} />
      {image && (
        <div>
          <img
            src={image}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>
      )}
      <div>
        <h3>Extracted Text:</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default OCRReader;