import { Link, useNavigate } from "react-router-dom";
import { postSignup } from "../services/linkr";
import styled from "styled-components";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function SignUp() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function SendSignup(e) {
    e.preventDefault();
    setLoading(true);

    const body = {
      email,
      password,
      username,
      profilePicture,
    };

    postSignup(body)
      .then(res => {
        setLoading(false);
        navigate("/");
      })
      .catch(res => {
        setLoading(false);
        const erros = res.response.data;
        alert(erros);
      });
  }

  return (
    <SignupStyle>
      <Logo>
        <div>
          <h1>linkr</h1>
          <h3>
            save, share and discover <br />the best links on the web
          </h3>
        </div>
      </Logo>
      <LogupStyle>
        <LogupInputs>
          <input
            placeholder="e-mail"
            type="email"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder="username"
            type="text"
            value={username}
            disabled={loading}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="picture url"
            type="text"
            value={profilePicture}
            disabled={loading}
            onChange={(e) => setProfilePicture(e.target.value)}
            required
          />
          <button onClick={SendSignup} disabled={loading}>
            {loading ?
              <ThreeDots height={20} color='white' /> :
              'Sign up'}
          </button>
          <Link to="/">
            <DescSignUp>Switch back to log in</DescSignUp>
          </Link>
        </LogupInputs>
      </LogupStyle>
    </SignupStyle>
  );
}

const SignupStyle = styled.div`
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

  div{
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

  h1{
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

  h3{
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

const LogupStyle = styled.div`
  width: 40%;
  height: 100%;
  display: flex;

  @media (max-width: 650px) {
    width: 100%;
    align-items: flex-start
  }
`;
const LogupInputs = styled.div`
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
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const DescSignUp = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #ffffff;
`;