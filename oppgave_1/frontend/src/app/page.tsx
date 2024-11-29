import All from "@/pages/All";


export default function Home() {
  return (
    <div
    className="mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[auto_minmax(900px,_1fr)_30px]"
    data-testid="layout"
  >
    <main className="h-full">
      <All />
      
    </main>
    </div>
  );
}
import React from "react";
