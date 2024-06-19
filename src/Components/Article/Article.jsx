import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { extractTime, displayDate } from "../../utils/formatTime";
import "./Article.modules.css";
import Comments from "./Comments";
import { getArticle, patchArticleVotes } from "../../AxiosApi/axiosApi";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar } from "@mui/material";

function Article() {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState({});
  const [hasLiked, setHasLiked] = useState(0);
  const [likeIsProcessing, setLikeIsProcessing] = useState(0);
  const [voteError, setVoteError] = useState(false);

  const handleClose = () => {
    setVoteError(false);
  };

  useEffect(() => {
    getArticle(article_id).then(({ article }) => {
      setArticleData(article);
    });
  }, []);

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
      patchArticleVotes(article_id, voteChange)
        .then((article) => {
          if (article === "request failed") {
            setLikeIsProcessing(0);
            setVoteError(true);
          } else {
            setHasLiked((currentValue) => {
              return currentValue + voteChange;
            });
            setArticleData((currentValue)=> {
                const newVotes = currentValue.votes + voteChange
                return {...currentValue, votes:newVotes}
            })
            setLikeIsProcessing(0);
          }
        })
        .catch((error) => {
          setLikeIsProcessing(0);
          setVoteError(true);
        });
    }
  }

  const {
    title,
    topic,
    author,
    body,
    created_at: dateString,
    votes,
    comment_count: commentsCount,
    article_img_url: articleImage,
  } = articleData;
  const date = displayDate(extractTime(dateString));
  return (
    <div className="article">
      <header>
        <h1>{title}</h1>
        <h2>{author}</h2>
        <h3>{date}</h3>
        <h4>{topic}</h4>
        <h5>
          Likes: {votes} comments: {commentsCount}
        </h5>
        <Snackbar
          id="vote-error"
          open={voteError}
          autoHideDuration={6000}
          onClose={handleClose}
          message="I love snacks"
        />
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
      </header>
      <section>
        <img src={articleImage} />
        <p>{body}</p>
      </section>
      <section>
        <Comments articleId={article_id} />
      </section>
    </div>
  );
}

export default Article;
