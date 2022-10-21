import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import { searchUser } from "../services/linkr";
import { Link, Navigate } from "react-router-dom";
export default function Header() {
  const [user, setUser] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NjI4NTI3NCwiZXhwIjoxNjY4ODc3Mjc0fQ.XKUQZ1CZOy-FU8-ZIvv3Mz0NDgDFv5jeWjYYL6C6S3g";
  function find(value) {
    const promise = searchUser(token, value);
    promise.then((res) => setUser(res.data));
  }
  console.log(user);
  console.log("PASSEI AQUI");
  return (
    <Top>
      <Title>linkr</Title>
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
                  <User onClick={() => Navigate}>
                    <img src={u.profilePicture} />
                    <p>{u.username}</p>
                  </User>
                </Link>
              ))}
        </UserFind>
      </Search>

      <Logout>
        <ion-icon name="chevron-down-outline"></ion-icon>
        <Img></Img>
      </Logout>
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
`;

const Logout = styled.div`
  display: flex;
  align-items: center;
  margin-right: 26px;

  ion-icon[name="chevron-down-outline"] {
    height: 20px;
    width: 30px;
  }
`;

const Img = styled.div`
  height: 53px;
  width: 53px;
  border-radius: 26.5px;
  background-color: aqua;
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
