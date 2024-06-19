import { useEffect, useState } from "react";
import { getArticles } from "../../AxiosApi/axiosApi";
import "./Articles.modules.css";
import sortOptions from "../../utils/__tests__/sortOptions";
import ArticleCard from "./ArticleCard";
import PageSetter from "./PageSetter";
import { useLocation, useNavigate } from "react-router-dom";

function Articles() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [articlesData, setarticlesData] = useState({
    articles: [],
    articlesCount: "getting articles",
  });
  const [sortedBy, setSortedBy] = useState({
    sortByText: "date",
    orderText: "new - old",
    order: "desc",
    sort_by: "created_at",
  });

  const totalPages = Math.ceil(articlesData.articlesCount / 12);
  const page = parseInt(query.get("page") || "1", { totalPages });
  if (page > totalPages) {
    navigate(`?page=${totalPages}`);
  }

  const firstResultIndex = (page - 1) * 12 + 1;
  const lastResultIndex =
    page * 12 < articlesData.articlesCount
      ? page * 12
      : articlesData.articlesCount;

  useEffect(() => {
    getArticles(sortedBy, page).then((data) => {
      setarticlesData(data);
    });
  }, [sortedBy, page]);

  function handleSelect(event) {
    const index = event.target.value;
    if (sortedBy !== sortOptions[index]) {
      setSortedBy(sortOptions[index]);
      navigate("");
    }
  }


  return (
    <div className="articles">
      <div id="sort-and-result-count">
        <p id="result-count">
          showing results {firstResultIndex} - {lastResultIndex} of{" "}
          {articlesData.articlesCount ? articlesData.articlesCount : ""}
        </p>

        <select id="sort-selector" onChange={handleSelect}>
          {sortOptions.map((option, index) => {
            return (
              <option key={index} value={index}>
                {`${option.sortByText}: ${option.orderText}`}
              </option>
            );
          })}
        </select>
      </div>
      <ul className="articleList">
        {articlesData.articles.map((article) => {
          return <ArticleCard  key={article.article_id} article={article} />;
        })}
      </ul>
      <div id="page-selector">
        <PageSetter page={page} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Articles;
