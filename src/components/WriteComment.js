import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import UserContext from "../context/UserContext";
import { postComment, mountHeaders } from "../services/linkr.js";

export default function WriteComment({
  postId,
  username,
  setRefreshComments,
  refreshComments,
}) {
  const { userData } = useContext(UserContext);
  const [writeComment, setWriteComment] = useState("");

  function sendComment() {
    if (writeComment === "") {
      return alert("write a comment...");
    }
    const body = { postId, comment: writeComment };
    const headers = mountHeaders(userData.token);

    postComment(body, headers)
      .then(() => {
        setRefreshComments(!refreshComments);
        setWriteComment("");
      })
      .catch((err) => console.log(err));
  }

  function cancelOrSend(e) {
    const key = e.keyCode;
    const ESC = 27;
    const ENTER = 13;
    if (key === ESC) {
      setWriteComment("");
    }
    if (key === ENTER) {
      sendComment();
      setWriteComment("");
    }
  }

  return (
    <ContainerWrite>
      <ImageProfile>
        <img src={userData.profilePicture} alt={`image profile ${username}`} />
      </ImageProfile>
      <input
        onChange={(e) => setWriteComment(e.target.value)}
        value={writeComment}
        onKeyDown={(e) => cancelOrSend(e)}
        placeholder="write a comment..."
      ></input>
      <IconSend>
        <FiSend onClick={sendComment} />
      </IconSend>
    </ContainerWrite>
  );
}

const ContainerWrite = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #1e1e1e;
  padding: 20px;
  position: relative;
  border-radius: 0 0 16px 16px;

  input {
    width: 90%;
    height: 40px;
    background-color: #252525;
    color: #acacac;
    border: solid 1px #1e1e1e;
    padding: 10px;
    border-radius: 10px;
  }

  input::placeholder {
    color: #575757;
    font-style: italic;
  }
`;

const IconSend = styled.div`
  position: absolute;
  bottom: 30px;
  right: 36px;
  font-size: 16px;
  color: #acacac;
  cursor: pointer;
`;

const ImageProfile = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 18px;
  img {
    border-radius: 50px;
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
`;
