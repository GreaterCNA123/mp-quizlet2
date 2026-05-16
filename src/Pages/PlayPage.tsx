import { useState } from "react";

export default function PlayPage() {
  return (
    <div className="flex flex-col gap-y-5 items-center">
      <Search />
      <div className="bg-pink-500">
        <Card />
      </div>
    </div>
  );
}
export function Search() {
  return (
    <div className="w-10/12 mt-5 bg-white">
      <input
        className="w-full text-black"
        placeholder="Search for Content"
      ></input>
    </div>
  );
}
export function Card() {
  let [nums, setNums] = useState(0);
  let [tags, setTags] = useState("Biology");
  return (
    <div className="btn bg-white h-50 w-50 grid grid-rows-4">
      <div className="bg-blue-500 text-white">DNA Test Package 1</div>
      <div className="bg-blue-500 h-20 w-45 rounded-2xl"></div>
      <div className="bg-blue-500 text-white h-20">
        DNA, Macromolecules, and Protein structure
      </div>
      <div className="bg-black grid grid-cols-2">
        <div className="btn bg-white text-black ">Likes: {nums}❤️</div>
        <div className="btn bg-white text-black">Tags: #{tags}</div>
      </div>
    </div>
  );
}
