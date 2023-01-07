import "./App.css";
import DataDisplay from "./components/DataDisplay";
import DataInput from "./components/DataInput";

function App() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <h1 className="text-center md:text-2xl font-bold py-4">
        Enter your name and the sector you are related
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between">
        <DataInput></DataInput>
        <DataDisplay></DataDisplay>
      </div>
    </div>
  );
}

export default App;
