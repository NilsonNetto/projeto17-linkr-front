import { Link, useNavigate } from "react-router-dom";
import { postSignin } from "../services/linkr";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext";


export default function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [offButton, setOffButton] = useState(false);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  function Login(e) {
    e.preventDefault();

    const body = {
      email,
      password
    };

    const promise = postSignin(body);
    promise.then((res) => {
      const { data } = res;

      const result = [data.token];
      if (result.length > 0) {
        setOffButton(true);
      }

      setUserData(data);

      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(data.token));
      localStorage.setItem("userPicture", JSON.stringify(data.profilePicture));

      navigate("/timeline");
    });
    promise.catch((err) => {
      const erros = err.response.data;
      console.log(erros);
      alert(erros);
    });
  }

  useEffect(() => {
    const userLogado = localStorage.getItem("user");
    console.log(userLogado);
    if (userLogado) {
      const getUser = JSON.parse(userLogado);
      setUserData(getUser);
      navigate("/timeline");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <SignInStyle>
      <Logo>
        <BoardLogIn>
          <Title>linkr</Title>
          <Description>
            save, share and discover the best links on the web{" "}
          </Description>
        </BoardLogIn>
      </Logo>
      <LogIn>
        <BoardLogInInputs>
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
          <button onClick={Login} disabled={offButton}>Log In</button>
          <Link to="/signup">
            <SignDesc>First time? Create an account!</SignDesc>
          </Link>
        </BoardLogInInputs>
      </LogIn>
    </SignInStyle>
  );
}

const SignInStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;
const BoardLogIn = styled.div`
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
    box-sizing: border-box;
  }
`;
const Logo = styled.div`
  width: 100%;
  height: auto;
  background: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
`;
const Title = styled.div`
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
const Description = styled.div`
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
const LogIn = styled.div`
  width: 535px;
  height: auto;

  @media (max-width: 450px) {
    width: 375px;
    box-sizing: border-box;
  }
`;
const BoardLogInInputs = styled.div`
  width: 429px;
  height: 267px;
  margin-left: 55px;
  margin-top: 317px;
  margin-bottom: 440px;
  margin-right: 55px;

  @media (max-width: 450px) {
    width: 330px;
    height: auto;
    margin-left: 23px;
    margin-right: 22px;
    margin-top: 40px;
    margin-bottom: 91px;
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

const SignDesc = styled.div`
  width: 262px;
  height: 24px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #ffffff;
  margin-left: 90px;
  margin-right: 134px;

  @media (max-width: 450px) {
    margin-left: 35px;
    margin-right: 117px;
  }
`;
