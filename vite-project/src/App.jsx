import "./App.css";
import OCRReader from "./OCRReader.jsx";
import ImageUpload from "./imageupoad.jsx";
import OCRReaderV2 from "./OCRReaderV2.jsx";
import OCRReaderV3 from "./OCRReaderV3.jsx"
export default function App() {
  return (
    <main>
      <h1> Convert Your Image Into Text</h1>
     <hr></hr>
      <div style={
      {
        width:"100%",
        height:"5px",
        color:"black",
        padding:"2px",
        margin:"2px",
      }
      }/>
        <OCRReader />
        <hr></hr>
      
        <div style={
          {
            width:"100%",
            height:"5px",
            color:"black",
            padding:"2px",
            margin:"2px",
          }
          }/>
            <OCRReaderV2 />

            <hr></hr>
      <div style={
        {
          width:"100%",
          height:"5px",
          color:"black",
          padding:"2px",
          margin:"2px",
        }
        }/>
          <OCRReaderV3 />
    </main>
  );
}

