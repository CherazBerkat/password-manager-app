import AddPW from "./Pages/AddPW";
import ViewPWs from "./Pages/ViewPWs";
import { useState } from "react";
function App() {
  const [state, setState] = useState(true);
  return (
    <div>
      <div className="flex flex-row w-full h-[70px] font-sans text-3xl items-center justify-around">
        <div
          className={` ${
            state ? "bg-blue-100" : "bg-blue-200 shadow-sm shadow-slate-400"
          } cursor-pointer w-[50%] h-full flex items-center justify-center hover:bg-blue-300 active:scale-95 active:duration-300`}
          onClick={() => setState(true)}
        >
          Add Password
        </div>
        <div
          className={`${
            !state ? "bg-blue-100" : "bg-blue-200 shadow-sm shadow-slate-400"
          } cursor-pointer w-[50%] h-full flex items-center justify-center hover:bg-blue-300 active:scale-95 active:duration-300`}
          onClick={() => setState(false)}
        >
          View Passwords
        </div>
      </div>
      {state ? <AddPW /> : <ViewPWs />} ;
    </div>
  );
}

export default App;
