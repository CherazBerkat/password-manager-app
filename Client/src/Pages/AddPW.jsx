import { useState } from "react";
import { FiLock } from "react-icons/fi";
import { BiHide, BiShow } from "react-icons/bi";
import axios from "axios";
export default function AddPW() {
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    pw: "",
    Platform: "",
  });

  const [showPW, setShowPW] = useState(false);
  const [success, setSuccess] = useState(true);
  const validate = () => {
    return data.pw && data.Platform;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      axios
        .post("http://localhost:3000/addPassword", data)
        .then((res) => {
          res.data === "Password added" && setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setSuccess(false);
        });
    } else {
      console.log("Data is not valid");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center font-sans">
      <div className="bg-slate-50 shadow-md shadow-slate-400 flex flex-col w-[500px] rounded h-fit p-4">
        <div className="mb-4 flex flex-col w-full">
          <label htmlFor="pw" className="text-2xl">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="flex relative">
            <FiLock className=" absolute top-1/2 transform -translate-y-1/2 left-3  text-[#808080]" />
            <input
              type={showPW ? "text" : "password"}
              name="pw"
              id="pw"
              value={data.pw}
              placeholder="**************"
              onChange={handleChange}
              onFocus={() => setSubmitted(false)}
              required
              className="bg-blue-100 h-[40px] rounded shadow-sm w-full px-2 pl-10 text-lg "
            />
            {showPW ? (
              <BiShow
                className=" absolute top-1/2 transform -translate-y-1/2 right-4 text-[#808080] cursor-pointer w-6 h-6"
                onClick={() => setShowPW(!showPW)}
              />
            ) : (
              <BiHide
                className=" absolute top-1/2 transform -translate-y-1/2 right-4 text-[#808080] cursor-pointer w-6 h-6"
                onClick={() => setShowPW(!showPW)}
              />
            )}
          </div>
          {submitted && !validate() && !data.pw && data.Platform && (
            <p className="text-red-500 text-sm">Please fill this field</p>
          )}
        </div>
        <div className="mb-4 flex flex-col w-full">
          <label htmlFor="Platform" className="text-2xl">
            Platform <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Platform"
            id="Platform"
            placeholder="Facebook"
            value={data.Platform}
            onChange={handleChange}
            onFocus={() => setSubmitted(false)}
            required
            className="bg-blue-100 h-[40px] rounded shadow-sm px-2 text-lg"
          />
          {submitted && !data.pw && !data.Platform && (
            <p className="text-red-500 text-sm">Please fill the fields above</p>
          )}
          {submitted && data.pw && !data.Platform && (
            <p className="text-red-500 text-sm">Please fill this field</p>
          )}
          {success && submitted && (
            <p className="text-green-500 text-sm">Password added </p>
          )}
          {!success && submitted && validate() && (
            <p className="text-red-500 text-sm">
              Server responded with an error, please try again
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-200 rounded w-[300px] p-4 h-[40px] flex justify-center items-center shadow-sm shadow-slate-400 hover:bg-blue-300 hover:scale-[1.02] hover:duration-300 active:scale-95 active:duration-300"
          >
            Add Password
          </button>
        </div>
      </div>
    </div>
  );
}
