import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";
import Tiptap from "./tiptap";

const MyForm = () => {
  const [description, setDescription] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const output = document.getElementById("output");
    if (output) {
      output.innerHTML = description;
    }
  }

  return (
    <div className="my-10 w-full max-w-3xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-4">
        <Tiptap description={description} onChange={setDescription} />
        <Button type="submit" className="w-full">
          <span>View Output</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
      <div
        id="output"
        className="mt-8 bg-gray-50 shadow-sm p-8 space-y-3 rounded-md"
      ></div>
    </div>
  );
};

export default MyForm;
