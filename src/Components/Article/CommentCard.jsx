import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar } from "@mui/material";
import { patchCommentVotes, deleteComment } from "../../AxiosApi/axiosApi";
import { displayTimeSince } from "../../utils/formatTime";
import DeleteIcon from "@mui/icons-material/Delete";

function CommentCard({
  user,
  removeComment,
  comment: { comment_id, author, body, votes, created_at, author_avatar },
}) {
  const [commentVotes, setCommentVotes] = useState(votes);
  const [hasLiked, setHasLiked] = useState(0);
  const [likeIsProcessing, setLikeIsProcessing] = useState(0);
  const [errorMessage, setErrorMessage] = useState("something went wrong");
  const [isError, setError] = useState(false);
  const writtenByUser = user.username === author;

  const handleClose = () => {
    setError(false);
  };

  function handleLike(event) {
    const voteValue = Number(event.currentTarget.value);
    if (likeIsProcessing === 0) {
      setLikeIsProcessing(voteValue);
      let voteChange;
      if (voteValue === hasLiked) {
        voteChange = -voteValue;
      } else if (hasLiked === 0) {
        voteChange = voteValue;
      } else if (hasLiked === -voteValue) {
        voteChange = voteValue * 2;
      }
      patchCommentVotes(comment_id, voteChange)
        .then((article) => {
          setHasLiked((currentValue) => {
            return currentValue + voteChange;
          });
          setCommentVotes((currentValue) => {
            return currentValue + voteChange;
          });
          setLikeIsProcessing(0);
        })
        .catch((error) => {
          setLikeIsProcessing(0);
          setErrorMessage("something went wrong");
          setError(true);
        });
    }
  }

  function handleDeleteComment() {
    deleteComment(comment_id).then((error) => {
      if (error) {
        if (error === "Id not found") {
          setErrorMessage("Comment not found");
        }
        setError(true);
      } else {
        removeComment(comment_id);
      }
    });
  }

  return (
    <>
      <Card className="comment-card" sx={{}}>
        <CardHeader
          avatar={
            <Avatar
              sx={{}}
              className="avatar"
              src={author_avatar}
              aria-label="user avatar"
            >
              R
            </Avatar>
          }
          title={author}
          subheader={
            <div className="comment-details">
              <p>{displayTimeSince(created_at)}</p>
              <div>
                <p>{commentVotes} likes</p>
                {writtenByUser ? (
                  <button
                    onClick={handleDeleteComment}
                    id="delete-comment-button"
                  >
                    <DeleteIcon sx={{ fontSize: 20 }} />
                  </button>
                ) : (
                  <>
                    {" "}
                    <button value={1} onClick={handleLike}>
                      {likeIsProcessing === 1 ? (
                        <CircularProgress size={20} />
                      ) : hasLiked === 1 ? (
                        <ThumbUpAltIcon sx={{ fontSize: 20 }} color="primary" />
                      ) : (
                        <ThumbUpOffAltIcon sx={{ fontSize: 20 }} />
                      )}
                    </button>
                    <button value={-1} onClick={handleLike}>
                      {likeIsProcessing === -1 ? (
                        <CircularProgress size={20} />
                      ) : hasLiked === -1 ? (
                        <ThumbDownAltIcon
                          sx={{ fontSize: 20 }}
                          color="primary"
                        />
                      ) : (
                        <ThumbDownOffAltIcon sx={{ fontSize: 20 }} />
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </CardContent>
      </Card>{" "}
      <Snackbar
        id="vote-error"
        open={isError}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
      />
    </>
  );
}

export default CommentCard;
