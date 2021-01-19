import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Register from "./auth/Register";
import Login from "./auth/Login";
import Header from "./Header";

import history from "../history";

import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

// lazy imports
const HomeComponent = lazy(() => import("../components/page/home/home"));
const RoomComponent = lazy(() =>
  import("../components/page/RoomComponent/RoomComponent")
);

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
        </div>
        <div>
          <Switch>
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow} />
            <Route path="/join/:id" component={RoomComponent} />
            <Route path={["/home", "/"]} exact component={HomeComponent} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
