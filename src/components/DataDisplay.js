import React from "react";
import Spinner from "./shared/Spinner";

const DataDisplay = ({ data, isLoading, setDataToBeEdit }) => {
  if (isLoading) {
    return (
      <div className="md:flex-1 w-full h-44 flex justify-center items-center">
        <Spinner></Spinner>
      </div>
    );
  } else {
    return (
      <div className="m-3 overflow-x-auto md:overflow-x-visible md:flex-1 shadow-lg">
        <table className="table w-full text-sm mx-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Sector</th>
              <th>Agree to terms</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(person => {
              return (
                <tr key={person._id}>
                  <td>{person.name}</td>
                  <td>{person.sector}</td>
                  <td>{person.terms ? "Yes" : "No"}</td>
                  <td>
                    {sessionStorage.getItem("session-token") ===
                      person?.sessionToken && (
                      <label
                        className="btn btn-sm btn-primary"
                        htmlFor="editDataModal"
                        onClick={() => setDataToBeEdit(person)}
                      >
                        Edit
                      </label>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default DataDisplay;
