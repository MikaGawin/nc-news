import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from '@mui/icons-material/Send';
import { postComment } from "../../AxiosApi/axiosApi";
import TextareaAutosize from "react-textarea-autosize"

function NewCommentCard({ setComments, setTotalComments, articleId, user: { username, avatar_url: userAvatar } }) {
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
      const newComment = {username, body:commentInput}
      postComment(articleId, newComment).then(({comment}) => {
        setCommentInput("")
        setCommentIsProcessing(false)
        setTotalComments((currentTotal)=>{
          return currentTotal+1
        })
        setComments((currentComments)=>{
          const commentsToDisplay = [...currentComments]
          if (commentsToDisplay.length % 10 === 0){
            commentsToDisplay.pop()
          }
          commentsToDisplay.unshift({...comment, author_avatar: userAvatar})
          return commentsToDisplay
        })
      })
      .catch((error)=>{
        console.log(error)
        setCommentIsProcessing(false)
        setPostError(true)
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
            <TextareaAutosize placeholder="Write a comment..." value={commentInput} maxLength="1000" onChange={handleCommentInput} minRows="2" id="new-comment-input"/>
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
