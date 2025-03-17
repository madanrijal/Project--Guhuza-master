import React from "react";
import Spinner from "./spinner";

export default function PageLoader() {
  return (
    <div className="mt-40 flex justify-center items-center">
      <Spinner />
    </div>
  );
}
