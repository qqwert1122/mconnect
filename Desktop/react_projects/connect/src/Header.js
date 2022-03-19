import "./Header.css";
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
      class="h-28 w-32 rounded-bl-3xl inset-y-16"
      style={{
        position: "absolute",
        right: "0",
        display: `${customHooks.colorPickerDisplay}`,
        transition: "0.5s",
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
        <img class="h-16 mx-2" src="img/logo_connect_ver2.png" />
      </div>
      <div class="flex items-center">
        <div>User Info</div>
        <button
          class="mx-4 w-4 h-4 rounded-xl border-2 border-white"
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
