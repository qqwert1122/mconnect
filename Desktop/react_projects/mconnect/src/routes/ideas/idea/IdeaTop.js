import "css/Animation.css";
import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faCheck,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTrashCan,
  faCopy,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { dbService } from "fbase";

const IdeaTop = ({
  user,
  isOwner,
  userIdea,
  navigate,
  setWhatEdit,
  isSelectMode,
  selectedIdeas,
  anchorEl,
  setAnchorEl,
  onSelectIdea,
  timeDisplay,
  setDeleteDialogOpen,
}) => {
  const open = Boolean(anchorEl);

  // handle ellipsis menu
  const handleEllipsisClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEllipsisClose = () => {
    setAnchorEl(null);
  };

  const onEditClick = () => {
    setAnchorEl(null);
    setWhatEdit(userIdea);
    navigate("/writingidea");
  };

  return (
    <div className="flex justify-between items-center ml-4">
      <div className="flex items-center gap-2">
        {/* {isSelectMode && (
          <button
            className={`rounded-full ${
              selectedIdeas.includes(userIdea)
                ? "bg-red-400 text-white"
                : "border-2 border-stone-400"
            } w-5 h-5`}
            onClick={() => {
              onSelectIdea(userIdea);
            }}
          >
            {selectedIdeas.includes(userIdea) && (
              <FontAwesomeIcon className="strech" icon={faCheck} />
            )}
          </button>
        )} */}
        <button
          className={`rounded-full ${
            selectedIdeas.includes(userIdea)
              ? "bg-red-400 text-white"
              : "border-2 border-stone-400"
          } ${
            isSelectMode ? "visible w-5 h-5" : "invisible w-0 h-0"
          } duration-100`}
          onClick={() => {
            onSelectIdea(userIdea);
          }}
        >
          {selectedIdeas.includes(userIdea) && (
            <FontAwesomeIcon className="strech" icon={faCheck} />
          )}
        </button>
        {/* avatar, name, time */}
        <Avatar
          className="border-2"
          alt="avatar"
          src={isOwner ? user.userPhotoURL : userIdea.userPhotoURL}
          sx={{
            display: "flex",
            width: "30px",
            height: "30px",
          }}
        />

        <div className="flex-col text-xs">
          <div className="flex items-center gap-1">
            <b>{isOwner ? user.userName : userIdea.userName}</b>
            {userIdea.isOfficial && (
              <span className="opacity-80">
                <VerifiedRoundedIcon color="primary" sx={{ fontSize: 16 }} />
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {timeDisplay(userIdea.createdAt)}
            {userIdea.isViewed === false && (
              <span className="animate-pulse w-2 h-2 bg-red-400 text-white rounded-full" />
            )}
          </div>
        </div>
      </div>
      {/* ellipsis */}
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleEllipsisClick}
        sx={{
          color: "inherit",
        }}
      >
        <FontAwesomeIcon icon={faEllipsis} size="lg" />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleEllipsisClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {isOwner && (
          <MenuItem onClick={onEditClick}>
            <FontAwesomeIcon icon={faPenToSquare} />
            &nbsp; 수정
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setDeleteDialogOpen(true);
            handleEllipsisClose();
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          &nbsp; 삭제
        </MenuItem>
        <MenuItem onClick={handleEllipsisClose}>
          <FontAwesomeIcon icon={faCopy} />
          &nbsp; 복사
        </MenuItem>
      </Menu>
    </div>
  );
};

export default IdeaTop;
