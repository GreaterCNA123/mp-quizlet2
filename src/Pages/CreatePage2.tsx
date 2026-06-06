import { useMutation } from "convex/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../convex/_generated/api";

type Question = {
  question: string;
  options: string[];
  ans: number;
};

export default function CreatePage() {
  let [qIndex, setqIndex] = useState(1);
  let [ar, setAr] = useState<Question[]>([
    {
      question: "11",
      options: [],
      ans: -1,
    },
    {
      question: "2",
      options: ["2", "4"],
      ans: -1,
    },
  ]);

  function handlSubmit() {}

  return (
    <form className="m-2">
      <fieldset className="fieldset text-primary">
        <legend className="fieldset-legend text-primary text-2xl">
          <strong>Deck title</strong>
        </legend>
        <input
          type="text"
          className="input text-primary border-solid border-black"
          placeholder="Type Here"
        />
      </fieldset>
      <h3 />
      {ar.map((v, i) => (
        <button
          key={i}
          className={`btn ${qIndex === i ? "bg-pink-200" : "bg-white"}`}
          type="button"
          onClick={() => setqIndex(i)}
        >
          {i}
        </button>
      ))}
      <Question
        qIn={ar[qIndex]}
        key={qIndex}
        setArIn={setAr}
        ar={ar}
        qIndexIn={qIndex}
      />
      <button className="btn">Submit</button>
    </form>
  );
}
function Question({
  qIn,
  setArIn,
  ar,
  qIndexIn,
}: {
  qIn: Question;
  ar: Question[];
  setArIn: Function;
  qIndexIn: number;
}) {
  function addOption() {
    let clone = [...ar];
    clone[qIndexIn].options.push("");
    setArIn(clone);

    // setArIn({
    //   question: qIn.question,
    //   option: [...qIn.option, ""],
    //   ans: qIn.ans,
    // });
  }
  return (
    <fieldset className="fieldset text-primary">
      <legend className="fieldset-legend text-primary text-2xl">
        <strong>Question</strong>
      </legend>
      <input
        type="Question"
        className="input text-primary border-solid border-black"
        placeholder="Type Here"
        defaultValue={qIn.question}
      />
      <div className="flex flex-col">
        {qIn.options.map((v, i) => (
          <input className="Input" key={i} placeholder="option" />
        ))}
        {qIn.options.length < 4 ? (
          <button className="btn" type="button" onClick={() => addOption()}>
            +
          </button>
        ) : (
          ""
        )}
        <button></button>
      </div>
    </fieldset>
  );
}
