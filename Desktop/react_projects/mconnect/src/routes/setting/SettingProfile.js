import SettingProfileEdit from "./SettingProfileEdit";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

const SettingProfile = ({ loggedInUser }) => {
  const [isEdit, setIsEdit] = useState(false);

  const onEditClick = () => {
    setIsEdit(true);
  };

  return (
    <>
      <div className="relative m-5 p-2 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Avatar
            className="bg-white border-2"
            alt="avatar"
            src={loggedInUser.userPhotoURL}
            sx={{
              display: "flex",
              width: "50px",
              height: "50px",
            }}
          />
          <div className="flex-col">
            <span className="flex font-black text-base">
              {loggedInUser.userName}
            </span>
            <span className="flex text-xs text-stone-400">
              {loggedInUser.userEmail}
            </span>
          </div>
        </div>
        <button
          className={`relative ${
            isEdit ? "invisible opacity-0 top-5" : "visible opacity-100 top-0"
          } text-xl text-stone-600 duration-100`}
          onClick={onEditClick}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
      <SettingProfileEdit
        loggedInUser={loggedInUser}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </>
  );
};

export default SettingProfile;
