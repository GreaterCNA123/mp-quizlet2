import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Navigate } from "react-router";

type Question = {
  question: string;
  options: string[];
  answer: number;
  timeLimit: number;
  img: string;
};

//         img: v.string(),
//         question: v.string(),
//         timeLimit: v.number(),
//         answer: v.number(),
//         options: v.array(v.string()),

const IMGBB_API_KEY = "bae500e8b9a1f0585640f1a8d4f00078";

export default function CreatePage() {
  const createDeck = useMutation(api.deck.createDeck);
  let [qIndex, setqIndex] = useState(1);
  let [pub, setPub] = useState(false);
  let [show, setShow] = useState(false);
  let [shuffled, setShuffled] = useState(false);
  let [ar, setAr] = useState<Question[]>([
    {
      question: "",
      options: ["", "", "", ""],
      answer: -1,
      timeLimit: 15,
      img: "",
    },
    {
      question: "",
      options: ["", "", "", ""],
      answer: -1,
      timeLimit: 15,
      img: "",
    },
    {
      question: "",
      options: ["", "", "", ""],
      answer: -1,
      timeLimit: 15,
      img: "",
    },
  ]);
  function addQuestion() {
    let clone = [
      ...ar,
      { question: "", options: [], answer: -1, timeLimit: 15, img: "" },
    ];
    setAr(clone);
  }
  function delQuest() {
    if (qIndex != ar.length) {
      let clone_1 = ar.slice(0, qIndex);
      let clone_2 = ar.slice(qIndex + 1, ar.length);
      let clone_3 = [...clone_1, ...clone_2];
      // console.log(clone_3);
      setAr(clone_3);
    }
  }
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    createDeck({
      isPublic: pub,
      isShuffled: shuffled,
      numQuizQuestion: Number(formData.get("numQuizQuestion")),
      title: formData.get("title") as string,
      questions: ar,
      // question: ar,
    });
    // createDeck({
    //   isPublic,isShuffled,numQuizQuestion,ownerUserId,title
    // })
  }

  return (
    <form className="m-2" onSubmit={handleSubmit}>
      {/* Deck Title */}
      <fieldset className="fieldset text-primary">
        <legend className="fieldset-legend text-primary text-2xl">
          <strong>Deck title</strong>
        </legend>
        <input
          type="text"
          className="input text-primary border-solid border-black"
          placeholder="Type Here"
          name="title"
        />
      </fieldset>
      {/* Public or Private */}
      <div>
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
      {/* Number of Questions When Set is Played */}
      {/* <div className="flex flex-row">
        <div className="flex items-center justify-items-center">
          Number of Questions in a Match:
        </div>
        <input
          type="number"
          className="input text-primary border-solid border-black"
          placeholder="Type Here"
          name="numQuizQuestion"
          value={1}
          onChange={(event) =>
            Number("event.currentTarget.value") > ar.length
              ? ar.length
              : Number(event.currentTarget.value)
          }
        />
      </div> */}
      {/* Question is Shuffled? */}
      <div className="flex flex-row">
        <div className="flex items-center justify-items-center">
          {" "}
          <strong>Shuffled? </strong>{" "}
        </div>
        <div
          className={`btn ${shuffled ? "bg-green-300" : ""}`}
          onClick={() => setShuffled(true)}
        >
          Yes
        </div>
        <div
          className={`btn ${!shuffled ? "bg-green-300" : ""}`}
          onClick={() => setShuffled(false)}
        >
          No
        </div>
      </div>
      {/* Each of the Questions */}
      <h3 />
      <legend className="fieldset-legend text-primary text-2xl">
        <strong>Questions</strong>
      </legend>
      <div className="flex flex-row">
        {ar.map((_, i) => (
          <button
            key={i}
            className={`btn ${qIndex === i ? "bg-pink-200" : "bg-white"}`}
            type="button"
            onClick={() => setqIndex(i)}
          >
            {i}
          </button>
        ))}
        <button type="button" className="btn" onClick={() => addQuestion()}>
          +
        </button>
      </div>
      {/* Question Options */}
      {qIndex < ar.length && (
        <Question
          qIn={ar[qIndex]}
          key={qIndex}
          setArIn={setAr}
          ar={ar}
          qIndexIn={qIndex}
        />
      )}
      <div className="flex gap-x-5">
        <button type="button" className="btn" onClick={() => delQuest()}>
          Delete
        </button>
        <button className="btn">Submit</button>
      </div>
    </form>
  );
}

