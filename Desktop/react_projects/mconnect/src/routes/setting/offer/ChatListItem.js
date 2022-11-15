import { useSetRecoilState } from "recoil";
import { chatUserState } from "atom";
import { Avatar, List, ListItem, ListItemButton } from "@mui/material";

const ChatListItem = ({ chat, navigate, timeDisplay }) => {
  const setChatUser = useSetRecoilState(chatUserState);

  function onChatClick(chat) {
    setChatUser(chat.userId);
    navigate("/setting/offer/offerChat");
  }

  return (
    <ListItem disablePadding>
      <ListItemButton
        className="text-xs gap-2"
        onClick={() => {
          onChatClick(chat);
        }}
      >
        <Avatar
          alt="avatar"
          src={chat.userPhotoURL}
          sx={{
            display: "flex",
            width: "45px",
            height: "45px",
            borderWidth: "2px",
          }}
        />
        <div className="w-2/3">
          <span className="mb-1 block text-stone-600 font-black">
            {chat.userName}
          </span>
          <span className="block text-stone-400 truncate">
            {chat.recentMessage}
          </span>
        </div>

        <div
          className="relative text-stone-400"
          style={{ minWidth: "40px", fontSize: "8px" }}
        >
          {timeDisplay(chat.updatedAt)}
          {chat.notToRead && (
            <>
              <div
                className="absolute right-0 -top-1 animate-ping w-2 h-2 bg-rose-400 text-white rounded-full"
                style={{ fontSize: "8px" }}
              ></div>
              <div
                className="absolute right-0 -top-1 w-2 h-2 bg-rose-200 text-white rounded-full"
                style={{ fontSize: "8px" }}
              ></div>
            </>
          )}
        </div>
      </ListItemButton>
    </ListItem>
  );
};

export default ChatListItem;
