import React, { useEffect, useState } from "react";
import { BASE_URL } from "./const";

const Profile = ({ token, loggedIn }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    try {
      const fetchUserPosts = async () => {
        const resp = await fetch(`${BASE_URL}/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await resp.json();
        const userPostData = result.data.posts;
        setUserPosts(userPostData);
        console.log(userPostData);
      };
      fetchUserPosts();
    } catch (error) {
      console.log(error);
    }
  }, [setUserPosts, token]);

  return (
    <>
      <h4>Your posts</h4>
      {userPosts &&
        userPosts.map((elem) => {
          if (loggedIn && elem.isAuthor === true) {
            return (
              <div key={elem.id}>
                <h3>{elem.title}</h3>
                <p>Seller: {elem.author.username}</p>
                <p>Location: {elem.location}</p>
                <p>{elem.description}</p>
                <p>Price: {elem.price}</p>
              </div>
            );
          }
        })}
    </>
  );
};

export default Profile;
