import styled from "styled-components";
import { useState, useRef, useEffect, React } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  mountHeaders,
  likePost,
  unlikePost,
  newEditPost,
  deletePost,
} from "../services/linkr.js";

import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ReactHashtag from "@mdnm/react-hashtag";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NjU1NzgzMCwiZXhwIjoxNjY5MTQ5ODMwfQ.dJ4EIEnNVZ9yFuZTdDR8jDhT1OXd5QDvHYWMiEcIpUk";

export default function PostBox({
  id,
  userId,
  username,
  profilePicture,
  description,
  url,
  userLike,
  postLikes,
  updateLike,
  setUpdateLike,
}) {
  const [isLiked, setIsLiked] = useState(userLike);
  const [timeToEdit, setTimeToEdit] = useState(false);
  const [newPost, setNewPost] = useState(description);
  const [disabled, setDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputEditPost = useRef(null);
  const navigate = useNavigate();

  function likesCount(likes) {
    if (likes[0] === null) {
      return "No one likes this, be the first!";
    }

    if (userLike) {
      const filteredLikes = likes.filter((value) => value !== username);

      switch (likes.length) {
        case 1:
          return "Você";
          break;
        case 2:
          return `Você e ${filteredLikes[0]}`;
          break;
        default:
          return `Você, ${filteredLikes[0]} e outras ${
            likes.length - 2
          } pessoas`;
      }
    } else {
      switch (likes.length) {
        case 1:
          return likes[0];
          break;
        case 2:
          return `${likes[0]} e ${likes[1]}`;
          break;
        default:
          return `${likes[0]}, ${likes[1]} e outras ${
            likes.length - 2
          } pessoas`;
      }
    }
  }

  function likeAndDislike(postId) {
    const headers = mountHeaders(token);

    if (isLiked) {
      unlikePost(postId, headers)
        .then((res) => {
          setIsLiked(false);
          setUpdateLike(!updateLike);
        })
        .catch((res) => {
          console.log(res.message);
          alert("unlike error");
        });
    } else {
      likePost(postId, headers)
        .then((res) => {
          setIsLiked(true);
          setUpdateLike(!updateLike);
        })
        .catch((res) => {
          console.log(res.message);
          alert("like error");
        });
    }
  }

  function redirectHashtag(hashtag) {
    const redirect = hashtag.replace("#", "");
    navigate(`/hashtag/${redirect}`);
  }

  function editPost() {
    setNewPost(newPost);
    setTimeToEdit(!timeToEdit);
  }

  function sendEditPost(postId) {
    setDisabled(true);
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2NjM4Mzg0OCwiZXhwIjoxNjY4OTc1ODQ4fQ.Aq7PPccAwE-izvSBFx_458Bsvddju1Yp0WOetfnBmIo`,
      },
    };

    const dataPostEdited = { newPost, postId };

    newEditPost(dataPostEdited, config)
      .then((res) => {
        setDisabled(false);
        setNewPost(res.data);
        setTimeToEdit(false);
      })
      .catch((err) => {
        alert("Error editing the post!");
        setDisabled(false);
      });
  }

  useEffect(() => {
    if (timeToEdit) {
      inputEditPost.current.focus();
    }
  }, [timeToEdit]);

  function cancelOrSend({ e, postId }) {
    const key = e.keyCode;
    const ESC = 27;
    const ENTER = 13;
    if (key === ESC) {
      setTimeToEdit(false);
      setNewPost(description);
    }
    if (key === ENTER) {
      sendEditPost(postId);
    }
  }

  function openChoicesForDelete() {
    setIsOpen(true);
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function confirmDeletePost(postId) {
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2NjM4Mzg0OCwiZXhwIjoxNjY4OTc1ODQ4fQ.Aq7PPccAwE-izvSBFx_458Bsvddju1Yp0WOetfnBmIo`,
      },
    };
    const dataDelete = { postId };
    console.log(postId);
    console.log(config);
    deletePost(dataDelete, config)
      .then((res) => {
        //adicionar loading
        console.log(res.data);
        setIsOpen(false);
      })
      .catch((err) => {
        setIsOpen(false);
        console.log(err.response);
        alert("Error deleting post");
      });
  }

  return (
    <Post>
      <Left>
        <Link to={`/user/${userId}`}>
          <Img>
            <img src={profilePicture} alt="profile" />
          </Img>
        </Link>
        <Likes isLiked={isLiked}>
          <LikeHeart isLiked={isLiked} onClick={() => likeAndDislike(id)}>
            {isLiked ? <BsHeartFill /> : <BsHeart />}
          </LikeHeart>
          <a data-tip={likesCount(postLikes)}>
            {postLikes[0] === null ? 0 : postLikes.length} likes
          </a>
        </Likes>
      </Left>
      <Right>
        <Top>
          <Link to={`/user/${userId}`}>
            {" "}
            <Name>{username}</Name>
          </Link>
          <Icons>
            <div>
              <FaPencilAlt onClick={editPost} />
            </div>
            <div>
              <FaTrash onClick={openChoicesForDelete} />
            </div>

            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              style={{
                overlay: {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
                content: {
                  width: "60%",
                  height: "20%",
                  marginTop: "30%",
                  marginRight: "20%",
                  marginLeft: "20%",
                  border: "1px solid #ccc",
                  background: "#fff",
                  overflow: "auto",
                  borderRadius: "4px",
                  outline: "none",
                  padding: "20px",
                },
              }}
            >
              <p>Are you sure you want to delete this post?</p>
              <button onClick={toggleModal}>No, go back</button>
              <button onClick={() => confirmDeletePost({ postId: id })}>
                Yes, delete it
              </button>
            </Modal>
          </Icons>
        </Top>
        <Description>
          <ReactHashtag
            renderHashtag={(hashtagValue) => (
              <Hashtag onClick={() => redirectHashtag(hashtagValue)}>
                {hashtagValue}
              </Hashtag>
            )}
          >
            {timeToEdit ? "" : newPost}
          </ReactHashtag>
          {timeToEdit ? (
            <InputNewPost>
              <input
                name="newPost"
                onChange={(e) => setNewPost(e.target.value)}
                value={newPost}
                ref={inputEditPost}
                onKeyDown={(e) => cancelOrSend({ e, postId: id })}
                disabled={disabled}
              />
            </InputNewPost>
          ) : (
            ""
          )}
        </Description>
        <Url>{url}</Url>
      </Right>
      <ReactTooltip place="bottom" type="light" effect="solid" />
    </Post>
  );
}
const Post = styled.div`
  height: 276px;
  width: 611px;
  border-radius: 16px;
  background-color: #171717;
  display: flex;
  margin-bottom: 13px;
`;

