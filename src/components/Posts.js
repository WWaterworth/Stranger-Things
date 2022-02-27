import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { BASE_URL } from "./const";
import { TextInputForm } from "./TextInputForm";

const Posts = ({ posts, setPosts, loggedIn, userId, token }) => {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const SearchTerm = searchParams.get("searchTerm") || "";

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

  const sendMessage = async (postId, message, token) => {
    fetch(`${BASE_URL}/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: `${message}`,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  };

  const postMatcher = (post, SearchTerm) => {
    const {
      title,
      description,
      author: { username },
    } = post;
    const toCheck = [title, description, username];

    for (const field of toCheck) {
      if (field.toLowerCase().includes(SearchTerm.toLowerCase())) {
        return true;
      }
    }
  };

  const filteredPosts = posts.filter((post) => postMatcher(post, SearchTerm));

  return (
    <>
      <h2>Posts</h2>
      <h3>Search</h3>
      <form>
        <input
          type="text"
          placeholder="Enter your search"
          onChange={(e) =>
            history.push(
              e.target.value ? `/posts?searchTerm=${e.target.value}` : "/posts"
            )
          }
        ></input>
      </form>
      {filteredPosts &&
        filteredPosts.map((elem) => {
          return (
            <div key={elem._id}>
              <h3>{elem.title}</h3>
              <p>Seller: {elem.author.username}</p>
              <p>Location: {elem.location}</p>
              <p>{elem.description}</p>
              <p>Price: {elem.price}</p>
              {loggedIn && userId !== elem.author._id ? (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <TextInputForm
                    buttonText={"Submit"}
                    id={elem._id}
                    label={"Send message about this post "}
                    placeholder={"Your message here"}
                    handleClick={sendMessage}
                    token={token}
                    author={elem.author.username}
                  />
                </form>
              ) : null}
              <hr />
            </div>
          );
        })}
    </>
  );
};

export default Posts;
