/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FiLock } from "react-icons/fi";
import { BiHide, BiShow } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import DeletePWBox from "../components/DeletePWBox";

export default function ViewPWs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/viewPasswords", data)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
      });
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [showPW, setShowPW] = useState([]);
  const [index, setIndex] = useState(-1);
  const [success, setSuccess] = useState(true);
  const [box, setBox] = useState(false);

  useEffect(() => {
    // Initialize showPW with all false values based on the length of data
    setShowPW(new Array(data.length).fill(false));
  }, [data.length]); // Depend on data.length to reinitialize when the length changes

  const toggleShowPW = (index) => {
    setShowPW((prevShowPW) =>
      prevShowPW.map((item, i) => (i === index ? !item : item))
    );
  };

  const deletePW = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    setBox(false);
    axios
      .post("http://localhost:3000/updatePassword", updatedData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
      });
  };

  function boxToggle() {
    setBox(!box);
  }

  const handleChange = (e, i) => {
    const { name, value } = e.target;

    // Update the specific item in the array
    const updatedData = data.map((item, index) =>
      index === i ? { ...item, [name]: value } : item
    );

    // Update the state with the modified array
    setData(updatedData);
  };

  const validate = () => {
    let isValid = true;

    data.forEach((e) => {
      if (!e.platform || !e.pw) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      axios
        .post("http://localhost:3000/updatePassword", data)
        .then((res) => {
          res.data === "Passwords updated successfully." && setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setSuccess(false);
        });
    } else {
      console.log("Data is not valid");
    }
  };
  const tab = data.map((e, i) => {
    return (
      <div key={i} className=" flex flex-row w-full justify-around  ">
        <div className="flex relative w-[50%] border-2 border-black border-l-4 ">
          <FiLock className=" absolute top-1/2 transform -translate-y-1/2 left-3  text-[#808080]" />
          <input
            type={showPW[i] ? "text" : "password"}
            name="pw"
            id="pw"
            value={e.pw}
            placeholder="**************"
            onChange={(e) => handleChange(e, i)}
            onFocus={() => setSubmitted(false)}
            required
            className={`bg-blue-50 h-full rounded shadow-sm w-full px-2 pl-10 text-lg focus:outline-none ${
              submitted && !e.pw && "border-2 bg-red-200"
            }`}
          />
          {showPW[i] ? (
            <BiShow
              className=" absolute top-1/2 transform -translate-y-1/2 right-4 text-[#808080] cursor-pointer w-6 h-6"
              onClick={() => toggleShowPW(i)}
            />
          ) : (
            <BiHide
              className=" absolute top-1/2 transform -translate-y-1/2 right-4 text-[#808080] cursor-pointer w-6 h-6"
              onClick={() => toggleShowPW(i)}
            />
          )}
        </div>
        <div className="flex relative w-[50%] border-2 border-black border-r-4">
          <div className="text-lg p-4 ">{e.platform}</div>
          <FaTimes
            className="absolute top-1/2 transform -translate-y-1/2 right-4 text-[#fc8a8a] cursor-pointer w-6 h-6 hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
            onClick={() => {
              setBox(true);
              setIndex(i);
            }}
            size={24}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center font-sans h-full relative">
      <div className="flex flex-col w-[900px] border-b-2 border-black m-8">
        <div className=" flex flex-row w-full justify-around">
          <div className="text-2xl border-4 p-4 border-black border-b-2 border-r-2 w-[50%] ">
            Password
          </div>
          <div className="text-2xl border-4 p-4 border-black border-b-2 border-l-2 w-[50%]">
            Platform
          </div>
        </div>
        {tab}
      </div>
      <div
        className={`flex flex-row ${
          (submitted && !validate()) || (success && submitted)
            ? "justify-between"
            : "justify-end"
        } items-center  w-[900px]`}
      >
        {submitted && !validate() && (
          <p className="text-red-600 text-lg">
            Please Fill all the fields above
          </p>
        )}
        {success && submitted && (
          <p className="text-green-500 text-lg">
            Passwords updated successfully.
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="bg-blue-200 rounded w-[150px] p-4 h-[40px] flex justify-center items-center shadow-sm shadow-slate-400 hover:bg-blue-300 hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
        >
          Save
        </button>
      </div>
      {box && (
        <DeletePWBox
          toggleHandler={boxToggle}
          deletePWBox={deletePW}
          index={index}
        />
      )}
    </div>
  );
}
