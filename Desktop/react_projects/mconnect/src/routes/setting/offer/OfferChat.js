import YourChat from "./YourChat";
import MyChat from "./MyChat";
import OfferChatBottom from "./OfferChatBottom";
import { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { dbService } from "fbase";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { chatUserState } from "atom";
import { userState } from "atom";
import {} from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OfferChat = ({ ...props }) => {
  const { onBackClick } = props;
  const loggedInUser = useRecoilValue(userState);
  const chatUser = useRecoilValue(chatUserState);
  const clearChatUser = useResetRecoilState(chatUserState);

  const [chats, setChats] = useState([]);

  function _onBackClick() {
    clearChatUser();
    onBackClick();
  }

  useEffect(() => {
    const q1 = query(
      collection(dbService, "chatList", chatUser, "chats"),
      orderBy("createdAt", "asc"),
      limit(10)
    );

    onSnapshot(q1, (snapshot) => {
      const _chats = snapshot.docs.map((doc) => doc.data());
      setChats(_chats);
    });
  }, []);

  return (
    <>
      <div className="fixed top-0 z-10 w-full h-14 px-5 p-3 flex justify-between items-center shadow bg-white">
        <button onClick={_onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
      </div>
      <div
        className="w-screen bg-stone-50 text-sm"
        style={{
          minHeight: "100vh",
        }}
      >
        {chats && (
          <div className="pt-20 pb-24 mx-2">
            {chats.map((chat, index) => (
              <div key={index}>
                {chat.fromId === loggedInUser.userId ? (
                  <MyChat
                    beforeChat={index > 0 ? chats[index - 1] : undefined}
                    chat={chat}
                    afterChat={index > 0 ? chats[index + 1] : undefined}
                  />
                ) : (
                  <YourChat
                    beforeChat={index > 0 ? chats[index - 1] : undefined}
                    chat={chat}
                    afterChat={index > 0 ? chats[index + 1] : undefined}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <OfferChatBottom loggedInUser={loggedInUser} chatUser={chatUser} />
    </>
  );
};

export default OfferChat;
