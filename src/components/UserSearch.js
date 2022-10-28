import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import { mountHeaders, searchUser } from "../services/linkr";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

export default function UserSearch() {

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

  return (
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
  );
}

const Search = styled.div`
  z-index: 2;

  input {
    width: 50vw;
    max-width: 563px;
    height: 45px;
    background-color: #ffffff;
    border: none;
    border-radius: 8px;

    @media (max-width: 650px) {
   width: 100%;
   max-width: 100%;
  }
  }
  input::placeholder {
    font-size: 19px;
    line-height: 23px;
    color: #c6c6c6;
    padding: 15px;
  }


`;
const UserFind = styled.div`
  width: 50vw;
  max-width: 563px;
  position: absolute;
  top: 50px;
  border-radius: 10px;
  z-index: 1;

  @media (max-width:650px) {
    padding: 0 15px;
    top: 120px;
    left: 0;
    width: 100%;
    max-width: 100%;
  }
`;

const User = styled.div`
  width: 50vw;
  max-width: 563px;
  height: 40px;
  display: flex;
  margin: 0 auto;
  background: #e7e7e7;
  cursor: pointer;

  @media (max-width:650px) {
    width: 100%;
    max-width: 100%;
  }

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
