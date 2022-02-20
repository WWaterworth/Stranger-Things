import React, { useState } from "react";
import { BASE_URL } from "./const";

const AddPost = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deliver, setDeliver] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h1>Add a new Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <input
          type="text"
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
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
