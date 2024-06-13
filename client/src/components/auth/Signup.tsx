import { informationCircle } from "ionicons/icons";
import Feather from "../../assets/Feather.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/Auth.css";
import { IonIcon } from "@ionic/react";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [isCheck, setCheck] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup({
      firstname,
      lastname,
      email,
      uid,
      pwd,
      confirmPwd,
      isCheck,
    })
      .then(() => {
        setSuccess(true);
        setErrorMsg("User created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  useEffect(() => {
    setErrorMsg("");
    setSuccess(false);
  }, [firstname, lastname, email, uid, pwd, confirmPwd, isCheck]);

  const template = (
    <div className="auth-card" style={{ width: "clamp(2rem, 80vw, 20em)" }}>
      <div className="auth-card-logo">
        <img src={Feather} alt="FlyLogo" />
      </div>
      <div className="auth-card-header">
        <h1>Sign up</h1>
        <p style={{ margin: "1rem 0" }}>We are happy to have you</p>
      </div>
      <form onSubmit={handleSubmit} className="auth-card-form">
        <span className={errorMsg ? "formError active" : "formError"}>
          <span>
            <IonIcon
              icon={informationCircle}
              style={{
                color: `${success ? "greenyellow" : "rgb(255, 85, 85)"}`,
              }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp; {errorMsg ? errorMsg : errorMsg}
          </span>
        </span>
        <div className="form-item">
          <span>
            <input
              type="text"
              placeholder="First Name"
              autoComplete="off"
              autoCorrect="off"
              autoSave="off"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              value={firstname}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="Last Name"
              autoComplete="off"
              autoCorrect="off"
              autoSave="off"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={lastname}
            />
          </span>
        </div>
        <div className="form-item">
          <input
            type="text"
            placeholder="Email"
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div className="form-item">
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
            onChange={(e) => {
              setUid(e.target.value);
            }}
            value={uid}
          />
        </div>
        <div className="form-item">
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            value={pwd}
          />
        </div>
        <div className="form-item">
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
            onChange={(e) => {
              setConfirmPwd(e.target.value);
            }}
            value={confirmPwd}
          />
        </div>
        <span style={{ textAlign: "center", background: "red" }}>
          <p
            style={{
              margin: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="checkbox"
              id="agreeCheckbox"
              checked={isCheck}
              onChange={() => setCheck(!isCheck)}
              style={{ marginRight: ".2rem" }}
            />
            <label htmlFor="agreeCheckbox">I agree all statements in</label>
            &nbsp;
            <a
              style={{ textDecoration: "underline", cursor: "pointer " }}
              onClick={() =>
                alert(
                  "Hatdog Hatdog Hatdog Hatdog Hatdog Hatdog Hatdog Hatdog Hatdog Hatdog Hatdog Hatdog"
                )
              }
            >
              Terms of Service
            </a>
          </p>
        </span>
        <input type="submit" style={{ padding: ".7rem" }} />
      </form>
      <span style={{ textAlign: "center" }}>
        <p style={{ margin: "1rem" }}>
          Already have an account? <Link to={"/login"}>Sign in</Link>
        </p>
      </span>
    </div>
  );
  return template;
}
