import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DeleteDialog = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  onDeleteClick,
}) => {
  const onCancleClick = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Dialog
      open={deleteDialogOpen}
      onClose={() => {
        setDeleteDialogOpen(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">알림🚨</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          삭제된 글은 복구되지 않습니다.
          <br />
          정말 글을 삭제하겠다면 '삭제'를 눌러주세요.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancleClick}>취소</Button>
        <Button onClick={onDeleteClick} autoFocus>
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
