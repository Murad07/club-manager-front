import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { DashboardRoute } from "./components/Dashboard/DashboardRoute";
import MembersList from "./components/Dashboard/MembersList";
import AddMemberFormic from "./components/Dashboard/AddMember/AddMemberFormic";
import EditMemberFormic from "./components/Dashboard/EditMember/EditMemberFormic";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route exact path="/">
            <Home />
          </Route> */}

          <DashboardRoute exact path="/" component={MembersList} />

          <DashboardRoute path="/add-member" component={AddMemberFormic} />
          <DashboardRoute
            path="/edit-member/:mId"
            component={EditMemberFormic}
          />

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
