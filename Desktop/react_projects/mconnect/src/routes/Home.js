import React from "react";
import { authService } from "fbase";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import {
  faCircle,
  faDiceD6,
  faSquare,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

const Home = (customHooks) => {
  const user = authService.currentUser;

  const temp = (
    <div class="flex justify-around mt-8 m-4">
      <Avatar
        sx={{
          display: "flex",
        }}
      >
        <FontAwesomeIcon icon={faCircle} size="xs" />
      </Avatar>
      <Avatar
        sx={{
          display: "flex",
        }}
      >
        <FontAwesomeIcon icon={faMinus} size="xl" />
      </Avatar>
      <Avatar
        sx={{
          display: "flex",
        }}
      >
        <FontAwesomeIcon icon={faSquare} size="" />
      </Avatar>
      <Avatar
        sx={{
          display: "flex",
        }}
      >
        <FontAwesomeIcon icon={faDiceD6} size="lg" />
      </Avatar>
    </div>
  );

  return (
    <div class="w-screen">
      {/* top */}
      <div
        class="relative w-full pb-2"
        style={{
          background: "#8ee976",
        }}
      >
        <div class="app__logo english__font font-black pt-4 mx-4 text-3xl ">
          Connect
        </div>
        <div class="relative highlight mx-4 mt-4 mb-2 text-lg font-black z-10">
          새 아이디어 ✏️
        </div>
        <div class="flex items-end mx-4 mt-2">
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
          <h2>
            <b>{user.displayName}</b>
          </h2>
        </div>
        <div class="h-52 m-4 bg-white rounded-3xl">
          <form class="flex-col">
            <div>text</div>
            <div>source</div>
            <div>tags</div>
          </form>
        </div>
        <div class=""></div>
      </div>
      <div class="bg-blue-200">ideas</div>
      <div class="bg-red-200">Connect</div>
      <div class="bg-blue-200">storming</div>
      <div class="bg-red-200">explore</div>
    </div>
  );
};

export default Home;
