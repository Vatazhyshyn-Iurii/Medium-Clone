import React from "react";
import useFetch from "../Hooks/useFetch";
import classNames from 'classnames';

const AddToFavorites = ({isFavorited, favoritesCount, articleSlug}) => {
  const apiUrl = `/articles/${articleSlug}/favorite`;

  const [{response}, foFetch] = useFetch(apiUrl);

  const favouritesCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;
  const isFaforitedWithResponse = response
    ? response.article.favorited
    : isFavorited;

  const buttonClasses = classNames({
    btn: true,
    'btn-sm': true,
    'btn-primary': isFaforitedWithResponse,
    'btn-outline-primary': !isFaforitedWithResponse,
  });

  const handleLike = (event) => {
    event.preventDefault();
    foFetch({
      method: isFaforitedWithResponse ? 'delete' : 'post'
    })
  };

  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className='ion-heart' />
      <span>&nbsp; {favouritesCountWithResponse}</span>
    </button>
  );
};

export default AddToFavorites;