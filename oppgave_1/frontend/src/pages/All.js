"use client";

import SignUp from "./SignUpPage";
import Layout from "@/components/Layout";
import "../styles/tailwind/main.css";



 export default function All() {
  return (
    <div
      className="mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[auto_minmax(900px,_1fr)_30px]"
      data-testid="layout"
    >
      <Layout>
    
  
      <main className="h-full">
        <SignUp/>
        
      </main>
      </Layout>
    </div>
  );
}
