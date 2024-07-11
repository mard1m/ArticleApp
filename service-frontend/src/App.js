import './App.css';
import HeaderComponent from "./components/HeaderComponent";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import WelcomeComponent from "./components/WelcomeComponent";
import React from "react";
import ProfileComponent from "./components/ProfileComponent";
import WriteNewArticleComponent from "./components/WriteNewArticleComponent";
import AllArticlesPageComponent from "./components/AllArticlesPageComponent";
import SingleArticleComponent from "./components/SingleArticleComponent";

function App() {
  return (
      <div style={{backgroundColor: "#5CDB95"}}>
          <Router>
              <div style={{ overflowY: 'auto', overflowX: 'auto', minHeight: '100vh', position: 'relative' }}>
                  <HeaderComponent />
                  <div className="container">
                      <Switch>
                          <Route path="/articles" exact component={AllArticlesPageComponent}></Route><Route
                          path="/articles/:id"
                          render={(props) => (
                              <SingleArticleComponent
                                  {...props}
                                  articleId={props.match.params.id}
                              />
                          )}
                      />
                          <Route path="/new-article" exact component={WriteNewArticleComponent}></Route>
                          <Route path="/main" exact component={ProfileComponent}></Route>
                          <Route path="/" exact component={WelcomeComponent}></Route>
                      </Switch>
                  </div>
              </div>
          </Router>
      </div>
  );
}

export default App;
