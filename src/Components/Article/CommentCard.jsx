import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function CommentCard({ comment: { author, body, votes, created_at, author_avatar } }) {
  return <Card sx={{ }}>
    <CardHeader
      avatar={
        <Avatar sx={{}} className="avatar" src={author_avatar} aria-label="user avatar">
          R
        </Avatar>
      }
      title={author}
      subheader={<div className="comment-details">
      <p>"September 14, 2016"</p>
      <p>{votes} likes</p>
      </div>}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {body}
      </Typography>
    </CardContent>
  </Card>;
}

export default CommentCard;
