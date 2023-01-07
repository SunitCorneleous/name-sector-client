import { useQuery } from "@tanstack/react-query";
import "./App.css";
import DataDisplay from "./components/DataDisplay";
import DataInput from "./components/DataInput";

function App() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["persons"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/persons");

      const data = await res.json();

      return data;
    },
  });

  return (
    <div className="max-w-[1280px] mx-auto">
      <h1 className="text-center md:text-3xl font-bold py-4">
        Enter your name and the sector you are related
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between">
        <DataInput refetch={refetch}></DataInput>
        <DataDisplay data={data} isLoading={isLoading}></DataDisplay>
      </div>
    </div>
  );
}

export default App;
