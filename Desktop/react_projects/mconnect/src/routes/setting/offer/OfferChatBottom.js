import { useEffect, useRef, useState } from "react";
import { dbService } from "fbase";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import dayjs from "dayjs";

const OfferChatBottom = ({ loggedInUser, chatUser }) => {
  const textarea = useRef();

  const [message, setMessage] = useState("");

  function handleResizeHeight() {
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  }

  function onChange(e) {
    if (e.target.value === " ") return;
    handleResizeHeight();
    setMessage(e.target.value);
  }

  async function onSubmit() {
    if (message === "") return;
    await addDoc(collection(dbService, "chatList", chatUser, "chats"), {
      fromId: loggedInUser.userId,
      fromName: loggedInUser.userName,
      fromPhotoURL: loggedInUser.userPhotoURL,
      createdAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
      date: dayjs().format("YYYY년 M월 D일 dddd"),
      minute: dayjs().format("h:mm A"),
      message: message,
    });
    await updateDoc(doc(dbService, "chatList", chatUser), {
      updatedAt: dayjs().format("YYYY. MM. DD. HH:mm:ss"),
      recentMessage: message,
      notToRead: true,
    });
    setMessage("");
    textarea.current.style.height = "auto";
  }

  return (
    <div className="fixed bottom-0 z-10 w-full flex">
      <textarea
        ref={textarea}
        type="text"
        className="py-3 px-2 w-full flex items-center text-lg align-middle shadow-inner"
        style={{
          resize: "none ",
          minHeight: "48px",
          maxHeight: "160px",
        }}
        rows={1}
        autoComplete="off"
        value={message}
        onChange={(e) => {
          onChange(e);
        }}
      />
      <button
        className="w-16 shadow-inner rounded bg-sky-400 text-white"
        onClick={onSubmit}
      >
        <FontAwesomeIcon icon={faPaperPlane} size="lg" />
      </button>
    </div>
  );
};

export default OfferChatBottom;
