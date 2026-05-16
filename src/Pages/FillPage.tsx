import { useState } from "react";
import { RiSquareRoot } from "react-icons/ri";

const equation = ["+", "-", "×", "÷", "≥", ">", "≤", "<", "=", "≠"];
export default function FillPage() {
  return (
    <div className="flex h-screen w-screen justify-center content-center items-center grid-flow-col gap-x-5">
      <Equation />
      <Operator />
      <Equation />
      <Operator />
      <Equation />
    </div>
  );
}

export function Equation() {
  let [frac, setFrac] = useState(false);
  let [uni, setUni] = useState(true);
  return (
    <div className="flex flex-cols">
      <div className=" h-20 gap-y-2 flex flex-col items-center justify-center ">
        {frac ? (
          <>
            <div>1</div>
            <hr className="w-10" />
            <div>2</div>
          </>
        ) : (
          <div>1</div>
        )}
        <div className="btn btn-primary h-7 w-7" onClick={() => setFrac(!frac)}>
          +
        </div>
      </div>
      <div
        className="btn btn-primary h-7 w-7"
        onClick={() => (uni ? setUni(!uni) : uni)}
      >
        +
      </div>
    </div>
  );
}

export function Operator() {
  let [toggle, setToggle] = useState(false);
  let [symb, setSymb] = useState("$");
  let [uni, setUni] = useState(true);

  return (
    <div className="flex flex-cols">
      <div className="flex flex-col items-center justify-center">
        {symb}
        <div
          className="btn btn-primary"
          onClick={() => setToggle(!toggle)}
        ></div>
        {toggle && (
          <div className="h-20 w-20 bg-white border-2 grid grid-cols-4">
            {equation.map((v, i) => (
              <div
                className="text-black border-2 border-black border-solid rounded-2"
                key={i}
                onClick={() => setSymb(v)}
              >
                {v}
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="btn btn-primary h-7 w-7"
        onClick={() => (uni ? setUni(!uni) : uni)}
      >
        +
      </div>
    </div>
  );
}
