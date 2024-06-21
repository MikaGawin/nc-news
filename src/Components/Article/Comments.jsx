import { getComments } from "../../AxiosApi/axiosApi";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import NewCommentCard from "./NewCommentCard.jsx";

function Comments({ articleId, user, totalComments, setTotalComments }) {
  const [comments, setComments] = useState([]);
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [deleteIsProcessing, setDeleteIsProcessing] = useState(false);

  useEffect(() => {
    getComments(articleId).then(({ comments, commentCount }) => {
      setComments(comments);
      setTotalComments(commentCount);
      setPagesLoaded(pagesLoaded + 1);
    });
  }, []);
  const moreCommentsAvailable = comments.length < totalComments ? true : false;
  const LoadCommentsButtonClasses = moreCommentsAvailable
    ? "load-comment-button"
    : "load-comment-button disabled-button";

  function loadMoreComments() {
    if (moreCommentsAvailable) {
      const nextPage = pagesLoaded + 1;
      getComments(articleId, nextPage).then(({ comments, commentCount }) => {
        setComments((currentComments) => {
          return [...currentComments, ...comments];
        });
        setTotalComments(commentCount);
        setPagesLoaded(pagesLoaded + 1);
      });
    }
  }

  function removeComment(commentId) {
    if ((comments.length - 1) % 10 !== 0) {
      getComments(articleId, comments.length, 1).then(
        ({ comments, commentCount }) => {
          setComments((currentComments) => {
            return [...currentComments, ...comments].filter((comment) => {
              return comment.comment_id !== commentId;
            });
          });
          setTotalComments(commentCount - 1);
          setDeleteIsProcessing(false);
        }
      );
    } else {
      setComments((currentComments) => {
        return [...currentComments].filter((comment) => {
          return comment.comment_id !== commentId;
        });
      });
      setTotalComments((currentTotal) => {
        currentTotal - 1;
      });
      setDeleteIsProcessing(false);
    }
  }

  return (
    <>
      <h2>Comments</h2>
      <div className="comments">
        <NewCommentCard
          articleId={articleId}
          user={user}
          setComments={setComments}
          setTotalComments={setTotalComments}
        />
        {comments.map((comment) => {
          return (
            <CommentCard
              deleteIsProcessing={deleteIsProcessing}
              setDeleteIsProcessing={setDeleteIsProcessing}
              key={comment.comment_id}
              removeComment={removeComment}
              user={user}
              comment={comment}
            />
          );
        })}
      </div>
      <div id="comment-loader">
        <button
          onClick={loadMoreComments}
          className={LoadCommentsButtonClasses}
        >
          Load more
        </button>
      </div>
    </>
  );
}

export default Comments;
