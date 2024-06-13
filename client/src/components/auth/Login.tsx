// @ts-ignore
import { informationCircle, lockClosed, person } from "ionicons/icons";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import "../../styles/Auth.css";

import Feather from "../../assets/Feather.png";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(uid, pwd)
      .then(() => {
        console.log("%cYou have logged in successfully", "color: greenyellow;");
        navigate("/");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  useEffect(() => {
    setErrorMsg("");
  }, [uid, pwd]);

  const template = (
    <div className="auth-card">
      <div className="auth-card-logo">
        <img src={Feather} alt="FlyLogo" />
      </div>
      <div className="auth-card-header">
        <h1>Login</h1>
        <p>We are happy to have you back</p>
      </div>
      <form onSubmit={handleSubmit} className="auth-card-form">
        <span className={errorMsg ? "formError active" : "formError"}>
          <span>
            <IonIcon icon={informationCircle} />
            &nbsp;&nbsp;&nbsp;&nbsp; {errorMsg ? errorMsg : errorMsg}
          </span>
        </span>
        <div className="form-item">
          <IonIcon icon={person} />
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            autoSave="off"
            autoCorrect="off"
            onChange={(e) => setUid(e.target.value)}
          />
        </div>
        <div className="form-item">
          <IonIcon icon={lockClosed} />
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            autoSave="off"
            autoCorrect="off"
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <div className="form-item-other">
          <span>
            <input type="checkbox" id="AuthRememberMe" />
            <label htmlFor="AuthRememberMe">Remember me</label>
          </span>
          <span>
            <a onClick={() => alert("Please remember it :(")}>
              Forgot password
            </a>
          </span>
        </div>
        <input type="submit" />
      </form>
      <span>
        Don't have an account? <Link to={"/signup"}>Sign up</Link>
      </span>
    </div>
  );

  return template;
}
