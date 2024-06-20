import { getComments } from "../../AxiosApi/axiosApi";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import NewCommentCard from "./NewCommentCard.jsx";

function Comments({ articleId, user}) {
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [pagesLoaded, setPagesLoaded] = useState(0);

  useEffect(() => {
    getComments(articleId).then(({ comments, commentCount }) => {
      setComments(comments);
      setTotalComments(commentCount);
      setPagesLoaded(pagesLoaded + 1);
    });
  }, []);
  const moreCommenntsAvailable = comments.length < totalComments ? true : false;
  const LoadCommentsButtonClasses = moreCommenntsAvailable
    ? "load-comment-button"
    : "load-comment-button disabled-button";

  function loadMoreComments() {
    if (moreCommenntsAvailable) {
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

  return (
    <>
      <h2>Comments</h2>
      <div className="comments">
      <NewCommentCard articleId={articleId} user={user} />
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
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
