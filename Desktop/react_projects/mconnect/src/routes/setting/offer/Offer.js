import ChatListItem from "./ChatListItem";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { dbService } from "fbase";
import { userState } from "atom";
import { useRecoilValue } from "recoil";
import { List } from "@mui/material";
import {} from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Offer = ({ ...props }) => {
  const { navigate, onBackClick, timeDisplay } = props;
  const loggedInUser = useRecoilValue(userState);

  const [chatList, setChatList] = useState([]);

  async function getChatList() {
    const q1 = query(collection(dbService, "chatList"));

    await getDocs(q1).then((snapshot) => {
      const arr = [];
      snapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setChatList(arr);
    });
  }

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <>
      <div className="fixed top-0 z-10 w-full h-14 px-5 p-3 flex justify-between items-center shadow bg-white">
        <button onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
      </div>
      <div className="w-screen h-screen">
        <div className="pt-16 mx-2">
          <List>
            {chatList.map((chat, index) => (
              <ChatListItem
                key={index}
                chat={chat}
                navigate={navigate}
                timeDisplay={timeDisplay}
              />
            ))}
          </List>
        </div>
      </div>
    </>
  );
};

export default Offer;
