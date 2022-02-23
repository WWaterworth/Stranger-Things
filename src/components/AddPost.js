import React, { useState } from "react";
import { BASE_URL } from "./const";

const AddPost = ({ token, posts, setPosts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deliver, setDeliver] = useState(false);
  const [location, setLocation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title: title,
          location: location,
          description: description,
          price: price,
          willDeliver: deliver,
        },
      }),
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
      <h1>Add a new Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Post Title:
          <br />
          <input
            type="text"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <br />
        <label>
          Location:
          <br />
          <input
            type="text"
            placeholder="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
        </label>
        <br />
        <label>
          {" "}
          Post Description:
          <br />
          <input
            type="text"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </label>
        <br />
        <label>
          {" "}
          Item Price:
          <br />
          <input
            type="text"
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </label>
        <br />
        <input
          type="checkbox"
          onChange={(e) =>
            e.target.checked ? setDeliver(true) : setDeliver(false)
          }
          value={deliver}
        />{" "}
        Delivery offered?
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddPost;
