import "./App.css";
import OCRReader from "./OCRReader.jsx";
import ImageUpload from "./imageupoad.jsx";
import OCRReaderV2 from "./OCRReaderV2.jsx";
import OCRReaderV3 from "./OCRReaderV3.jsx"
export default function App() {
  return (
    <main>
      Swarnim Arya
      <div style={
      {
        width:"100%",
        height:"5px",
        color:"black",
        padding:"2px",
        margin:"2px",
        backgroundColor:"black"
      }
      }/>
        <OCRReader />
      
        <div style={
          {
            width:"100%",
            height:"5px",
            color:"black",
            padding:"2px",
            margin:"2px",
            backgroundColor:"blue"
          }
          }/>
            <OCRReaderV2 />
      <div style={
        {
          width:"100%",
          height:"5px",
          color:"black",
          padding:"2px",
          margin:"2px",
          backgroundColor:"yellow"
        }
        }/>
          <OCRReaderV3 />
    </main>
  );
}

