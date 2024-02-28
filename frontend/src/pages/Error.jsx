import React from "react";
import { Button } from "../components/Button";

function Error() {
  return (
    <div className=" flex justify-center items-center text-center font-semibold bg-white h-full py-10">
      <div className="w-1/4 p-10 border-1.5 rounded-md shadow-lg ">
        <h4 className="mb-4">Error 404</h4>
        <Button
          label={"Return back to Home"}
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>
    </div>
  );
}

export default Error;
