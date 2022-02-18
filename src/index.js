import React, { useEffect, useState } from 'react';
import ReactDOM, {BrowserRouter as Router} from 'react-dom';
const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch("https://strangers-things.herokuapp.com/api/2111-CSU-RM-WEB-PT/posts/");
      const result = await resp.json();
      const postData = result.data.posts;
      setPosts(postData);
    }
    fetchPosts();
  },[])

  return (<>
  <h1>Stranger Things</h1>
  <h2>Posts</h2>
  {posts && posts.map((elem, idx)=> {
    return (
      <div key={idx}>
        <h3>{elem.title}</h3>
        <p>Seller: {elem.author.username}</p>
        <h4>Location: {elem.location}</h4>
        <p>{elem.description}</p>
        <p>Price: {elem.price}</p>
      </div>
    )
  })}
  </>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);