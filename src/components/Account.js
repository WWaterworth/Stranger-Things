import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BASE_URL } from "./const";

const Account = ({ setToken, setGuest }) => {
  const params = useParams();
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`${BASE_URL}/users/${params.method}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          setToken(result.data.token);
          getGuest(result.data.token);

          if (result.data.token) {
            history.push("/");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getGuest = async (token) => {
    await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setGuest(result.data.username);
      })
      .catch(console.error);
  };

  return (
    <>
      <h1>Account</h1>
      <div>This is the {params.method} page</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        ></input>
        <hr></hr>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <hr></hr>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Account;
