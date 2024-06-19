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
import { patchCommentVotes } from "../../AxiosApi/axiosApi";

function CommentCard({
  comment: { comment_id, author, body, votes, created_at, author_avatar },
}) {
  const [commentVotes, setCommentVotes] = useState(votes);
  const [hasLiked, setHasLiked] = useState(0);
  const [likeIsProcessing, setLikeIsProcessing] = useState(0);
  const [voteError, setVoteError] = useState(false);

  const handleClose = () => {
    setVoteError(false);
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
          if (article === "request failed") {
            setLikeIsProcessing(0);
            setVoteError(true);
          } else {
            setHasLiked((currentValue) => {
              return currentValue + voteChange;
            });
            setCommentVotes((currentValue) => {
              return currentValue + voteChange;
            });
            setLikeIsProcessing(0);
          }
        })
        .catch((error) => {
          setLikeIsProcessing(0);
          setVoteError(true);
        });
    }
  }

  return (
    <Card sx={{}}>
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
            <p>"September 14, 2016"</p>
            <div>
              <p>{commentVotes} likes</p>
              <button value={1} onClick={handleLike}>
                {likeIsProcessing === 1 ? (
                  <CircularProgress size={25} />
                ) : hasLiked === 1 ? (
                  <ThumbUpAltIcon sx={{ fontSize: 25 }} color="primary" />
                ) : (
                  <ThumbUpOffAltIcon sx={{ fontSize: 25 }} />
                )}
              </button>
              <button value={-1} onClick={handleLike}>
                {likeIsProcessing === -1 ? (
                  <CircularProgress size={25} />
                ) : hasLiked === -1 ? (
                  <ThumbDownAltIcon sx={{ fontSize: 25 }} color="primary" />
                ) : (
                  <ThumbDownOffAltIcon sx={{ fontSize: 25 }} />
                )}
              </button>
              <Snackbar
                id="vote-error"
                open={voteError}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Something went wrong"
              />
            </div>
          </div>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CommentCard;
