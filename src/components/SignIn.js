import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SignIn() {
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
          <input placeholder="e-mail" type="email" />
          <br />
          <input placeholder="password" type="password" />
          <br />
          <button>Log In</button>
          <Link to="/signup">
            <SignDesc>First time? Create an account!</SignDesc>
          </Link>
        </BoardLogInInputs>
      </LogIn>
    </SignInStyle>
  );
}

const SignInStyle = styled.div`
  width: 100vh;
  height: 100vw;
  display: flex;

  @media (max-width: 375px) {
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

  @media (max-width: 375px) {
    width: 375px;
    height: 175px;
    margin-left: 69px;
    margin-top: 10px;
    margin-bottom: 27px;
    margin-right: 69px;
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

  @media (max-width: 375px) {
    width: 237px;
    height: 68px;
    font-size: 23px;
    line-height: 34px;
  }
`;
const LogIn = styled.div`
  width: 535px;
  height: auto;

  @media (max-width: 375px) {
    width: 375px;
  }
`;
const BoardLogInInputs = styled.div`
  width: 429px;
  height: 267px;
  margin-left: 100px;
  margin-top: 317px;
  margin-bottom: 440px;
  margin-right: 55px;

  @media (max-width: 375px) {
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

    @media (max-width: 375px) {
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

    @media (max-width: 375px) {
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

  @media (max-width: 375px) {
    margin-left: 35px;
    margin-right: 117px;
  }
`;