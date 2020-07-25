import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ChatList from "./components/ChatList";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={ChatList} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
