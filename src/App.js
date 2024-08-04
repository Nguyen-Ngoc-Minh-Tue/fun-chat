import "./App.css";
import Chatroom from "./components/Chatroom";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import AuthProvider from "./Context/AuthProvider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route component={Login} path="/Login" />
          <Route component={Chatroom} path="/" />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}
