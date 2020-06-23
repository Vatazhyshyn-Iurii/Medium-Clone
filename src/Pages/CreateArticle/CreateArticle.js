import React, {useContext, useEffect, useState} from "react";
import ArticleForm from "../../Components/ArticleForm";
import useFetch from "../../Hooks/useFetch";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../Contexts/CurrentUser";

const CreateArticle = () => {
  const apiUrl = '/articles'

  const [{response, error}, doFetch] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);

  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

  const handleSubmit = article => {
    doFetch({
      method: 'post',
      data: {
        article
      }
    })
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    setIsSuccessfulSubmit(true);
  }, [response]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to='/' />
  }

  if(isSuccessfulSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />
  }

  return (
    <div>
      <ArticleForm
        initialValues={initialValues}
        errors={(error && error.errors) || {}}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateArticle;