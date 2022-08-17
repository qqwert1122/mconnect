import DeleteDialog from "../idea/DeleteDialog";
import { useState } from "react";
import { dbService } from "fbase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPenToSquare,
  faTrashCan,
  faCopy,
} from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue } from "recoil";
import { whatViewState } from "atom";

const ViewIdeaTopBar = ({
  user,
  isOwner,
  navigate,
  initEditor,
  onBackClick,
}) => {
  const whatView = useRecoilValue(whatViewState);

  const onEditClick = () => {
    setAnchorEl(null);
    initEditor(whatView);
    navigate("/writingidea");
  };

  const onDeleteClick = async () => {
    setDeleteDialogOpen(false);
    setAnchorEl(null);
    const userIdeaRef = doc(
      dbService,
      "users",
      user.userId,
      "userIdeas",
      whatView.id
    );
    await updateDoc(userIdeaRef, {
      isDeleted: true,
    });
    const userRef = doc(dbService, "users", user.userId);
    await updateDoc(userRef, {
      idea_count: increment(-1),
    });
    const countRef = doc(dbService, "counts", whatView.id);
    const countData = (await getDoc(countRef)).data();
    if (isOwner === false) {
      delete countData.bookmark_users[user.userId];
      await updateDoc(countRef, {
        bookmark_count: increment(-1),
        bookmark_users: countData.bookmark_users,
      });
    }
    navigate("/ideas");
  };

  // Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const open = Boolean(anchorEl);

  const onDeleteMenuItemClick = () => {
    setDeleteDialogOpen(true);
    handleEllipsisClose();
  };

  const handleEllipsisClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEllipsisClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="fixed top-0 z-10 w-full p-3 flex justify-between items-center shadow bg-white">
      <button onClick={onBackClick}>
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </button>
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
        <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
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
        <MenuItem onClick={onDeleteMenuItemClick}>
          <FontAwesomeIcon icon={faTrashCan} />
          &nbsp; 삭제
        </MenuItem>
        <MenuItem onClick={handleEllipsisClose}>
          <FontAwesomeIcon icon={faCopy} />
          &nbsp; 복사
        </MenuItem>
      </Menu>
      <DeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        onDeleteClick={onDeleteClick}
      />
    </div>
  );
};

export default ViewIdeaTopBar;
