import { useEffect, useState } from "react";

const MyChat = ({ beforeChat, chat, afterChat }) => {
  const isContinued =
    beforeChat !== undefined
      ? beforeChat.minute === chat.minute
        ? true
        : false
      : false;
  const willContinue =
    afterChat !== undefined
      ? afterChat.minute === chat.minute
        ? true
        : false
      : false;

  return (
    <div className={`flex justify-end items-end ${!willContinue && "mb-5"}`}>
      {!willContinue && (
        <div
          className="text-stone-400"
          style={{ minWidth: "50px", fontSize: "8px" }}
        >
          {chat.minute}
        </div>
      )}
      <span
        className={`mr-5 ml-1 my-1 p-3 break-all bg-white text-stone-600 shadow ${
          isContinued ? "rounded-t-2xl" : "rounded-tl-2xl"
        }  rounded-b-2xl`}
      >
        {chat.message}
      </span>
    </div>
  );
};

export default MyChat;
