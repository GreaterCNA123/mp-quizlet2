import { useMutation } from "convex/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../convex/_generated/api";
// const limiter = <input type="Time Limit: " placeholder="timelimit"/>
// const Sanswer = <button onClick = {() => }> </button>
function handleSubmit() {}
export default function CreatePage() {
  const createPost = useMutation(api.deck.createQuestion);
  const navigate = useNavigate();
  let placeholder_1 = true;
  let [pub, setPub] = useState(false);
  let [show, setShow] = useState(false);
  let [setting, setSetting] = useState(false);
  let [ans, setAns] = useState(-1);
  const sample_group = ["X1", "X2", "X3", "X4", "X5"];
  let [group, setGroup] = useState([]);
  let [ar, setAr] = useState(["option 1", "option 2"]);
  return (
    <div className="flex flex-col">
      <div className="w-full h-20 bg-white flex">
        <input
          placeholder="Title: "
          className="w-1/2 flex-1 border-black border-solid border-2 text-black text-3xl"
        ></input>
        <div
          className="btn border-black border-solid border-2 bg-gray-600"
          onClick={() => setSetting(!setting)}
        >
          ⚙️Setting
        </div>
      </div>
      <form
        className="flex flex-row w-full flex-1 justify-center gap-x-5 items-center bg-black gap-y-3"
        onSubmit={() => handleSubmit()}
      >
        {/* Right */}
        <div className="w-50 bg-white h-full"></div>

        {/* Center */}
        <div className="flex flex-1 flex-col gap-3 mx-7">
          <input
            placeholder={`Set Your Question Here`}
            className="h-12 btn bg-white text-black mt-3"
            name="question"
          ></input>
          <div
            className="h-24 btn bg-white text-black"
            onClick={() => !placeholder_1}
          >
            {placeholder_1 ? "Image" : "+"}
          </div>
          <div className="grid grid-cols-2">
            {ar.map((v, i) => (
              <div
                className={`${ans != 0 ? (ans === i ? "bg-red-500" : "") : ""}h-50 btn bg-white`}
              >
                <input
                  className="w-full text-black"
                  placeholder={`${ar[i]}`}
                ></input>
                <div onClick={() => setAns(i)}></div>
              </div>
            ))}
            {ar.length < 4 ? (
              <div
                className="w-50 h-50 btn bg-white text-black"
                onClick={() => setAr([...ar, "Option " + (ar.length + 1)])}
              >
                +
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* right */}
        {setting ? (
          <div
            className="flex flex-col justify-center w-3/12 h-full
       bg-white"
          >
            <div className="h-1/2">
              {/* <input className="text-black" placeholder="Tags: " name="tag"></input> */}
              <div className="border-2 border-black border-solid">
                <div
                  className="text-black border-2 border-black border-solid"
                  onClick={() => setShow(!show)}
                >
                  {!pub ? "Private" : "Public"}
                </div>
                {!show ? (
                  <div
                    className="text-black"
                    onClick={() => {
                      setShow(!show);
                      setPub(!pub);
                    }}
                  >
                    {!pub ? "Public" : "Private"}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="h-1/2 ">
              <div className="bg-black w-full h-1"></div>
              <input
                className="text-black"
                placeholder="Timelimit: "
                name="timelimit"
              ></input>
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
