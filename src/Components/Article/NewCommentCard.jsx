import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from '@mui/icons-material/Send';
import { postComment } from "../../AxiosApi/axiosApi";
import TextareaAutosize from 'react-textarea-autosize';

function NewCommentCard({ articleId, user: { username, avatar_url: userAvatar } }) {
  const [commentInput, setCommentInput] = useState("")

  const [postError, setPostError] = useState(false);
  const [commentIsProcessing, setCommentIsProcessing] = useState(false)


  function handleClose() {
    setPostError(false);
  };

  function handleCommentInput(event) {
    setCommentInput(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if(commentInput.length > 0){
      setCommentIsProcessing(true)
      const comment = {username, body:commentInput}
      postComment(articleId, comment).then((returnedComment) => {
        setCommentInput("")
        setCommentIsProcessing(false)
        console.log(returnedComment)
      })
    }
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
          <form id="new-comment" onSubmit={handleSubmit}>
            <TextareaAutosize placeholder="Write a comment..." value={commentInput} maxlength={1000} onChange={handleCommentInput} minRows="2" id="new-comment-input"/>
              <button className={(commentIsProcessing || !commentInput)? "disabled-comment-button" : ""} >
              {commentIsProcessing === true ? (
                  <CircularProgress size={20} />
                ): (
                  <SendIcon sx={{ fontSize: 20 }} color={commentInput? "primary" : ""} />
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
