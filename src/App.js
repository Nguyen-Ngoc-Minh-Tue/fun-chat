import "./App.css";
import Chatroom from "./components/Chatroom";
import Login from "./components/Login";
import { Route, Switch, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/Login" />
        <Route component={Chatroom} path="/" />
      </Switch>
    </BrowserRouter>
  );
}
