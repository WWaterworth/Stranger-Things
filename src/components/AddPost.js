import React, { useState } from "react";
import { BASE_URL } from "./const";

const AddPost = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deliver, setDeliver] = useState(false);

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
          description: description,
          price: price,
          willDeliver: deliver,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
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
