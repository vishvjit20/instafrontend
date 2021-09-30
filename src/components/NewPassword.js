import { useParams } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

const NewPassword = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const PostData = async () => {
    const res = await fetch("/auth/newPassword", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    });

    const data = await res.json();
    console.log(data);
    if (data.error) M.toast({ html: data.error, classes: "#f44336 red" });
    else {
      M.toast({
        html: data.message,
        classes: "#66bb6a green lighten-1",
      });
      history.push("/signin");
    }
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => PostData()}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
