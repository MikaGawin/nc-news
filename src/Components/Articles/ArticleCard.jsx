import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


import { extractTime, displayDate } from '../../utils/formatTime';

export default function ArticleCard({article}) {
  const articleCreatedDate = displayDate(extractTime(article.created_at))

  return (
    <Card className="articleCard" sx={{}}>
      <CardHeader
        avatar={
          <Avatar sx={{ }} src={article.author_avatar} aria-label="user avatar">
            A
          </Avatar>
        }
        title={article.title}
        subheader={`${article.author}
        ${articleCreatedDate}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={article.article_img_url}
        alt={`${article.title} picture`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {article.sample_body + "..."}
        </Typography>
      </CardContent>
      <CardContent className="comments-and-likes">
        <Typography variant="caption">
            {article.votes} upvotes
        </Typography>

        <Typography className="comment-count" variant="caption">
            {article.comment_count} comments
        </Typography>
      </CardContent>
    </Card>
  );
}