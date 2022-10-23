import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import { mountHeaders, searchUser } from "../services/linkr";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY2NjM5MjEzNCwiZXhwIjoxNjY4OTg0MTM0fQ.VsaUgWtuR8bcYYH0JH87hKHoATfkQGxIaB_dlq_bkpg';

export default function Header() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const headers = mountHeaders(token);


  function find(value) {
    console.log("eu");
    const promise = searchUser(value, headers);

    promise.then((res) => {
      setUser(res.data);
      console.log(user);
    });
  }
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Top>
      <Glueded>
        <Title><Link to='/timeline'>linkr</Link> </Title>
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
                    <p>{u.username}</p>
                  </User>
                </Link>
              ))}
          </UserFind>
        </Search>

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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-family: "Passion One", cursive;
  font-weight: 700;
  font-size: 49px;
  margin-left: 28px;
  margin-top: 10px;

  a{
    text-decoration: none;
    color: #ffffff;
  }
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
`;
const Search = styled.div`
  z-index: 2;
  input {
    width: 563px;
    height: 45px;
    background-color: #ffffff;
    border-radius: 8px;
  }
  input::placeholder {
    font-size: 19px;
    line-height: 23px;
    color: #c6c6c6;
    padding: 15px;
  }
`;
const UserFind = styled.div`
  position: fixed;
  top: 50px;
  border-radius: 10px;
  z-index: 1;
`;
const User = styled.div`
  width: 563px;
  display: flex;
  margin: 0 auto;
  background: #e7e7e7;
  cursor: pointer;
  img {
    width: 39px;
    height: 39px;
    border-radius: 304px;
    margin: auto 10px;
  }
  p {
    font-size: 19px;
    line-height: 23px;
    color: #515151;
  }
`;
