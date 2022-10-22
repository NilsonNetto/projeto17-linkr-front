import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

export default function Header() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };


  return (
    <Top>
      <Glueded>
        <Title>linkr</Title>
        <Logout>
          {click === false ? (
            <ion-icon
              name="chevron-down-outline"
              onClick={() => setClick(!click)}
            ></ion-icon>
          ) : (
            <ion-icon
              name="chevron-up-outline"
              onClick={() => setClick(!click)}
            ></ion-icon>
          )}
          <Img onClick={() => setClick(!click)}></Img>
        </Logout>
      </Glueded>
      {click === true ? <Box onClick={handleLogout}>Logout</Box> : <div></div>}
    </Top>
  );
}

const Top = styled.div`
  height: 72px;
  width: 100%;
  background-color: #151515;
`;

const Title = styled.div`
  font-family: "Passion One", cursive;
  font-weight: 700;
  font-size: 49px;
  margin-left: 28px;
  margin-top: 10px;
`;

const Logout = styled.div`
  display: flex;
  align-items: center;
  margin-right: 26px;

  ion-icon[name="chevron-down-outline"] {
    height: 20px;
    width: 30px;
  }

  ion-icon[name="chevron-up-outline"] {
    height: 20px;
    width: 30px;
  }
`;

const Img = styled.div`
  height: 53px;
  width: 53px;
  border-radius: 26.5px;
  background-color: aqua;
  margin-top: 8px;
`;

const Glueded = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Box = styled.div`
  width: 150px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #171717;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: 0.05em;
  color: #ffffff;
  border-radius: 0px 0px 0px 20px;
  position: fixed;
  right: 0;
  margin-top: 10px;
`;
