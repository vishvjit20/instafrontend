import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreatePost from "./components/CreatePost";
import { useEffect, createContext, useReducer, useContext } from "react";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch({ type: "USER", payload: user });
    else history.push("/login");
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} exact></Route>
      <Route path="/profile" component={Profile}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/create" component={CreatePost}></Route>
    </Switch>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
