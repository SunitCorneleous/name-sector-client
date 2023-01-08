import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const EditDataModal = ({ dataToBeEdit, sectors, setDataToBeEdit, refetch }) => {
  const [terms, setTerms] = useState("loading");
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    setTerms(dataToBeEdit?.terms);
  }, [dataToBeEdit?.terms]);

  useEffect(() => {
    const token = sessionStorage.getItem("session-token");
    setSessionToken(token);
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

    if (name === "") {
      return alert("enter valid name");
    } else if (sector === "select a sector") {
      return alert("select a sector sector");
    } else {
      fetch(`http://localhost:5000/edit-person-data/${dataToBeEdit._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(data => {
          if (data.modifiedCount) {
            toast.success("Data edited successfully");
            refetch();
            setDataToBeEdit(null);
          }
        });
    }
  };

  return (
    <>
      <input type="checkbox" id="editDataModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="editDataModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setDataToBeEdit(null)}
          >
            ✕
          </label>
          <form onSubmit={submitHandler}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Enter your name:</span>
              </label>
              <input
                defaultValue={dataToBeEdit?.name}
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
                <option defaultChecked>{dataToBeEdit?.sector}</option>
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
      </div>
    </>
  );
};

export default EditDataModal;
