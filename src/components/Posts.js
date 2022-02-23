import React, { useEffect } from "react";
import { BASE_URL } from "./const";

const Posts = ({ posts, setPosts, loggedIn, userId, token }) => {
  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch(
        "https://strangers-things.herokuapp.com/api/2111-CSU-RM-WEB-PT/posts/"
      );
      const result = await resp.json();
      const postData = result.data.posts;
      setPosts(postData);
    };
    fetchPosts();
  }, [setPosts]);

  const deletePost = async (postId) => {
    await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {})
      .catch(console.error);
    const reRenderPosts = async () => {
      const postResp = await fetch(`${BASE_URL}/posts`);
      const result = await postResp.json();
      const postData = result.data.posts;
      setPosts(postData);
    };
    reRenderPosts();
  };

  return (
    <>
      <h2>Posts</h2>
      {posts &&
        posts.map((elem) => {
          return (
            <div key={elem._id}>
              <h3>{elem.title}</h3>
              <p>Seller: {elem.author.username}</p>
              <p>Location: {elem.location}</p>
              <p>{elem.description}</p>
              <p>Price: {elem.price}</p>
              {loggedIn && elem.author._id === userId ? (
                <button type="submit" onClick={() => deletePost(elem._id)}>
                  Delete
                </button>
              ) : null}
            </div>
          );
        })}
    </>
  );
};

export default Posts;
