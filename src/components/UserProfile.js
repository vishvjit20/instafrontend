import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import "./Profile.css";

const UserProfile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [userProfile, setProfile] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    fetch(`/user/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProfile(result);
      });
  }, []);

  return (
    <>
      {!userProfile ? (
        <h2>Loading...</h2>
      ) : (
        <div className="profile">
          <div className="profile-container">
            <div>
              <img
                src="https://media.istockphoto.com/photos/learn-to-love-yourself-first-picture-id1291208214?b=1&k=20&m=1291208214&s=170667a&w=0&h=sAq9SonSuefj3d4WKy4KzJvUiLERXge9VgZO-oqKUOo="
                className="profile-image"
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h6>{userProfile.user.email}</h6>
              <div className="user-stats">
                <h5>{userProfile.posts.length} posts</h5>
                <h5>40 followers</h5>
                <h5>40 followings</h5>
              </div>
            </div>
          </div>
          <div className="gallery">
            {userProfile.posts.map((item) => {
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
      )}
    </>
  );
};

export default UserProfile;
