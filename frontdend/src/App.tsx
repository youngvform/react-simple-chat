import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ChatList from "./components/ChatList";
import Room from "./components/Room";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path={`/chat/:id`} component={Room} />
          <Route exact path="/" component={ChatList} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
