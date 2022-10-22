import { Link, useNavigate } from "react-router-dom";
import { postSignup } from "../services/linkr";
import styled from "styled-components";
import { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [offButton, setOffButton] = useState(false);

  const navigate = useNavigate();

  function SendSignup(e) {
    e.preventDefault();

    const body = {
      email,
      password,
      username,
      profilePicture,
    };

    const promise = postSignup(body);
    promise.then((res) => {
      const result = [res];
      if (result.length > 0) {
        setOffButton(true);
      }

      navigate("/");
    });
    promise.catch((err) => {
      const erros = err.response.data;
      alert(erros);
    });
  }

  return (
    <SignUpStyle>
      <LogoSingUp>
        <BoardSignUp>
          <TitleSignUp>linkr</TitleSignUp>
          <DescriptionSignUp>
            save, share and discover the best links on the web{" "}
          </DescriptionSignUp>
        </BoardSignUp>
      </LogoSingUp>
      <LogUp>
        <BoardLogUpInputs>
          <input
            placeholder="e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <input
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <input
            placeholder="picture url"
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            required
          />
          <br />
          <button onClick={SendSignup} disabled={offButton}>Sign Up</button>
          <Link to="/">
            <DescSignUp>Switch back to log in</DescSignUp>
          </Link>
        </BoardLogUpInputs>
      </LogUp>
    </SignUpStyle>
  );
}

const SignUpStyle = styled.div`
  width: 100vh;
  height: 100vw;
  display: flex;

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;
const LogoSingUp = styled.div`
  width: 100%;
  height: auto;
  background: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
`;
const TitleSignUp = styled.div`
  width: 233px;
  height: 117px;
  font-family: "Passion One";
  font-style: normal;
  font-weight: 700;
  font-size: 106px;
  line-height: 117px;
  letter-spacing: 0.05em;
  color: #ffffff;
`;
const DescriptionSignUp = styled.div`
  width: 442px;
  height: 128px;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;

  @media (max-width: 450px) {
    width: 237px;
    height: 68px;
    font-size: 23px;
    line-height: 34px;
  }
`;
const BoardSignUp = styled.div`
  width: 442px;
  height: 245px;
  margin-left: 144px;
  margin-top: 301px;
  margin-bottom: 478px;
  margin-right: 319px;

  @media (max-width: 450px) {
    width: 375px;
    height: 175px;
    margin-left: 69px;
    margin-top: 10px;
    margin-bottom: 27px;
    margin-right: 69px;
  }
`;
const LogUp = styled.div`
  width: 535px;
  height: auto;

  @media (max-width: 450px) {
    width: 375px;
  }
`;
const BoardLogUpInputs = styled.div`
  width: 429px;
  height: 267px;
  margin-left: 100px;
  margin-top: 274px;
  margin-bottom: 440px;
  margin-right: 55px;

  @media (max-width: 450px) {
    width: 330px;
    height: auto;
    margin-left: 23px;
    margin-top: 40px;
    margin-bottom: 91px;
    margin-right: 22px;
  }

  input {
    width: 429px;
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

    @media (max-width: 450px) {
      width: 330px;
      height: 55px;
      margin-bottom: 13px;
    }
  }
  button {
    width: 429px;
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

    @media (max-width: 450px) {
      width: 330px;
      height: 55px;
      margin-bottom: 18px;
    }
  }
`;
const DescSignUp = styled.div`
  width: 262px;
  height: 24px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #ffffff;
  margin-left: 130px;
  margin-right: 134px;

  @media (max-width: 450px) {
    margin-left: 70.5px;
    margin-right: 117px;
  }
`;
