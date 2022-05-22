import "css/Idea.css";
import Avatar from "@mui/material/Avatar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useLongPress } from "use-long-press";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
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
  faT,
  faDiceD6,
  faSquare,
  faMinus,
  faCertificate,
  faStarOfLife,
  faEye,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTrashCan,
  faCompass as farCompass,
  faHeart as farHeart,
  faBookmark as farBookmark,
  faCopy,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

const Idea = ({
  user,
  dbIdea,
  customHooks,
  onIdeaSelect,
  selectedIdeas,
  isSelectMode,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  let navigate = useNavigate();

  const onCancleClick = () => {
    setDeleteDialogOpen(false);
  };
  const onDeleteClick = async () => {
    setDeleteDialogOpen(false);
    setAnchorEl(null);
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    await deleteDoc(ideaRef);
  };
  const onLikeClick = async () => {
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    await updateDoc(ideaRef, {
      like: !dbIdea.like,
      likeUsers: [],
    });
  };
  const onBookmarkClick = async () => {
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    await updateDoc(ideaRef, { bookmark: !dbIdea.bookmark });
  };
  const onPublicClick = async () => {
    const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
    await updateDoc(ideaRef, { public: !dbIdea.public });
  };
  const onViewIdeaClick = async (dbIdea) => {
    if (dbIdea.isClicked == false) {
      const ideaRef = doc(dbService, "ideas", `${dbIdea.id}`);
      await updateDoc(ideaRef, { isClicked: true });
    }
    customHooks.setViewIdea(dbIdea);
    navigate("/ideas/viewidea", { replace: true });
  };
  // handle ellipsis menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const bind = useLongPress(() => {
    onIdeaSelect(dbIdea);
  });
  const setCategory = (dbIdea) => {
    switch (dbIdea.category) {
      case 3:
        return {
          icon: <FontAwesomeIcon icon={faDiceD6} />,
          label: "상자",
        };
      case 2:
        return {
          icon: <FontAwesomeIcon icon={faSquare} size="sm" />,
          label: "면",
        };
      case 1:
        return {
          icon: <FontAwesomeIcon icon={faMinus} />,
          label: "선",
        };
      default:
        return {
          icon: <FontAwesomeIcon icon={faCircle} size="xs" />,
          label: "점",
        };
    }
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
        <DialogTitle id="alert-dialog-title">{"알림🚨"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            지운 글은 복구할 수 없습니다.
            <br />
            글을 지우겠다면 '삭제'를 눌러주세요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancleClick}>취소</Button>
          <Button onClick={onDeleteClick} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <div className="duration-500 bg-white">
      <hr />
      <div className="mt-4 opacity text-sm ">
        <div className="flex justify-between items-center ml-4">
          {/* avatar, name, time */}
          <div className="flex items-center gap-2">
            {isSelectMode && (
              <button
                className={`opacity rounded-full ${
                  selectedIdeas.includes(dbIdea)
                    ? "bg-red-400 text-white"
                    : "border-2 border-stone-400"
                } w-6 h-6`}
                onClick={() => {
                  onIdeaSelect(dbIdea);
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
                {customHooks.timeDisplay(dbIdea.createdAt)}
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
            onClick={handleClick}
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
            {user.uid === dbIdea.userId && (
              <MenuItem onClick={handleClose}>
                <FontAwesomeIcon icon={faPenToSquare} />
                &nbsp; 수정
              </MenuItem>
            )}
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
        <div
          className="box-border mx-4 mt-4 mb-4 duration-200"
          onClick={() => {
            onViewIdeaClick(dbIdea);
          }}
          {...bind()}
        >
          {dbIdea.title === "" ? (
            <></>
          ) : (
            <div className="flex items-center pb-2 w-full font-black">
              {dbIdea.title}
            </div>
          )}
          <div className="flex items-center pb-5">
            <div className="w-full break-all">
              {dbIdea.text.length > 200 ? (
                <>
                  {dbIdea.text.substr(0, 200)}
                  <span> ... </span>
                  <button className="font-black underline">더보기</button>
                </>
              ) : (
                dbIdea.text
              )}
            </div>
          </div>
          {/* source */}
          {dbIdea.source === "" ? (
            <></>
          ) : (
            <div className="flex items-center ml-2 pb-2 text-xs text-stone-500">
              <FontAwesomeIcon icon={faQuoteLeft} />
              <div className="mx-2 w-full  ">{dbIdea.source}</div>
            </div>
          )}
          {/* category, tags */}
          <span className="flex flex-wrap text-xs">
            <span className="border-box rounded-3xl border-2 mr-1 mb-1 px-3 py-1 shadow-sm duration-500">
              {setCategory(dbIdea).icon}&nbsp;{setCategory(dbIdea).label}
            </span>
            {dbIdea.tags.length > 4 ? (
              <>
                {dbIdea.tags
                  .filter((tag, index) => index < 4)
                  .map((tag, index) => (
                    <span
                      key={index}
                      className="mr-1 mb-1 border-box rounded-3xl border-2 px-3 py-1 shadow-sm duration-500"
                    >
                      {tag}
                    </span>
                  ))}
                <span className="mr-1 mb-1 border-box rounded-3xl border-2 px-3 py-1 shadow-sm duration-500">
                  ...
                </span>
              </>
            ) : (
              <>
                {dbIdea.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="mr-1 mb-1 border-box rounded-3xl border-2 px-3 py-1 shadow-sm duration-500"
                  >
                    {tag}
                  </span>
                ))}
              </>
            )}
          </span>
        </div>
        {/* like, bookmark, ellipsis */}
        <hr />

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          className="flex justify-around items-center py-2"
        >
          <button
            className="text-red-500 text-center w-full"
            onClick={onLikeClick}
          >
            <FontAwesomeIcon
              icon={dbIdea.like ? fasHeart : farHeart}
              size="xl"
            />
            <span className="absolute left-5 bottom-0 text-xs">
              {dbIdea.likeUsers.length != 0 && dbIdea.likeUsers.length}
            </span>
          </button>
          <button
            className=" text-orange-400 text-center w-full"
            onClick={onBookmarkClick}
          >
            <FontAwesomeIcon
              icon={dbIdea.bookmark ? fasBookmark : farBookmark}
              size="xl"
            />
          </button>
          <button
            className="text-sky-400 text-center w-full"
            onClick={onPublicClick}
          >
            <FontAwesomeIcon
              icon={dbIdea.public ? fasCompass : farCompass}
              size="xl"
            />
          </button>
        </Stack>
      </div>
      <hr />
      {deleteDialog}
    </div>
  );
};

export default Idea;
