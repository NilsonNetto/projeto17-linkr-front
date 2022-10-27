import { Link, useNavigate } from "react-router-dom";
import { postSignin } from "../services/linkr";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const profilePicture = localStorage.getItem("profilePicture");

    if (token && profilePicture) {
      const getToken = JSON.parse(token);
      const getProfilePicture = JSON.parse(profilePicture);
      setUserData({ token: getToken, profilePicture: getProfilePicture });
      navigate("/timeline");
    } else {
      navigate("/");
    }
  }, []);

  function Login(e) {
    e.preventDefault();
    setLoading(true);

    const body = {
      email,
      password,
    };

    postSignin(body)
      .then(res => {
        const { data } = res;

        setUserData(data);
        setLoading(false);
        localStorage.clear();
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem(
          "profilePicture",
          JSON.stringify(data.profilePicture)
        );

        navigate("/timeline");
      })
      .catch(res => {
        console.log(res.data);
        setLoading(false);
        alert('Email ou senha incorretos');
      });
  }

  return (
    <SigninStyle>
      <Logo>
        <div>
          <h1>linkr</h1>
          <h3>
            save, share and discover <br />
            the best links on the web
          </h3>
        </div>
      </Logo>
      <LoginStyle>
        <LoginInputs>
          <input
            placeholder="e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          <button onClick={Login} disabled={loading}>
            {loading ?
              <ThreeDots height={20} color='white' /> :
              'Log in'}
          </button>
          <Link to="/signup">
            <SignDesc>First time? Create an account!</SignDesc>
          </Link>
        </LoginInputs>
      </LoginStyle>
    </SigninStyle>
  );
}

const SigninStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const Logo = styled.div`
  width: 60%;
  background: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

  @media (max-width: 650px) {
    width: 100%;
    min-height: 175px;
  }

  div {
    width: 100%;
    margin-left: 15%;
    margin-top: 30vh;

    @media (max-width: 650px) {
      width: 100%;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  h1 {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    color: #ffffff;

    @media (max-width: 900px) {
      font-size: 90px;
      line-height: 100px;
    }

    @media (max-width: 650px) {
      font-size: 76px;
      line-height: 84px;
    }
  }

  h3 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;

    @media (max-width: 900px) {
      max-width: 270px;
      font-size: 33px;
      line-height: 49px;
    }

    @media (max-width: 650px) {
      font-size: 23px;
      line-height: 34px;
    }
  }
`;

const LoginStyle = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 650px) {
    width: 100%;
    align-items: flex-start;
  }
`;
const LoginInputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 650px) {
    width: 100%;
    margin: 40px 20px;
  }

  input {
    width: 90%;
    height: 65px;
    background: #ffffff;
    border-radius: 6px;
    padding-left: 17px;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #9f9f9f;
    margin-bottom: 13px;

    @media (max-width: 650px) {
      width: 100%;
      height: 55px;
      margin-bottom: 13px;
    }
  }

  button {
    width: 90%;
    height: 65px;
    background: #1877f2;
    border-radius: 6px;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
    margin-bottom: 22px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 650px) {
      width: 100%;
      height: 55px;
      margin-bottom: 18px;
    }
  }
`;

const SignDesc = styled.div`
  font-size: 20px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #ffffff;
`;
