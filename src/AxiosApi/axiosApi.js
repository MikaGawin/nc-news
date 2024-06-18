import axios from "axios";

const request = axios.create({
  baseURL: "https://news-server-2i86.onrender.com/API",
});

export function getArticles({order, sort_by}, page) {
  const queries = {params:{order, sort_by, p:page}}
  console.log("makingRequest")
  return request
    .get("/articles?limit=12",queries)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getArticle(articleId) {
  return request.get(`/articles/${articleId}`).then(({data}) => {
    return data
  })
  .catch((error) => {
    console.log(error)
  })
}