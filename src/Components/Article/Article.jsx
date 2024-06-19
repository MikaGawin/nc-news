import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { extractTime, displayDate } from "../../utils/formatTime";
import "./Article.modules.css"

import { getArticle } from "../../AxiosApi/axiosApi";

function Article () {
    const {article_id} = useParams()
    const [articleData, setArticleData] = useState({})
    useEffect(()=> {
        getArticle(article_id).then(({article})=> {
            setArticleData(article)
        })
    }, [])

    const {title, topic, author, body, created_at:dateString, votes, comment_count:commentsCount, article_img_url:articleImage} = articleData
    const date = displayDate(extractTime(dateString))
    return <div className="article">
        <header>
            <h1>{title}</h1>
            <h2>{author}</h2>
            <h3>{date}</h3>
            <h4>{topic}</h4>
            <h5>votes: {votes} comments: {commentsCount}</h5>
        </header>
        <section>
            <img src={articleImage}/>
            <p>{body}</p>
        </section>

    </div>
}

export default Article;