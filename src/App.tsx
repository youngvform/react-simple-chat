import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ChatList from "./components/ChatList";

import "./App.css";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ChatList} />
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
