import "css/Idea.css";
import Avatar from "@mui/material/Avatar";
import React, { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faQuoteLeft,
  faHashtag,
  faCircleCheck,
  faCompass as fasCompass,
  faHeart as fasHeart,
  faBookmark as fasBookmark,
  faEllipsis,
  faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTrashCan,
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
  faCopy,
} from "@fortawesome/free-regular-svg-icons";

const Idea = ({ dbIdea, customHooks, onIdeasClick, selectedIdeas }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const onDeleteClick = async () => {
    setDeleteDialogOpen(false);
    setAnchorEl(null);
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    await deleteDoc(ideaRef);
  };

  // handle ellipsis menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteDialog = (
    <div>
      {/* 삭제 버튼 누르면 나오는 대화상자 */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"삭제 알림"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              fontSize: "12px",
            }}
          >
            정말 글을 지우시겠다면 '삭제'를 눌러주세요.
            <br />
            삭제된 글은 한 달간 휴지통에 보관됩니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
            }}
            style={{
              fontSize: "12px",
            }}
          >
            취소
          </Button>
          <Button
            onClick={onDeleteClick}
            autoFocus
            style={{
              fontSize: "12px",
            }}
          >
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <div>
      <hr />
      <div className="mt-5 mb-5">
        <div className="flex justify-between items-center mx-4 mt-2">
          <div className="flex items-end">
            <div className="flex mx-3">
              <Avatar
                alt="avatar"
                src={dbIdea.userPhotoURL}
                sx={{
                  display: "flex",
                  width: "35px",
                  height: "35px",
                }}
              />
            </div>
            <h2>
              <b>{dbIdea.userName}</b>
            </h2>
          </div>
          {/* time */}
          <div className="mx-3">
            <div className="flex items-center gap-2">
              {dbIdea.isClicked ? (
                <></>
              ) : (
                <span className="w-2 h-2 bg-red-400 text-white rounded-full" />
              )}
              <span className="text-sm">
                {customHooks.timeDisplay(dbIdea.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`box-border shadow-xl m-4 p-5 rounded-2xl duration-500 ${
            selectedIdeas.includes(dbIdea)
              ? "bg-stone-500 text-stone-300"
              : "bg-stone-100"
          }`}
          onClick={() => {
            onIdeasClick(dbIdea);
          }}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCircle} size="xs" />
            <div className="mx-3 w-full">
              {dbIdea.text.length > 200 ? (
                <>
                  {dbIdea.text.substr(0, 200)}
                  <span>...</span>
                  <button className="font-black underline">더보기</button>
                </>
              ) : (
                dbIdea.text
              )}
            </div>
          </div>
          {dbIdea.source === "" ? (
            <></>
          ) : (
            <div className="flex items-center pt-3 pb-1">
              <FontAwesomeIcon icon={faQuoteLeft} />
              <div className="mx-3 w-full text-sm ">{dbIdea.source}</div>
            </div>
          )}
          {dbIdea.tags.length === 0 ? (
            <></>
          ) : (
            <div className="flex items-center ">
              <FontAwesomeIcon icon={faHashtag} />
              <div className="mx-3 w-full text-sm ">{dbIdea.tags}</div>
            </div>
          )}
        </div>
        {/* like, bookmark, ellipsis */}
        <div className="flex justify-between items-center mx-6 my-4">
          <div className="flex mx-3 gap-4">
            <button className="text-xl text-red-500">
              <FontAwesomeIcon icon={dbIdea.like ? fasHeart : farHeart} />
            </button>
            <button className="text-xl text-orange-400">
              <FontAwesomeIcon
                icon={dbIdea.bookmark ? fasBookmark : farBookmark}
              />
            </button>
            <button className="text-xl text-sky-400">
              <FontAwesomeIcon icon={dbIdea.public ? fasCompass : farCompass} />
            </button>
          </div>
          <div className="flex gap-4">
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
              <FontAwesomeIcon icon={faEllipsis} size="xl" />
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
              <MenuItem
                onClick={() => {
                  setDeleteDialogOpen(true);
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
        </div>
      </div>
      {deleteDialog}
    </div>
  );
};

export default Idea;