const Left = styled.div`
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 18px;
`;

const Img = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 26.5px;
  margin-top: 17px;
  background-color: blueviolet;

  img {
    height: 50px;
    width: 50px;
    border-radius: 26.5px;
    object-fit: fill;
  }
`;

const Likes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 19px;
`;

const LikeHeart = styled.div`
  width: 30px;
  height: 30px;
  margin-top: 20px;
  font-size: 20px;
  cursor: pointer;
  color: ${({ isLiked }) => (isLiked ? "red" : "white")};
`;

const LikeCount = styled.div`
  font-size: 11px;
  font-family: "Lato", sans-serif;
  color: #ffffff;
  margin-top: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 19px;

  div {
    font-size: 11px;
    font-family: "Lato", sans-serif;
    color: #ffffff;
    margin-top: 5px;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 17px;
  margin-left: 18px;
  width: 503px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div`
  font-size: 19px;
  font-family: "Lato", sans-serif;
  color: #ffffff;
`;

const Icons = styled.div`
  display: flex;
`;

const Hashtag = styled.span`
  font-weight: 700;
  cursor: pointer;
`;

const Description = styled.div``;

const Url = styled.div``;

const InputNewPost = styled.div`
  margin: 6px 0 6px 0;
  input {
    background-color: #fff;
    color: #4c4c4c;
    border-radius: 7px;
    border: solid 1px #171717;
    padding: 6px;
    width: 90%;
    height: auto;
  }
  input:disabled {
    background-color: #d9d9d9;
    color: #4c4c4c;
  }
`;
