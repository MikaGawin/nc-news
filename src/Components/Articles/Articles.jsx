import { useEffect, useState } from "react";
import { getArticles } from "../../AxiosApi/axiosApi";
import { useParams } from "react-router-dom";
import "./Articles.modules.css";
import sortOptions from "../../utils/sortOptions";
import ArticleCard from "./ArticleCard";
import PageSetter from "./PageSetter";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function Articles() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()

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
  const page = Number(searchParams.get("page"))
  const sortState = searchParams.get("sort_by")

  if (page > totalPages) {
    navigate(`?page=${totalPages}`);
  }

  const firstResultIndex = (page - 1) * 12 + 1;
  const lastResultIndex =
    page * 12 < articlesData.articlesCount
      ? page * 12
      : articlesData.articlesCount;

      
      useEffect(()=>{
        if(sortState){
          setSortedBy(sortOptions[sortState])
        }
      },[sortState])
      
      useEffect(() => {
        getArticles(sortedBy, page, topic).then((data) => {
          setarticlesData(data);
        });
      }, [sortedBy, page, topic]);

  function handleSelect(event) {
    const index = event.target.value;
    const newParams = new URLSearchParams(searchParams)
    newParams.set("sort_by", index)
    newParams.set("page", 1)
    setSearchParams(newParams)
  }

  return (
    <div className="articles">
      <h1>{!topic ? <>All articles</> : <>{topic} articles</>}</h1>
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
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
      <div id="page-selector">
        <PageSetter page={page} searchParams={searchParams} setSearchParams={setSearchParams} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Articles;
