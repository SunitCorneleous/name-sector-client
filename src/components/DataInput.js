import React, { useEffect, useState } from "react";

const DataInput = ({ refetch }) => {
  const [sectors, setSectors] = useState([]);
  const [terms, setTerms] = useState(false);

  const getSessionId = async () => {
    const currentTime = Math.floor(Date.now() / 1000);

    const res = await fetch(
      `http://localhost:5000/session-id?time=${currentTime}`
    );
    const data = await res.json();

    sessionStorage.setItem("session-token", data.token);
  };

  useEffect(() => {
    if (sessionStorage.getItem("session-token") === null) {
      getSessionId();
    }
  }, []);

  // sectors
  useEffect(() => {
    fetch("http://localhost:5000/sectors")
      .then(res => res.json())
      .then(data => {
        setSectors(data[0].sectors);
      });
  }, []);

  const submitHandler = e => {
    e.preventDefault();

    const form = e.target;
    const sessionToken = sessionStorage.getItem("session-token");

    const name = form.name.value;
    const sector = form.sector.value;

    const data = {
      name,
      sector,
      terms,
      sessionToken,
    };

    if (name === "") {
      return alert("enter valid name");
    } else if (sector === "select a sector") {
      return alert("select a sector sector");
    } else {
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
            refetch();
            alert("Data inserted successfully");
            form.reset();
            setTerms(false);
          }
        });
    }
  };

  return (
    <div className="p-4 m-3 md:p-8 shadow-lg max-w-full h-full md:flex-1 rounded-lg">
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
            <option defaultChecked>select a sector</option>
            {sectors?.map((sector, i) => (
              <option key={i} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-[50%] md:w-[30%]">
          <label className="label cursor-pointer">
            <input
              name="terms"
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={terms}
              onChange={() => setTerms(!terms)}
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
