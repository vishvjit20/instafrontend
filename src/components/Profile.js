import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import "./Profile.css";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [mypics, setPics] = useState([]);
  useEffect(() => {
    fetch("/post/myposts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setPics(result.posts));
  }, []);
  return (
    <div className="profile">
      <div className="profile-container">
        <div>
          <img
            src="https://media.istockphoto.com/photos/learn-to-love-yourself-first-picture-id1291208214?b=1&k=20&m=1291208214&s=170667a&w=0&h=sAq9SonSuefj3d4WKy4KzJvUiLERXge9VgZO-oqKUOo="
            className="profile-image"
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <div className="user-stats">
            <h5>{mypics.length} posts</h5>
            <h5>40 followers</h5>
            <h5>40 followings</h5>
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypics.map((item) => {
          return (
            <img
              key={item._id}
              className="gallery-image"
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
