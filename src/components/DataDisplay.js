import React from "react";

const DataDisplay = ({ data, isLoading }) => {
  return (
    <div className="p-4 md:p-8 overflow-x-auto md:flex-1">
      <table className="table w-full text-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sector</th>
            <th>Agree to terms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? "Loading.."
            : data?.map(person => {
                return (
                  <tr key={person._id}>
                    <td>{person.name}</td>
                    <td>{person.sector}</td>
                    <td>{person.terms ? "Yes" : "No"}</td>
                    <td>
                      <button className="btn btn-sm btn-primary">Edit</button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay;
