import axios from "axios";

const request = axios.create({
  baseURL: "https://news-server-2i86.onrender.com/API",
});

export function getArticles({ order, sort_by }, page) {
  const queries = { params: { order, sort_by, p: page } };
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

export function getComments(articleId, page) {
  const queries = { params: { p: page } };
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
    })
    .catch((error) => {
      return "request failed";
    });
}

export function patchCommentVotes(commentId, increment) {
  return request
    .patch(`/comments/${commentId}`, { inc_votes: "increment" })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return "request failed";
    });
}
