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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedIdeasState, isEditState, userState } from "atom";

const IdeaTop = ({
  isOwner,
  idea,
  navigate,
  isSelectMode,
  anchorEl,
  setAnchorEl,
  onSelectIdea,
  timeDisplay,
  setDeleteDialogOpen,
  initEditor,
  isItIn,
}) => {
  const loggedInUser = useRecoilValue(userState);
  const selectedIdeas = useRecoilValue(selectedIdeasState);
  const setIsEdit = useSetRecoilState(isEditState);

  const open = Boolean(anchorEl);
  const isChecked = isItIn(selectedIdeas, idea);

  // handle ellipsis menu
  const handleEllipsisClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEllipsisClose = () => {
    setAnchorEl(null);
  };

  const onEditClick = () => {
    setAnchorEl(null);
    setIsEdit(true);
    initEditor(idea);
    navigate("/writingidea");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const onPasteClick = () => {
    setAnchorEl(null);
    copyToClipboard(idea.text);
  };

  return (
    <div className="flex justify-between items-center ml-4">
      <div className="flex items-center">
        <button
          className={`rounded-full ${
            isChecked ? "bg-red-400 text-white" : "border-2 border-stone-400"
          } ${
            isSelectMode ? "visible w-5 h-5 mr-2" : "invisible w-0 h-0"
          } duration-100`}
          onClick={() => {
            onSelectIdea(idea);
          }}
        >
          {isChecked && <FontAwesomeIcon className="strech" icon={faCheck} />}
        </button>
        {/* avatar, name, time */}
        <Avatar
          className="border mr-1"
          alt="avatar"
          src={isOwner ? loggedInUser.userPhotoURL : idea.userPhotoURL}
          sx={{
            display: "flex",
            width: "30px",
            height: "30px",
          }}
        />

        <div className="flex-col text-xs">
          <div className="flex items-center">
            <b>{isOwner ? loggedInUser.userName : idea.userName}</b>
            {idea.isOfficial && (
              <span className="opacity-80">
                <VerifiedRoundedIcon color="primary" sx={{ fontSize: 16 }} />
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {timeDisplay(idea.createdAt)}
            {idea.isViewed === false && (
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
          <MenuItem sx={{ fontSize: "14px" }} onClick={onEditClick}>
            <FontAwesomeIcon icon={faPenToSquare} />
            &nbsp; 수정
          </MenuItem>
        )}
        <MenuItem
          sx={{ fontSize: "14px" }}
          onClick={() => {
            setDeleteDialogOpen(true);
            handleEllipsisClose();
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          &nbsp; 삭제
        </MenuItem>
        <MenuItem sx={{ fontSize: "14px" }} onClick={onPasteClick}>
          <FontAwesomeIcon icon={faCopy} />
          &nbsp; 복사
        </MenuItem>
      </Menu>
    </div>
  );
};

export default IdeaTop;
