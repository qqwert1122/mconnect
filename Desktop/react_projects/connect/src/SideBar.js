import "./Main.css";
import "./SideBar.css";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch,
  faCodeFork,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ customHooks }) => {
  const menuColor = () => {
    const hexColor = customHooks.color;
    const c = hexColor.substring(1); // 색상 앞의 # 제거
    const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
    const r = (rgb >> 16) & 0xff; // red 추출
    const g = (rgb >> 8) & 0xff; // green 추출
    const b = (rgb >> 0) & 0xff; // blue 추출
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    // 색상 선택
    return luma < 235 ? customHooks.color : "#2C272E";
  };

  const menuTextColor = () => {
    const hexColor = customHooks.color;
    const c = hexColor.substring(1); // 색상 앞의 # 제거
    const rgb = parseInt(c, 16); // rrggbb를 10진수로 변환
    const r = (rgb >> 16) & 0xff; // red 추출
    const g = (rgb >> 8) & 0xff; // green 추출
    const b = (rgb >> 0) & 0xff; // blue 추출
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    // 색상 선택
    return luma < 235 ? customHooks.textColor : "#EEEEEE";
  };

  const infoMode = <></>;

  const branchMode = <></>;

  const layerGroupMode = <></>;

  return (
    <div
      class="sidebar borderShadow flex-col mx-5 rounded-t-3xl"
      style={{
        color: `${customHooks.color}`,
      }}
    >
      {/* 메뉴 layout */}
      <div
        class="borderShadow flex justify-center items-center m-2 p-2 rounded-t-3xl rounded-b-lg"
        style={{
          height: "8%",
          color: `${menuTextColor()}`,
          backgroundColor: `${menuColor()}`,
          transition: "0.5s",
        }}
      >
        {/* branch 메뉴 */}
        <button class="w-1/2">
          <FontAwesomeIcon icon={faCodeBranch} />
        </button>
        <p>|</p>
        {/* layer-group 메뉴 */}
        <button class="w-1/2 ">
          <FontAwesomeIcon icon={faLayerGroup} />
        </button>
      </div>

      {/* selected posts */}
      <div
        class="flex-col flex-wrap justify-center items-center"
        style={{
          height: "92%",
          maxHeight: "calc(100vh - 140px)",
          overflow: "auto",
        }}
      >
        <div>
          {customHooks.posts
            .filter((fPost) =>
              customHooks.selectedPostIds.includes(fPost.postId)
            )
            .map((mPost) => (
              <div>
                <button
                  class="borderShadow flex-col justify-center text-left mt-2  mx-2 p-2 px-4 rounded-3xl"
                  style={{
                    width: "230px",
                    borderColor: "#2C272E",
                    color: "#2C272E",
                    backgroundColor: "#EEEEEE",
                    transition: "0.5s",
                    fontSize: "12px",
                    wordBreak: "break-all",
                  }}
                  onClick={() => {
                    customHooks.setSelectedPostIds(
                      customHooks.selectedPostIds.filter(
                        (fPostId) => fPostId != mPost.postId
                      )
                    );
                  }}
                >
                  {/* text */}
                  <div
                    class="flex w-full text-left"
                    style={{
                      wordBreak: "break-all",
                    }}
                  >
                    {mPost.text}
                  </div>
                  {/* tags */}
                  <div
                    class="flex flex-wrap justify-start"
                    style={{
                      wordBreak: "break-all",
                    }}
                  >
                    {mPost.tags.map((mTag, mIndex) => (
                      <div
                        class="mr-1 mt-1 px-1 rounded-2xl"
                        style={{
                          fontSize: "10px",
                          backgroundColor: "#2C272E",
                          color: "#EEEEEE",
                          transition: "0.5s",
                        }}
                      >
                        {mTag}
                      </div>
                    ))}
                  </div>
                </button>
              </div>
            ))}
        </div>
      </div>
      {customHooks.selectedPostIds.length <= 1 ? (
        <div></div>
      ) : (
        <div
          class="fixed borderShadow flex justify-center items-center m-2 p-2 rounded-t-lg rounded-b-lg"
          style={{
            right: "0",
            bottom: "0",
            color: `${menuTextColor()}`,
            backgroundColor: `${menuColor()}`,
            transition: "0.5s",
          }}
        >
          <button
            onClick={() => {
              // selected Posts 중 가장 상위 category를 가져옴.
              customHooks.setFormMode(!customHooks.formMode);
            }}
          >
            <Tooltip title="Connect Memos">
              <IconButton
                style={{
                  color: "white",
                  height: "20px",
                  fontSize: "16px",
                }}
              >
                <FontAwesomeIcon icon={faCodeFork} />
              </IconButton>
            </Tooltip>
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
