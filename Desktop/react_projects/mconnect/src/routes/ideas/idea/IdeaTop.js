import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  faTrashCan,
  faCopy,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

const IdeaTop = ({
  user,
  dbIdea,
  setNavValue,
  setUserContext,
  setViewIdea,
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
    setUserContext(1);
    setViewIdea(dbIdea);
    setNavValue("/writingidea");
  };

  return (
    <div className="flex justify-between items-center ml-4">
      {/* avatar, name, time */}
      <div className="flex items-center gap-2">
        {isSelectMode && (
          <button
            className={`rounded-full ${
              selectedIdeas.includes(dbIdea)
                ? "bg-red-400 text-white"
                : "border-2 border-stone-400"
            } w-6 h-6`}
            onClick={() => {
              onSelectIdea(dbIdea);
            }}
          >
            {selectedIdeas.includes(dbIdea) ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <></>
            )}
          </button>
        )}
        <Avatar
          alt="avatar"
          src={dbIdea.userPhotoURL}
          sx={{
            display: "flex",
            width: "30px",
            height: "30px",
          }}
        />
        <div className="flex-col text-xs">
          <div className="flex gap-1">
            <b>{dbIdea.userName}</b>
          </div>
          <div className="flex items-center gap-2">
            {timeDisplay(dbIdea.createdAt)}
            {dbIdea.isClicked ||
            dayjs().diff(dayjs(dbIdea.createdAt), "day") > 3 ? (
              <></>
            ) : (
              <span className="w-2 h-2 bg-red-400 text-white rounded-full" />
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
        {user.userId === dbIdea.userId && (
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
