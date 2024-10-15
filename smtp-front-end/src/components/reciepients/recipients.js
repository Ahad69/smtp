import { Modal } from "@mantine/core";
import React, { useState } from "react";

const Recipients = ({ open, close, setEmailCount, emailCount, setEmails }) => {
  const [emailInput, setEmailInput] = useState("");

  const handleInputChange = (event) => {
    const input = event.target.value;
    formatAndSetEmails(input);
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    formatAndSetEmails(pastedText);
  };

  const formatAndSetEmails = (input) => {
    const emailArray = input
      .split(/[\n,]+/)
      .map((email) => email.trim())
      .filter((email) => email);

    setEmailInput(emailArray.join("\n"));
    setEmails(emailArray);
    setEmailCount(emailArray.length);
  };

  const handleClear = () => {
    setEmailInput("");
    setEmails([]);
    setEmailCount(0);
  };

  return (
    <div>
      {" "}
      <Modal opened={open} onClose={close} title={`Emails (${emailCount})`}>
        <textarea
          value={emailInput}
          onChange={handleInputChange}
          onPaste={handlePaste} // Handle paste event
          placeholder="Enter emails separated by commas or new lines"
          rows="10"
          cols="50"
        ></textarea>
        <p>Total Emails: {emailCount}</p>
        <br />
        <div className="w-[100px] flex  justify-between items-center">
          <button className="bg-red-500 px-2 text-black" onClick={handleClear}>
            Clear
          </button>
          <button className="bg-sky-500 px-2 text-white" onClick={close}>
            Set
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Recipients;
