import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getArticle } from "../../AxiosApi/axiosApi";

function Article () {
    const {article_id} = useParams()
    const [articleData, setArticleData] = useState({})
    useEffect(()=> {
        getArticle(article_id).then(({article})=> {
            setArticleData(article)
        })
    }, [])

    return <div>
        <h1>{articleData.title}</h1>
    </div>
}

export default Article;