import React, { useEffect, useState } from "react";
import { BASE_URL } from "./const";

const Home = ({ guest, loggedIn, token, userId }) => {
  const [messages, setMessages] = useState([]);

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
          setMessages(result.data.messages);
        })
        .catch(console.error);
    };
    fetchUserData();
  }, [token]);

  return (
    <>
      <h2>Welcome to Stranger Things {guest}</h2>
      {!loggedIn ? <p>Log in to see your messages</p> : null}
      {loggedIn ? <h3>Here are your messages:</h3> : null}

      {loggedIn &&
        messages &&
        messages.map((elem) => {
          if (loggedIn && elem.fromUser._id !== userId) {
            return (
              <div key={elem._id}>
                <h4>Original Post: {elem.post.title}</h4>
                <h3>From: {elem.fromUser.username}</h3>
                <p>{elem.content}</p>
                <p></p>
                <hr />
              </div>
            );
          } else {
            return null;
          }
          // if (loggedIn && elem.fromUser._id === userId) {
          //   return (
          //     <div key={elem._id}>
          //       <h4>Original Post: {elem.post.title}</h4>
          //       <h3>You sent: {elem.fromUser.username}</h3>
          //       <p>{elem.content}</p>
          //       <p></p>
          //       <hr />
          //     </div>
          //   );
          // } else {
          //   return null;
          // }
        })}
    </>
  );
};

export default Home;
