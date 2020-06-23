import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import Routes from "./Routes/Routes";
import TopBar from "./Components/TopBar";
import {CurrentUserProvider} from "./Contexts/CurrentUser";
import CurrentUserChecker from "./Components/CurrentUserChecker";


const App = () => {
  return (
      <CurrentUserProvider>
        <CurrentUserChecker >
          <BrowserRouter>
            <TopBar />
            <Routes />
          </BrowserRouter>
        </CurrentUserChecker>
      </CurrentUserProvider>
  );
};


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
