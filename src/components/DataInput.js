import React, { useEffect, useState } from "react";

const DataInput = () => {
  const [terms, setTerms] = useState(false);
  const [sectors, setSectors] = useState([]);

  // sectors
  useEffect(() => {
    fetch("http://localhost:5000/sectors")
      .then(res => res.json())
      .then(data => setSectors(data));
  }, []);

  const submitHandler = e => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const sector = form.sector.value;

    const data = {
      name,
      sector,
      terms,
    };

    fetch("http://localhost:5000/data-input", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          alert("Data inserted successfully");
        }
      });
  };

  return (
    <div className="p-4 m-3 md:p-8 shadow-lg max-w-full md:flex-1">
      <form onSubmit={submitHandler}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Enter your name:</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Enter your name here"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Select your sector:</span>
          </label>
          <select name="sector" className="select select-bordered">
            {sectors.map(sector => (
              <option key={sector._id} value={sector.name}>
                {sector.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-2/4 md:w-1/4">
          <label className="label cursor-pointer">
            <input
              name="terms"
              onChange={() => setTerms(!terms)}
              type="checkbox"
              className="checkbox checkbox-primary"
            />
            <span className="label-text">Agree the Terms</span>
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-full mt-3">
          save
        </button>
      </form>
    </div>
  );
};

export default DataInput;
