import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from '@mui/icons-material/Send';

function NewCommentCard({ user: { username, avatar_url: userAvatar } }) {
  const [postError, setPostError] = useState(false);
  const [commentIsProcessing, setCommentIsProcessing] = useState(false)

  const handleClose = () => {
    setPostError(false);
  };

  function handleSubmit() {
  }

  return (
    <>
    <Card className="comment-card" sx={{}}>
      <CardHeader
        avatar={
          <Avatar
            sx={{}}
            className="avatar"
            src={userAvatar}
            aria-label="user avatar"
          >
            R
          </Avatar>
        }
        title={username}
        subheader={
          <form>
            <input>
            </input>
              <button value={1} onClick={handleSubmit}>
              {commentIsProcessing === true ? (
                  <CircularProgress size={20} />
                ): (
                  <SendIcon sx={{ fontSize: 20 }} color="primary" />
                )}
              </button>
          </form>
        }
        />
    </Card >
    <Snackbar
                id="vote-error"
                open={postError}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Something went wrong"
              />
    </>
  );
}

export default NewCommentCard;
