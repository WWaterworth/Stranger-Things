import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { Posts, Home, LogIn, Account } from "./components";

const App = () => {
  const [token, setToken] = useState("");
  const [guest, setGuest] = useState("");

  return (
    <main>
      <h1>Stranger Things</h1>
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/login">Log In</Link>
      <Link to="/account/login">Account</Link>
      <br />
      <Route exact path="/">
        <Home guest={guest} />
      </Route>
      <Route exact path="/posts">
        <Posts />
      </Route>
      <Route exact path="/login">
        <LogIn />
      </Route>
      <Route path="/account/:method">
        <Account setToken={setToken} setGuest={setGuest} />
      </Route>
    </main>
  );
};

// const Home = () => <h4>This is my home</h4>
// const Posts = () => <h4>These are posts</h4>
// const LogIn = () => <h4>This is where you Log in</h4>

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
