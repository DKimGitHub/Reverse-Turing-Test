"use client";
import Image from "next/image";
import { Textarea } from "@nextui-org/react";
import Ask from "../components/ask";
import Chat from "../components/chat"

export default function Home() {
  return (
    <div className="w-screen h-screen bg-slate-600">
      <div className="h-4/5 grid grid-cols-2">
        <Chat />
        <Chat />
      </div>

      <Ask />
    </div>
  );
}
