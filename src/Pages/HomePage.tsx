import { useState } from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-around items-center">
      <div className="flex flex-row gap-x-5">
        <div className="btn w-50 h-50 bg-white"></div>
        <div className="btn w-50 h-50 bg-white"></div>
        <div className="btn w-50 h-50 bg-white"></div>
        <div className="btn w-50 h-50 bg-white"></div>
      </div>
    </div>
  );
}
