import React, { useContext } from "react";
import ArticlesContext from "./context/Articles/ArticlesContext";
import CollectionsContext from "./context/Collections/CollectionsContext";

import ResearchItem from "./ResearchItem";
const ResearchArticles = (props) => {
  const articlesContext = useContext(ArticlesContext);

  const { researchArticles, getResearchArticles } = articlesContext;

  const collectionsContext = useContext(CollectionsContext);

  const {
    getSavedResearchArticles,
    savedResearchArticles,
    loading,
  } = collectionsContext;
  let filteredArticles =
    researchArticles !== null
      ? researchArticles.filter((article) => {
          return (
            article.authors &&
            article.description &&
            article.authors.length > 0 &&
            article.publisher &&
            article.fulltextUrls.length > 1 &&
            article.topics.length > 1
          );
        })
      : "";

  const displayAll = researchArticles ? (
    filteredArticles.map((article, index) => {
      return <ResearchItem article={article} id={index} type={props.type} />;
    })
  ) : (
    <p>No Articles</p>
  );

  const displaySaved = savedResearchArticles ? (
    savedResearchArticles.map((article, index) => {
      return (
        <ResearchItem
          article={article.researchArticle}
          id={index}
          type={props.type}
        />
      );
    })
  ) : (
    <p>No Saved Articles</p>
  );

  return <div>{props.type === "all" ? displayAll : displaySaved}</div>;
};

export default ResearchArticles;