import { useQuery } from "@tanstack/react-query";
import "./App.css";
import DataDisplay from "./components/DataDisplay";
import DataInput from "./components/DataInput";
import EditDataModal from "./components/EditDataModal";
import { useEffect, useState } from "react";

function App() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["persons"],
    queryFn: async () => {
      const res = await fetch("https://name-sector-server.vercel.app/persons");

      const data = await res.json();

      return data;
    },
  });

  const [dataToBeEdit, setDataToBeEdit] = useState(null);
  const [sectors, setSectors] = useState([]);

  // sectors
  useEffect(() => {
    fetch("https://name-sector-server.vercel.app/sectors")
      .then(res => res.json())
      .then(data => {
        setSectors(data[0].sectors);
      });
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto pb-14 md:pb-8">
      <h1 className="text-center md:text-3xl font-bold py-4">
        Enter your name and the sector you are related
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between">
        <DataInput refetch={refetch} sectors={sectors}></DataInput>
        <DataDisplay
          data={data}
          isLoading={isLoading}
          setDataToBeEdit={setDataToBeEdit}
        ></DataDisplay>
        {dataToBeEdit !== null && (
          <EditDataModal
            refetch={refetch}
            dataToBeEdit={dataToBeEdit}
            setDataToBeEdit={setDataToBeEdit}
            sectors={sectors}
          ></EditDataModal>
        )}
      </div>
    </div>
  );
}

export default App;
