import React, { useState } from "react";
import { Button } from "./Button";

function CreatedJobCard({
  title,
  description,
  qualification,
  vacancy,
  company,
  onId,
  onOpen,
}) {
  function handleClick() {
    onOpen();
    onId();
  }
  return (
    <div className=" h-full p-10 bg-white shadow-md flex border-2 justify-between m-1 rounded-md ">
      <div className="flex flex-col ">
        <h4>
          <b>Title:</b> {title}
        </h4>
        <h4>
          <b>Description:</b> {description}
        </h4>
        <h4>
          <b>Qualification:</b> {qualification}
        </h4>
        <h4>
          <b>Vacancy:</b> {vacancy}
        </h4>
        <h4>
          <b>Company:</b> {company}
        </h4>
      </div>
      
      <Button label={"Details"} onClick={handleClick} />
    </div>
  );
}

export default CreatedJobCard;