function Question(args: {
  qIn: Question;
  ar: Question[];
  setArIn: Function;
  qIndexIn: number;
}) {
  let { qIn, setArIn, ar, qIndexIn } = args;
  let [show, setShow] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (!picked) return;
    setFile(picked);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(picked));
    setUploadedUrl(null);
    setStatus("idle");
  }
  async function handleUpload() {
    if (!file) return;

    setStatus("uploading");
    setError(null);
    try {
      const formData = new FormData();
      formData.append("key", IMGBB_API_KEY);
      formData.append("image", file);
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data) throw new Error(data.error?.message ?? "Upload Failed");

      setUploadedUrl(data.data.url);
      let clone = [...ar];
      clone[qIndexIn].img = data.data.url;
      setArIn(clone);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something Went Wrong");
      setStatus("error");
    }
  }
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
  function setAns(ans: number) {
    let clone = [...ar];
    clone[qIndexIn].answer = ans;
    setArIn(clone);
  }

  function handleOptionUpdate(value: string, optionIndex: number) {
    console.log(value, optionIndex);

    let clone = [...ar];
    clone[qIndexIn].options[optionIndex] = value;
    setArIn(clone);

    console.log(clone);
  }
  function handleTLUpdate(value: number) {
    console.log(value);

    let clone = [...ar];
    clone[qIndexIn].timeLimit = value;
    setArIn(clone);

    console.log(clone);
  }
  function handleQTUpdate(value: string) {
    console.log(value);

    let clone = [...ar];
    clone[qIndexIn].question = value;
    setArIn(clone);

    console.log(clone);
  }

  return (
    <div className="flex flex-col">
      <fieldset className="fieldset text-primary">
        <legend className="fieldset-legend text-primary text-2xl">
          <strong>Question</strong>
        </legend>
        <input
          type="Question"
          className="input text-primary border-solid border-black"
          placeholder="Type Here"
          value={qIn.question}
          onChange={(event) => handleQTUpdate(event.currentTarget.value)}
        />
        <legend className="fieldset-legend text-primary text-2xl">
          <strong>Image</strong>
        </legend>
        <div className="bg-white flex flex-col border-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="btn"
          />
          {previewUrl && status != "done" && (
            <div>
              <p>local preview</p>
              <img
                src={previewUrl}
                alt="local preview"
                className="max-w-1/4 max-h-50"
              />
              <button
                onClick={handleUpload}
                disabled={status === "uploading"}
                className="btn btn-primary"
              >
                {status === "uploading" ? "...Uploading" : "Upload to imgbb."}
              </button>
            </div>
          )}
          {(qIn.img != "" || (status === "done" && uploadedUrl)) && (
            <div>
              <p>Uploaded!</p>
              <a
                href={qIn.img != "" ? qIn.img : uploadedUrl!}
                target="_blank"
                rel="nonreferrer"
              >
                Permanant URL: {uploadedUrl}
              </a>
              <img
                src={qIn.img != "" ? qIn.img : uploadedUrl || ""}
                alt="Uploaded"
                style={{ maxWidth: 400, marginTop: 8 }}
              />
            </div>
          )}
          {status === "error" && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
        <legend className="fieldset-legend text-primary text-2xl">
          <strong>Options</strong>
        </legend>
        <div className="flex flex-col">
          {qIn.options.map((v, i) => (
            <input
              className="Input"
              key={i}
              placeholder="option"
              value={v}
              onChange={(event) =>
                handleOptionUpdate(event.currentTarget.value, i)
              }
            />
          ))}
          {qIn.options.length < 4 ? (
            <button className="btn" type="button" onClick={() => addOption()}>
              +
            </button>
          ) : (
            ""
          )}
          <legend className="fieldset-legend text-primary text-2xl">
            <strong>Answer Choices</strong>
          </legend>
          <div className="flex flex-col">
            {/* <div>ans: {qIn.ans}</div> */}
            {!show ? (
              <div>
                {qIn.options.map((_, i) => (
                  <button
                    className={`btn ${qIn.answer === i ? "bg-green-300" : ""}`}
                    type="button"
                    onClick={() => setAns(i)}
                    key={i}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <legend className="fieldset-legend text-primary text-2xl">
            <strong>Timelimit</strong>
          </legend>
          <input
            type="number"
            className="input text-primary border-solid border-black"
            value={qIn.timeLimit}
            onChange={(event) =>
              handleTLUpdate(Number(event.currentTarget.value))
            }
          />
        </div>
      </fieldset>
    </div>
  );
}
