import React from "react";
import {Route, Switch} from "react-router-dom";
import GlobalFeed from "../Pages/GlobalFeed/GlobalFeed";
import TagFeed from "../Pages/TagFeed/TagFeed";
import YourFeed from "../Pages/YourFeed/YourFeed";
import Article from "../Pages/Article/Article";
import Authentication from "../Pages/Authentication/Authentication";
import CreateArticle from "../Pages/CreateArticle/CreateArticle";
import EditArticle from "../Pages/EditArticle/EditArticle";
import Settings from "../Pages/Settings/Settings";
import UserProfile from "../Pages/UserProfile/UserProfile";

export default () => {
  return (
    <Switch>
      <Route exact path='/' component={GlobalFeed} />
      <Route path='/settings' component={Settings} />
      <Route path='/profile/:slug' component={UserProfile} />
      <Route path='/profile/:slug/favorites' component={UserProfile} />
      <Route path='/articles/new' component={CreateArticle} />
      <Route path='/articles/:slug/edit' component={EditArticle} />
      <Route path='/feed' component={YourFeed} />
      <Route path='/tags/:slug' component={TagFeed} />
      <Route path='/login' component={Authentication} />
      <Route path='/register' component={Authentication} />
      <Route path='/articles/:slug' component={Article} />
    </Switch>
  );
};