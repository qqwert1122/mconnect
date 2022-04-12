import React from "react";
import { useNavigate } from "react-router-dom";
import { authService, signOut } from "fbase";
import Avatar from "@mui/material/Avatar";

const Setting = () => {
  let navigate = useNavigate();
  const user = authService.currentUser;

  const onSignOutClick = () => {
    authService.signOut();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div>Setting</div>
      <div class="flex items-center mt-8 m-4">
        <div class="flex mr-2">
          <Avatar
            alt="avatar"
            src={user.photoURL}
            sx={{
              display: "flex",
              width: "50px",
              height: "50px",
            }}
          />
        </div>
        <div class="flex-col">
          <h2 class="text-base ">반갑습니다</h2>
          <h2 class="text-xl ">
            <b>{user.displayName}</b>님
          </h2>
        </div>
      </div>
      <button onClick={onSignOutClick}>Sign out</button>
    </div>
  );
};

export default Setting;
