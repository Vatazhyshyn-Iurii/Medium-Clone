import React, {Fragment, useEffect} from "react";
import useFetch from "../../Hooks/useFetch";
import Feed from "../../Components/Feed";
import Pagination from "../../Components/Pagination";
import {getPaginator, limit} from "../../utils";
import {stringify} from "query-string";
import PopuarTags from "../../Components/PopularTags";
import {Loading} from "../../Components/Loading";
import {ErrorMessage} from "../../Components/ErrorMessage";
import FeedToggler from "../../Components/FeedToggler";

const YourFeed = ({location, match}) => {
  const {offset, currentPage} = getPaginator(location.search);
  const stringifiedparams = stringify({
    limit, offset
  });
  const apiUrl = `/articles/feed?${stringifiedparams}`;
  const url = match.url;

  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className='home-page'>
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            { isLoading && <Loading /> }
            { error && <ErrorMessage /> }
            { !isLoading && response && (
              <Fragment>
                <Feed articles={response.articles} />
                <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage} />
              </Fragment>
              ) }
          </div>
          <div className="col-md-3">
            <PopuarTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourFeed;