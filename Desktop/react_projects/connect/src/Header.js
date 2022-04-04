import "./Header.css";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faCircle,
  faSquare,
  faMinus,
  faDiceD6,
  faA,
  faBolt,
  faCubes,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";

const Header = ({ customHooks }) => {
  const showColorPicker = (
    <div
      class="colorpicker rounded-bl-3xl"
      style={{
        display: `${customHooks.colorPickerDisplay}`,
        backgroundColor: `${customHooks.color}`,
      }}
    >
      <div class="flex justify-center items-center">
        <div class="flex justify-center items-center flex-wrap">
          {customHooks.colorList.map((mColor, mIndex) => (
            <button
              key={mIndex}
              class="m-2 mt-2 p-2 border-2 border-solid border-white rounded-xl"
              style={{
                backgroundColor: `${mColor}`,
              }}
              onClick={() => {
                customHooks.setColor(mColor);
                customHooks.setColorPicker(!customHooks.colorPicker);
              }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      class="header flex justify-between items-center "
      style={{
        color: `${customHooks.textColor}`,
        backgroundColor: `${customHooks.color}`,
        zIndex: "5",
      }}
    >
      <div class="flex items-center">
        {/* <img class="h-12 mx-6" src="img/logo_connect_ver2.png" /> */}
        <NavLink to="/homePage">
          <span
            class="app__logo mx-6"
            style={{
              fontSize: "2rem",
              fontWeight: "900",
              color: "#FFF44F",
            }}
          >
            <b>Connect</b>
          </span>
        </NavLink>
        <nav
          style={{
            display: "flex",
            fontSize: "1.5rem",
            marginLeft: "3rem",
          }}
        >
          <NavLink to="/home">
            <div class="nav__a mx-6">
              <span class="mr-1" style={{ color: "#DFDFDF" }}>
                <FontAwesomeIcon icon={faCircleQuestion} />
              </span>
              <span>Connect</span>
            </div>
          </NavLink>
          <NavLink to="/main">
            <div class="nav__a mx-6">
              <span class="mr-1" style={{ color: "#BFFF00" }}>
                <FontAwesomeIcon icon={faCubes} />
              </span>
              <span>Memos</span>
            </div>
          </NavLink>
          {/* <NavLink to="/public">
            <span class="nav__a mx-6">Public</span>
          </NavLink> */}
          <NavLink to="/Lab">
            <div class="nav__a mx-6">
              <span class="mr-1" style={{ color: "#FFF44F" }}>
                <FontAwesomeIcon icon={faBolt} />
              </span>
              <span>Storming</span>
            </div>
          </NavLink>
        </nav>
      </div>
      <div class="flex items-center">
        <div class="flex items-center" style={{ marginRight: "16px" }}>
          <input
            class="m-2 px-2 rounded-2xl border text-gray-600"
            style={{
              width: "80%",
              borderColor: "#2C272E",
            }}
            type="text"
            value={customHooks.searchTag}
            onChange={(e) => {
              customHooks.setSearchTag(e.target.value);
            }}
          />
          <span style={{ width: "20%" }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="" />
          </span>
          <Avatar
            alt="Remy Sharp"
            src="img/duck_avatar.png"
            sx={{
              display: "flex",
              width: "24px",
              height: "24px",
              marginRight: "8px",
            }}
          />
          <span class="avatar__id" style={{ fontSize: "0.8rem" }}>
            <b>abcd1234</b>
          </span>
        </div>
        <button
          class="colorPicker__button rounded-xl border-2 border-white"
          style={{
            backgroundColor: `${customHooks.color}`,
          }}
          onClick={() => {
            customHooks.setColorPicker(!customHooks.colorPicker);
          }}
        ></button>
      </div>
      {showColorPicker}
    </div>
  );
};

export default Header;
