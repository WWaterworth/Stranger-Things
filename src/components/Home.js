import React, { useEffect } from "react";
import { BASE_URL } from "./const";

const Home = ({ guest, loggedIn, token }) => {
  useEffect(() => {
    const fetchUserData = async () => {
      await fetch(`${BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          //value of the array of messages belonging to logged in user
          console.log(result.data.messages);
        })
        .catch(console.error);
    };
    fetchUserData();
  }, [token]);

  return (
    <>
      <h2>Welcome to Stranger Things {guest}</h2>
      {!loggedIn ? <p>Log in to see your posts</p> : null}
      {loggedIn ? <h3>Here are your messages:</h3> : null}
    </>
  );
};

export default Home;
