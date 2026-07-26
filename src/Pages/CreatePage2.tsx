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
    <form className="flex flex-col gap-y-4 p-6 max-w-2xl mx-auto" onSubmit={handleSubmit}>
      {/* Deck Title */}
      <fieldset className="flex flex-col gap-y-1">
        <legend className="text-xl font-bold">Deck title</legend>
        <input
          type="text"
          className="border border-black px-2 py-1"
          placeholder="Type Here"
          name="title"
        />
      </fieldset>
      {/* Public or Private */}
      <div>
        <div
          className="border border-black px-2 py-1 w-fit"
          onClick={() => setShow(!show)}
        >
          {!pub ? "Private" : "Public"}
        </div>
        {!show ? (
          <div
            className="border border-black px-2 py-1 w-fit"
            onClick={() => {
              setShow(!show);
              setPub(!pub);
            }}
          >
            {!pub ? "Public" : "Private"}
          </div>
        ) : null}
      </div>
      {/* Question is Shuffled? */}
      <div className="flex flex-row items-center gap-x-2">
        <strong>Shuffled?</strong>
        <button
          type="button"
          className={`border border-black px-3 py-1 ${shuffled ? "bg-black text-white" : ""}`}
          onClick={() => setShuffled(true)}
        >
          Yes
        </button>
        <button
          type="button"
          className={`border border-black px-3 py-1 ${!shuffled ? "bg-black text-white" : ""}`}
          onClick={() => setShuffled(false)}
        >
          No
        </button>
      </div>
      {/* Each of the Questions */}
      <legend className="text-xl font-bold">Questions</legend>
      <div className="flex flex-row gap-x-2">
        {ar.map((_, i) => (
          <button
            key={i}
            className={`border border-black px-3 py-1 ${qIndex === i ? "bg-black text-white" : ""}`}
            type="button"
            onClick={() => setqIndex(i)}
          >
            {i}
          </button>
        ))}
        <button
          type="button"
          className="border border-black px-3 py-1"
          onClick={() => addQuestion()}
        >
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
        <button
          type="button"
          className="border border-black px-3 py-1"
          onClick={() => delQuest()}
        >
          Delete
        </button>
        <button className="border border-black px-3 py-1">Submit</button>
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
    <div className="flex flex-col gap-y-2 border border-black p-4">
      <fieldset className="flex flex-col gap-y-2">
        <legend className="text-lg font-bold">Question</legend>
        <input
          type="text"
          className="border border-black px-2 py-1"
          placeholder="Type Here"
          value={qIn.question}
          onChange={(event) => handleQTUpdate(event.currentTarget.value)}
        />
        <legend className="text-lg font-bold">Image</legend>
        <div className="border border-black p-2 flex flex-col gap-y-2">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && status != "done" && (
            <div className="flex flex-col gap-y-1">
              <p className="text-sm">local preview</p>
              <img
                src={previewUrl}
                alt="local preview"
                className="max-w-1/4 max-h-50 border border-black"
              />
              <button
                onClick={handleUpload}
                disabled={status === "uploading"}
                className="border border-black px-3 py-1 w-fit"
              >
                {status === "uploading" ? "...Uploading" : "Upload to imgbb."}
              </button>
            </div>
          )}
          {(qIn.img != "" || (status === "done" && uploadedUrl)) && (
            <div className="flex flex-col gap-y-1">
              <p className="text-sm">Uploaded!</p>
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
                className="border border-black"
                style={{ maxWidth: 400, marginTop: 8 }}
              />
            </div>
          )}
          {status === "error" && <p>Error: {error}</p>}
        </div>
        <legend className="text-lg font-bold">Options</legend>
        <div className="flex flex-col gap-y-2">
          {qIn.options.map((v, i) => (
            <input
              className="border border-black px-2 py-1"
              key={i}
              placeholder="option"
              value={v}
              onChange={(event) =>
                handleOptionUpdate(event.currentTarget.value, i)
              }
            />
          ))}
          {qIn.options.length < 4 ? (
            <button
              className="border border-black px-3 py-1 w-fit"
              type="button"
              onClick={() => addOption()}
            >
              +
            </button>
          ) : (
            ""
          )}
          <legend className="text-lg font-bold">Answer Choices</legend>
          <div className="flex flex-col gap-y-2">
            {!show ? (
              <div className="flex gap-x-2">
                {qIn.options.map((_, i) => (
                  <button
                    className={`border border-black px-3 py-1 ${qIn.answer === i ? "bg-black text-white" : ""}`}
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
          <legend className="text-lg font-bold">Timelimit</legend>
          <input
            type="number"
            className="border border-black px-2 py-1"
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
