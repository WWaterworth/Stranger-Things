import React, { useState } from "react";

const AddPost = (props) => {
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    //API call to submit a new post
  };

  return (
    <>
      <h1>Add a new Post</h1>
      <form onSubmit={handleSubmit()}>
        <input
          type="text"
          placeholder="location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        <input
          type="text"
          placeholder="description"
          onChange={(e) => setDesc(e.target.value)}
          value={location}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddPost;
