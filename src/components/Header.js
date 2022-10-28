import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { useContext, useState } from "react";
import { mountHeaders, searchUser } from "../services/linkr";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import UserContext from "../context/UserContext";

export default function Header() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const { userData } = useContext(UserContext);

  function find(value) {
    const headers = mountHeaders(userData.token);
    const promise = searchUser(value, headers);
    promise
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch(() => setUser([]));
  }
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
        <Search>
          <DebounceInput
            minLength={3}
            debounceTimeout={300}
            placeholder="Search for people"
            name="person"
            onChange={(e) => find(e.target.value)}
          />
          <UserFind>
            {!user.length > 0
              ? " "
              : user.map((u) => (
                <Link to={`/user/${u.id}`} key={u.id}>
                  <User>
                    <img src={u.profilePicture} />
                    <div>
                      <h1>{u.username}</h1>
                      <p>
                        {u.following !== null ? (
                          <span>
                            <div></div>
                            following
                          </span>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                  </User>
                </Link>
              ))}
          </UserFind>
        </Search>
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

const Search = styled.div`
  z-index: 2;
  input {
    width: 50vw;
    max-width: 563px;
    height: 45px;
    background-color: #ffffff;
    border: none;
    border-radius: 8px;
  }
  input::placeholder {
    font-size: 19px;
    line-height: 23px;
    color: #c6c6c6;
    padding: 15px;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;
const UserFind = styled.div`
  width: 50vw;
  max-width: 563px;
  position: fixed;
  top: 50px;
  border-radius: 10px;
  z-index: 1;
`;

const User = styled.div`
  width: 50vw;
  max-width: 563px;
  height: 40px;
  display: flex;
  margin: 0 auto;
  background: #e7e7e7;
  cursor: pointer;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: auto 10px;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #515151;
  }
  p {
    margin-left: 10px;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #c5c5c5;
    div {
      width: 5px;
      height: 5px;
      border-radius: 50px;
      background-color: #c5c5c5;
      margin-right: 3px;
    }
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
