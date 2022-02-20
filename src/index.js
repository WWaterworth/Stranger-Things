import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { AddPost, Posts, Home, Profile, Account } from "./components";

const App = () => {
  const [token, setToken] = useState("");
  const [guest, setGuest] = useState("");
  const [posts, setPosts] = useState([]);

  return (
    <main>
      <h1>Stranger Things</h1>
      <Link to="/">Home | </Link>
      <Link to="/posts">Posts | </Link>
      <Link to="/profile">Profile | </Link>
      <Link to="/account/login"> Log In/Register</Link>
      <br />
      <Route exact path="/">
        <Home guest={guest} />
      </Route>
      <Route exact path="/posts">
        <AddPost posts={posts} setPosts={setPosts} token={token} />
        <Posts posts={posts} setPosts={setPosts} />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/account/:method">
        <Account setToken={setToken} setGuest={setGuest} />
      </Route>
    </main>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
