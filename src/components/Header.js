import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import UserContext from "../context/UserContext";
import UserSearch from "./UserSearch";

export default function Header() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Top>
      <Glueded>
        <Title>
          <Link to="/timeline">linkr</Link>{" "}
        </Title>
        <SearchInput>
          <UserSearch />
        </SearchInput>
        <Logout>
          {click === false ? (
            <FaChevronDown
              onClick={() => setClick(!click)}
            />
          ) : (
            <FaChevronUp
              onClick={() => setClick(!click)}
            />
          )}
          <Img
            onClick={() => setClick(!click)}
            src={userData.profilePicture}
            alt="profile-pic"
          />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
`;

const Title = styled.div`
  font-family: "Passion One", cursive;
  font-weight: 700;
  font-size: 49px;
  margin-left: 28px;
  margin-top: 10px;

  a {
    text-decoration: none;
    color: #ffffff;
  }
`;

const Logout = styled.div`
  width: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  font-size: 25px;
`;

const Img = styled.img`
  height: 53px;
  width: 53px;
  border-radius: 26.5px;
  background-color: #707070;
  margin-top: 8px;
`;

const Glueded = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
  margin-top: 110px;
  cursor: pointer;
`;

const SearchInput = styled.div`
  @media (max-width: 650px) {
    display: none;
  }
`;