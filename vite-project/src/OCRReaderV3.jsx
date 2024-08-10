import React, { useState } from "react";
import ImageUpload from "./imageupoad";
import Tesseract from "tesseract.js";
import * as tf from "@tensorflow/tfjs";

const OCRReaderV3 = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("------------");
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageChange = (imageData) => {
    setImage(imageData);
    processImage(imageData);
  };

  const processImage = async (imageData) => {
    const myImg = new Image();
    myImg.src = imageData;

    myImg.onload = async () => {
      const originalWidth = myImg.width;
      const originalHeight = myImg.height;
      // Convert the image to Tensorflow.js tensor
      const tensor = tf.browser.fromPixels(myImg);
      // Pre-processing
      const processedTensor = tf.tidy(() => {
        let gray = tf.mean(tensor, 2).expandDims(-1);
        // contrast
        const contrastFactor = 10;
        const mean = gray.mean();
        let adjustedContrast = gray.sub(mean).mul(contrastFactor).add(mean);
        adjustedContrast = adjustedContrast.clipByValue(0, 1);

        return adjustedContrast;
      });

      const processedImageData = await tf.browser.toPixels(processedTensor);

      const canvas = document.createElement("canvas");
      canvas.width = originalWidth;
      canvas.height = originalHeight;
      const ctx = canvas.getContext("2d");
      const imgData = ctx.createImageData(originalWidth, originalHeight);
      imgData.data.set(processedImageData);
      ctx.putImageData(imgData, 0, 0);
      const processedImageDataUrl = canvas.toDataURL();
      console.log("processedImageDataUrl:", processedImageDataUrl)

      setProcessedImage(processedImageDataUrl);

      // Pass to Tesseract
      Tesseract.recognize(processedImageDataUrl, "eng", {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        setText(text);
      });

      // free up memory
      processedTensor.dispose();
    };
  };

  return (
    <div style={{ textAlign: "center", margin: "auto" }}>
      <p>OCRReader V3</p>
      <ImageUpload onImageChange={handleImageChange} />
      {image && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <div>
            <p>Original Image</p>
            <img
              src={image}
              style={{
                maxWidth: "100%",
                maxHeight: "auto",
              }}
            />
          </div>
          {processedImage && (
            <div>
              <p>Processed Image</p>
              <img
                src={processedImage}
                alt="GrayScale"
                style={{
                  maxWidth: "100%",
                  maxHeight: "auto",
                }}
              />
            </div>
          )}
        </div>
      )}
      <div style={{ marginTop: "20px" }}>
        <h3>Extracted Text:</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default OCRReaderV3;