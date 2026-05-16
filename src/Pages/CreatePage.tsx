import { useState } from "react";
// const limiter = <input type="Time Limit: " placeholder="timelimit"/>
// const Sanswer = <button onClick = {() => }> </button>
export default function CreatePage() {
  let placeholder_1 = true;
  let [ar, setAr] = useState(["option 1", "option 2"]);
  return (
    <div className="flex flex-col w-full flex-1 items-center justify-center bg-black">
      <div
        className="w-10/12 h-1/4 btn bg-white text-black m-5"
        onClick={() => !placeholder_1}
      >
        {placeholder_1 ? "Image" : "+"}
      </div>
      <div className="grid grid-cols-2">
        {ar.map((v, i) => (
          <div className="w-50 h-50 btn bg-white">
            <input
              className="w-full text-black"
              placeholder={`${ar[i]}`}
            ></input>
          </div>
        ))}
        {ar.length < 4 ? (
          <div
            className="w-50 h-50 btn bg-white text-black"
            onClick={() => setAr([...ar, "Option " + ar.length])}
          >
            +
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
