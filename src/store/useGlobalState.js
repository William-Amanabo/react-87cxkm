import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "../util/config";
import jwtDecode from "jwt-decode";
import axios from "axios";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//TODO: add backend base url
axios.defaults.baseURL = process.env.APP_API_URL;

function useGlobalState() {
  const [token, setToken] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [matricNo, setMatricNo] = useState("");
  const [errors, setErrors] = useState([]);
  

  const noCors = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  const history = useHistory();
  const HelloWorld = () => {
    console.log("hello world!");
    return "Hello World";
  };

  const LoginCheck = () => {
    setToken(window.localStorage.getItem("token"));

    if (token) {
      const decodedToken = jwtDecode(token);
      //console.log("this is decoded token,", decodedToken)
      if (decodedToken.exp * 1000 < Date.now()) {
        Logout();

        //history.push("/login");
        window.location.href = "/login";
      } else {
        setAuthenticated(true);
        axios.defaults.headers.common["Authorization"] = token;
        //getUserData();
      }
    }
  };

  const Login = async (matricno, password) => {
    let userData = {
      matricno,
      password,
      api: "https://us-east1-salad-325323.cloudfunctions.net/login_v22",
    };
    //let userData = { matricno, password };
    console.log(userData);
    alert("success");
    //history.push("/vote");
    window.location.href = "/vote";
    /* axios
      .post(
        "https://us-east1-salad-325323.cloudfunctions.net/proxy1",
        userData,
        noCors
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          window.localStorage.setItem("token", res.data.token);
          setAuthenticated(true);
          axios.defaults.headers.common["Authorization"] = token;
          alert("Login successful");
        } else {
          alert("Login failed");
          setMatricNo("");
        }
        history.push("/vote");
      })
      .catch((err) => {
        alert(err);
      }); */
  };

  const Register = async (matno) => {
    let userData = {
      matno,
      api: "https://us-east1-salad-325323.cloudfunctions.net/sendpwd_v22",
    };
    console.log(userData);
    alert("Success, check your email for your password");
    //history.push("/login");
    window.location.href = "/login";
    /* axios
      .post(
        "https://us-east1-salad-325323.cloudfunctions.net/proxy1",
        userData,
        noCors
      )
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert("Success, check your email for your password");
          //history.push("/login");
        } else {
          alert("Error: Matric Number not found!");
        }
      })
      .catch((err) => {
        alert(err);
      }); */
  };

  const submitVote = (answers) => {
    //TODO: Update end point and handle success
    let userData = {
      answers,
      api: "https://us-east1-salad-325323.cloudfunctions.net/register_v22",
    };
	window.location.href='/dashboard'
    axios
      .post("https://us-east1-salad-325323.cloudfunctions.net/proxy1", userData)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert("Success,", res.data);
          //history.push("/congratulations");
          window.location.href = "/congratulations";
        } else {
          alert("Error: voting failed");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const Logout = () => {
    window.localStorage.removeItem("token");
    setToken("");
    delete axios.defaults.headers.common["Authorization"];
    setAuthenticated(false);
  };

  const getVoteData = () => {
    let candidateArray = axios
      .get("https://us-east1-salad-325323.cloudfunctions.net/core_v22", noCors)
      .then((res) => {
        return res.data;
      });

    candidateArray = candidateArray.map((details) => {
      return {
        firstName: details.firstname,
        steps: details.balance,
        matricNo: details.matricNo ? details.matricNo : "default",
      };
    });

    return candidateArray;
  };

  //LoginCheck();
  useEffect(() => {
    LoginCheck();
  }, []);

  return {
    authenticated,
    HelloWorld,
    Login,
    Register,
    submitVote,
    setMatricNo,
    matricNo,
  };
}

export default useGlobalState;
