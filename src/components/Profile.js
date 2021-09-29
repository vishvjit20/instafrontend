import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import "./Profile.css";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
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

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "vibhu");
      fetch("https://api.cloudinary.com/v1_1/vibhu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/user/user/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify({ pic: data.url }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
        })
        .catch((err) => console.log(err));
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="image">
          <img
            src={state ? state.pic : "loading"}
            alt=""
            className="profile-image"
          />
          <div class="file-field input-field" style={{ margin: "10px" }}>
            <div class="btn #64b5f6 blue darken-1">
              <span>Update Pic</span>
              <input
                type="file"
                onChange={(e) => updatePhoto(e.target.files[0])}
              />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" />
            </div>
          </div>
        </div>

        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <h6>{state ? state.email : ""}</h6>
          <div className="user-stats">
            <h6>{mypics.length} posts</h6>
            <h6>
              {state && state.followers ? state.followers.length : 0} followers
            </h6>
            <h6>
              {state && state.following ? state.following.length : 0} following
            </h6>
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
