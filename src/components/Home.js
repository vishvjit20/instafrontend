import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/post/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/post/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch("/post/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postComment = (text, postId) => {
    fetch("/post/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ postId, text }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) return result;
          else return item;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (postId) => {
    fetch(`/post/deletepost/${postId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5 className="top-bar">
              <Link
                to={
                  item.postedBy._id !== state._id
                    ? `/profile/${item.postedBy._id}`
                    : "/profile"
                }
              >
                {item.postedBy.name}
              </Link>
              {item.postedBy._id === state._id && (
                <i
                  className="material-icons"
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i>
              )}
            </h5>
            <div className="card-image">
              <img src={item.photo} alt={item.name} />
            </div>
            <div className="card-content">
              <i className="material-icons">favorite</i>
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => unlikePost(item._id)}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => likePost(item._id)}
                >
                  thumb_up
                </i>
              )}
              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: 500 }}>
                      {record.postedBy.name}
                    </span>
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  postComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
