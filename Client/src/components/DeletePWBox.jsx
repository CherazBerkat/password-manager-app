/* eslint-disable react/prop-types */
export default function DeletePWBox({ toggleHandler, deletePWBox, index }) {
  return (
    <div className=" w-full absolute flex justify-center top-0 bg-gray-400 bg-opacity-60 h-[89vh]">
      <div className="flex flex-col gap-4 rounded-md font-sans bg-white w-[430px] h-[130px] px-4 justify-center items-center mt-40">
        <p className="text-lg">
          Are you sure you want to delete this password?
        </p>
        <div className=" flex flex-row gap-4 justify-center items-center">
          <button className="font-bold text-2xl" onClick={toggleHandler}>
            Cancel
          </button>
          <button
            className="bg-red-600 text-white font-bold text-2xl shadow-sm shadow-slate-300 w-[130px] px-4 pb-[2px] rounded"
            onClick={() => {
              deletePWBox(index);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
