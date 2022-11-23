import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

const YourChat = ({ beforeChat, chat, afterChat }) => {
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
    <div className={`flex ${!willContinue && "mb-5"}`}>
      <div className="flex items-start">
        {!isContinued && (
          <Avatar
            alt="avatar"
            src={chat.fromPhotoURL}
            sx={{
              background: "white",
              display: "flex",
              width: "45px",
              height: "45px",
              borderWidth: "1px",
            }}
          />
        )}
        <div className="flex-col">
          {!isContinued && (
            <span className="ml-3 block font-black">{chat.fromName}</span>
          )}
          <span
            className={`mr-1 my-1 p-3 block break-all bg-white text-stone-600 shadow ${
              isContinued ? "ml-14 rounded-t-2xl" : "ml-3 rounded-tr-2xl"
            } rounded-b-2xl`}
          >
            {chat.message}
          </span>
        </div>
      </div>
      {!willContinue && (
        <div
          className="flex items-end text-stone-400"
          style={{ minWidth: "60px", fontSize: "8px" }}
        >
          {chat.minute}
        </div>
      )}
    </div>
  );
};

export default YourChat;
