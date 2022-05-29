import ViewIdeaBottomBar from "./ViewIdeaBottomBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fbase";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faHashtag,
  faQuoteLeft,
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faPaperPlane,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
  faPenToSquare,
  faTrashCan,
  faCopy,
} from "@fortawesome/free-regular-svg-icons";

const ViewIdea = ({ customHooks }) => {
  const dbIdeas = customHooks.dbIdeas;
  const viewIdea = customHooks.viewIdea;
  const setViewIdea = customHooks.setViewIdea;
  const getCategory = customHooks.getCategory;
  let navigate = useNavigate();
  const user = authService.currentUser;
  const colorList = customHooks.colorList;
  const selectedIdeas = customHooks.selectedIdeas;
  const setSelectedIdeas = customHooks.setSelectedIdeas;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onBackClick = () => {
    navigate("/ideas", { replace: true });
  };
  // handle ellipsis menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ideas에서 인입된 거랑 , selectedIdeas에서 인입된 거랑 구분해서 back 버튼 클릭 시 다르게 보내줘야 함. 각자의 context를 props로 받아야 할듯?

  return (
    <div
      className="text-sm min-h-screen bg-stone-100"
      style={{ paddingBottom: "52px" }}
    >
      <div className="flex-col  bg-white shadow">
        <div className="p-3 flex justify-between items-center bg-white shadow">
          <button onClick={onBackClick}>
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
          {/* ellipsis */}
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              color: "inherit",
            }}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClose}>
              <FontAwesomeIcon icon={faPenToSquare} />
              &nbsp; 수정
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              &nbsp; 삭제
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <FontAwesomeIcon icon={faCopy} />
              &nbsp; 복사
            </MenuItem>
          </Menu>
        </div>
        {/*제목, 아바타, 시간 */}
        <div>
          {viewIdea.title === "" ? (
            <></>
          ) : (
            <div className="flex px-5 pt-5 font-black text-lg">
              <span>{viewIdea.title}</span>
            </div>
          )}
          <div
            className={`${
              viewIdea.title === "" ? "p-5" : "px-5 py-3 pb-5"
            } flex items-center gap-2`}
          >
            <Avatar
              alt="avatar"
              src={viewIdea.userPhotoURL}
              sx={{
                display: "flex",
                width: "30px",
                height: "30px",
              }}
            />
            <div className="flex-col text-xs">
              <span className="font-black flex">{viewIdea.userName}</span>
              <span className="flex">{viewIdea.createdAt}</span>
            </div>
          </div>
          <hr />

          <div className="flex p-5 text-base">
            <span>{viewIdea.text}</span>
          </div>
          {viewIdea.source && (
            <div className="flex items-center p-5 py-2 gap-2">
              <FontAwesomeIcon icon={faQuoteLeft} />
              <span>{viewIdea.source}</span>
            </div>
          )}
          {viewIdea.tags.length != 0 && (
            <div className="flex items-start p-5 pt-1 pb-4 gap-2">
              <span className="pt-1">
                <FontAwesomeIcon icon={faHashtag} />
              </span>
              <span className="flex flex-wrap">
                {viewIdea.tags.map((tag, index) => (
                  <button
                    key={index}
                    className="border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 text-xs shadow-sm duration-500 break-words bg-white"
                  >
                    {tag}
                  </button>
                ))}
              </span>
            </div>
          )}
        </div>

        <hr />
        <div className="flex items-center px-5 py-4 gap-4">
          <button className="text-red-500 px-2">
            <FontAwesomeIcon
              icon={viewIdea.like ? fasHeart : farHeart}
              size="lg"
            />
            <span className="absolute left-5 bottom-0 text-xs">
              {viewIdea.likeUsers.length != 0 && viewIdea.likeUsers.length}
            </span>
          </button>
          <button className="text-orange-400 px-2">
            <FontAwesomeIcon
              icon={viewIdea.bookmark ? fasBookmark : farBookmark}
              size="lg"
            />
          </button>
          <button className="text-sky-400 px-2">
            <FontAwesomeIcon
              icon={viewIdea.public ? fasCompass : farCompass}
              size="lg"
            />
          </button>
        </div>
      </div>
      <ViewIdeaBottomBar
        dbIdeas={dbIdeas}
        viewIdea={viewIdea}
        setViewIdea={setViewIdea}
        getCategory={getCategory}
        colorList={colorList}
        selectedIdeas={selectedIdeas}
        setSelectedIdeas={setSelectedIdeas}
      />
    </div>
  );
};

export default ViewIdea;
