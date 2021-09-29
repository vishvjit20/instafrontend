import { useState } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

const Reset = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const PostData = async () => {
    if (
      email &&
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Invalid Email", classes: "#f44336 red" });
      return;
    }
    const res = await fetch("/auth/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.error) M.toast({ html: data.error, classes: "#f44336 red" });
    else {
      M.toast({
        html: data.message,
        classes: "#66bb6a green lighten-1",
      });
      history.push("/login");
    }
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => PostData()}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default Reset;
