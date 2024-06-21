import axios from "axios";

const request = axios.create({
  baseURL: "https://news-server-2i86.onrender.com/API",
});

export function getTopics() {
  return request
    .get("/topics/")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getArticles({ order, sort_by }, page, topic) {
  const queries = { params: { order, sort_by, p: page, topic } };
  return request
    .get("/articles?limit=12", queries)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getArticle(articleId) {
  return request
    .get(`/articles/${articleId}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getComments(articleId, page, limit) {
  const queries = { params: { p: page, limit } };
  return request
    .get(`/articles/${articleId}/comments`, queries)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function patchArticleVotes(articleId, increment) {
  return request
    .patch(`/articles/${articleId}`, { inc_votes: increment })
    .then(({ data }) => {
      return data;
    });
}

export function patchCommentVotes(commentId, increment) {
  return request
    .patch(`/comments/${commentId}`, { inc_votes: increment })
    .then(({ data }) => {
      return data;
    });
}

export function postComment(articleId, comment) {
  return request
    .post(`/articles/${articleId}/comments`, comment)
    .then(({ data }) => {
      return data;
    });
}

export function deleteComment(commentId) {
  return request
    .delete(`/comments/${commentId}`)
    .then((response) => {
    })
    .catch((error) => {
      return error;
    });
}
