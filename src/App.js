import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from "./util/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import Vote from './pages/Vote';
import StateProvider from "./store/StateProvider";

function App() {
  return (
    <StateProvider>
      <Router>
        {/* <NavBar /> */}
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/vote" component={Vote} />
          </Switch>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
