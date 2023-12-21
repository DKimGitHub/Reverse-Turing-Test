'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("http://localhost:5000/api/games", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('gameId', data.id);
      });
  }, []);
  return (
    <div className="flex-col justify-center items-center">
      <p className="text-6xl text-center p-8 pt-16">
        The Reverse Turing Test!!!
      </p>
      <p className="text-xl text-center p-2">
        The Turing Test is a test for determining whether or not an AI is
        capable of thinking like a human being.{" "}
      </p>
      <p className="text-xl text-center p-2">
        But the REVERSE Turing Test is a test for determining whether or not a
        human being is capable of thinking like an AI.
      </p>
      <div className="pt-10 text-center">
        <Link
          href="/questioner"
          className="rounded-lg bg-slate-500 m-2 p-4 text-2xl"
        >
          I wanna be the questioner!
        </Link>
        <Link
          href="/answerer"
          className="rounded-lg bg-slate-500 m-2 p-4 text-2xl w-16"
        >
          I wanna be the answerer!
        </Link>
      </div>
    </div>
  );
}
