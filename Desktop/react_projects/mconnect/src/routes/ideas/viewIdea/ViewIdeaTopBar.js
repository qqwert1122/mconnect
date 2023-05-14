import DeleteDialog from "../idea/DeleteDialog";
import { useState } from "react";
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
import { useSetRecoilState } from "recoil";
import { isEditState } from "atom";

const ViewIdeaTopBar = ({
  content,
  isOwner,
  navigate,
  initEditor,
  onDeleteClick,
  toastAlarm,
}) => {
  const setIsEdit = useSetRecoilState(isEditState);

  const onBackClick = () => {
    navigate(-1);
  };

  const onEditClick = () => {
    setAnchorEl(null);
    setIsEdit(true);
    initEditor(content);
    navigate("/writingidea");
  };

  const _onDeleteClick = () => {
    setDeleteDialogOpen(false);
    setAnchorEl(null);
    onDeleteClick(content);
    toastAlarm("delete");
    navigate(-1);
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
          <MenuItem sx={{ fontSize: "14px" }} onClick={onEditClick}>
            <FontAwesomeIcon icon={faPenToSquare} />
            &nbsp; 수정
          </MenuItem>
        )}
        <MenuItem sx={{ fontSize: "14px" }} onClick={onDeleteMenuItemClick}>
          <FontAwesomeIcon icon={faTrashCan} />
          &nbsp; 삭제
        </MenuItem>
        <MenuItem sx={{ fontSize: "14px" }} onClick={handleEllipsisClose}>
          <FontAwesomeIcon icon={faCopy} />
          &nbsp; 복사
        </MenuItem>
      </Menu>
      <DeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        onDeleteClick={_onDeleteClick}
        idea={content}
      />
    </div>
  );
};

export default ViewIdeaTopBar;
