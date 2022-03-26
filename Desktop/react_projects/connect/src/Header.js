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
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

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
      class="header flex justify-between items-center"
      style={{
        color: `${customHooks.textColor}`,
        backgroundColor: `${customHooks.color}`,
      }}
    >
      <div class="flex items-center">
        {/* <img class="h-12 mx-6" src="img/logo_connect_ver2.png" /> */}
        <span
          class="app__logo mx-6"
          style={{
            fontSize: "2rem",
            fontWeight: "900",
          }}
        >
          <b>App Logo</b>
        </span>
        <nav>
          <ul
            style={{
              display: "flex",
              fontSize: "1.5rem",
              marginLeft: "3rem",
            }}
          >
            <li>
              <a class="nav__a mx-6" href="#">
                Home
              </a>
            </li>
            <li>
              <a class="nav__a mx-6" href="#">
                Private
              </a>
            </li>
            <li>
              <a class="nav__a mx-6" href="#">
                Public
              </a>
            </li>
            <li>
              <a class="nav__a mx-6" href="#">
                Lab
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="flex items-center">
        <div class="flex items-center" style={{ marginRight: "16px" }}>
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
