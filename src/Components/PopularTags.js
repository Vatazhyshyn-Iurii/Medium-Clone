import React, {useEffect} from "react";
import useFetch from "../Hooks/useFetch";
import {Loading} from "./Loading";
import {ErrorMessage} from "./ErrorMessage";
import {Link} from "react-router-dom";

const PopuarTags = (props) => {
  const [{response, isLoading, error}, doFetch] = useFetch('/tags');

  useEffect(() => {
    doFetch()
  }, [doFetch]);

  if (isLoading || !response) {
    return <Loading/>
  }
  if (error) {
    return <ErrorMessage/>
  }

  return (
    <div className='sidebar'>
      <p>Popular tags</p>
      <div className="tag-list">
        {response.tags.map(tag => (
          <Link to={`/tags/${tag}`} className='tag-default tag-pill' key={tag}>
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopuarTags;

// https://conduit.productionready.io/api/users/login
// https://conduit.productionready.io/api/user