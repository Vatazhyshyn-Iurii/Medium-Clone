import {useContext, useEffect} from "react";
import useFetch from "../Hooks/useFetch";
import {CurrentUserContext, LOADING, SET_AUTHORIZED, SET_UNAUTHORIZED} from "../Contexts/CurrentUser";
import useLocalStorage from "../Hooks/useLocalStorage";

const CurrentUserChecker = ({children}) => {
  const [{response}, doFetch] = useFetch('/user');
  const [, dispatch] = useContext(CurrentUserContext);
  const [token] = useLocalStorage('token');

  useEffect(() => {
    if (!token) {
      dispatch({ type: SET_UNAUTHORIZED })
      return;
    }
    doFetch();
    dispatch({ type: LOADING })
  }, [token, dispatch, doFetch]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({ type: SET_AUTHORIZED, payload: response.user })
  }, [response, dispatch]);

  return (
    children
  );
};

export default CurrentUserChecker;