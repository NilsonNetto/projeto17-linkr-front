import styled from "styled-components";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import {
  mountHeaders,
  likePost,
  unlikePost,
  newEditPost,
  deletePost,
  getComments,
  listLikes,
} from "../services/linkr.js";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import ReactHashtag from "@mdnm/react-hashtag";
import ReactTooltip from "react-tooltip";
import UserContext from "../context/UserContext.js";
import Modal from "react-modal";
import Comments from "./Comments.js";
import RepostsItens from "./RepostsItens.js";
import WriteComment from "./WriteComment.js";

export default function PostBox({
  id,
  userId,
  username,
  profilePicture,
  description,
  url,
  urlTitle,
  urlDescription,
  urlImage,
  setRefreshPage,
  refreshPage,
}) {
  const [userLikeId, setUserLikeId] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [postLikes, setPostLikes] = useState([]);
  const [timeToEdit, setTimeToEdit] = useState(false);
  const [newPost, setNewPost] = useState(description);
  const [disabled, setDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentsIsOpen, setCommentsIsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(false);
  const inputEditPost = useRef(null);
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  useEffect(() => {

    const headers = mountHeaders(userData.token);

    listLikes(id, headers)
      .then(res => {
        setUserLikeId(res.data.userId);
        setIsLiked(res.data.isLiked);
        setPostLikes(res.data.postLikes);
      })
      .catch(res => {
        console.log(res.data);
      });
  }, [isLiked]);

  function likesCount(likes) {

    if (likes.length === 0) {
      return "No one likes this, be the first!";
    }

    if (isLiked) {

      const filteredLikes = likes.filter((value) => value.userId !== userLikeId);

      switch (likes.length) {
        case 1:
          return "Você";
          break;
        case 2:
          return `Você e ${filteredLikes[0].username}`;
          break;
        default:
          return `Você, ${filteredLikes[0].username} e outras ${likes.length - 2
            } pessoas`;
      }
    } else {
      switch (likes.length) {
        case 1:
          return likes[0].username;
          break;
        case 2:
          return `${likes[0].username} e ${likes[1].username}`;
          break;
        default:
          return `${likes[0].username}, ${likes[1].username} 
          e outras ${likes.length - 2} pessoas`;
      }
    }
  }

  function likeAndDislike(postId) {
    const headers = mountHeaders(userData.token);

    if (isLiked) {
      unlikePost(postId, headers)
        .then((res) => {
          setIsLiked(false);
        })
        .catch((res) => {
          console.log(res.message);
          alert("unlike error");
        });
    } else {
      likePost(postId, headers)
        .then((res) => {
          setIsLiked(true);
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
    console.log("enviar nova edição");

    const headers = mountHeaders(userData.token);

    const dataPostEdited = { newPost, postId };

    newEditPost(dataPostEdited, headers)
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

  function confirmDeletePost({ postId }) {
    setLoading(true);

    const headers = mountHeaders(userData.token);

    deletePost(postId, headers)
      .then((res) => {
        setLoading(false);
        setRefreshPage(!refreshPage);
        console.log(res.data);
        setIsOpen(false);
      })
      .catch((err) => {
        setIsOpen(false);
        setLoading(false);
        console.log(err.response);
        alert("Error deleting post");
      });
  }

  useEffect(() => {
    const headers = mountHeaders(userData.token);
    getComments(id, headers)
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  }, [refreshComments]);

  function openComments() {
    setCommentsIsOpen(!commentsIsOpen);
  }

  return (
    <>
      <Post>
        <Left>
          <Link to={`/user/${userId}`}>
            <Img>
              <img src={profilePicture} alt="profile" />
            </Img>
          </Link>
          <Options>
            <Likes isLiked={isLiked}>
              <LikeHeart isLiked={isLiked} onClick={() => likeAndDislike(id)}>
                {isLiked ? <BsHeartFill /> : <BsHeart />}
              </LikeHeart>
              <a data-tip={likesCount(postLikes)}>
                {postLikes.length} likes
              </a>
            </Likes>
            <CommentsIcon>
              <AiOutlineComment
                style={{ cursor: "pointer" }}
                onClick={openComments}
              />
              <a>{comments.length} comments </a>
            </CommentsIcon>
            <Repost>
              <RepostsItens />
            </Repost>
          </Options>
        </Left>
        <Right>
          <Top>
            <Link to={`/user/${userId}`}>
              <Name>{username}</Name>
            </Link>
            {userId === userLikeId ? (
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
                      backgroundColor: "rgba(255, 255, 255, 0.4)",
                      zIndex: "2",
                    },
                    content: {
                      border: "none",
                      backgroundColor: "rgba(255, 255, 255, 0)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  }}
                >
                  <ModalContent>
                    {loading ? (
                      <RotatingLines
                        strokeColor="#1877f2"
                        strokeWidth="2"
                        animationDuration="1"
                        width="96"
                        visible={true}
                      />
                    ) : (
                      <>
                        <p>Are you sure you want to delete this post?</p>
                        <Buttons>
                          <button onClick={toggleModal}>No, go back</button>
                          <button
                            onClick={() => confirmDeletePost({ postId: id })}
                          >
                            Yes, delete it
                          </button>
                        </Buttons>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </Icons>
            ) : (
              ''
            )}

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
          <Metadata onClick={() => window.open(url)}>
            <UrlInfo>
              <UrlTitle>{urlTitle}</UrlTitle>
              <UrlDescription>{urlDescription}</UrlDescription>
              <Url>{url}</Url>
            </UrlInfo>
            <UrlImage>
              <img src={urlImage} alt="Image Error" />
            </UrlImage>
          </Metadata>
        </Right>
        <ReactTooltip place="bottom" type="light" effect="solid" />
      </Post>
      <RenderComments commentsIsOpen={commentsIsOpen}>
        {commentsIsOpen
          ? comments.map((cmt, i) => {
            return (
              <Comments
                key={i}
                comment={cmt.comment}
                username={cmt.commentUser}
                isFollowing={cmt.following}
                isAuthorPost={cmt.authorPost}
                profileImg={cmt.profilePicture}
                userId={cmt.userId}
              />
            );
          })
          : ""}
        <WriteComment
          postId={id}
          username={username}
          setRefreshComments={setRefreshComments}
          refreshComments={refreshComments}
        />
      </RenderComments>
    </>
  );
}
const Post = styled.div`
  height: 275px;
  width: 610px;
  border-radius: 16px;
  background-color: #171717;
  display: flex;
  padding: 20px;
  gap: 20px;
  z-index: 1;

  @media (max-width: 650px) {
    width: 100%;
    height: 232px;
    display: flex;
    justify-content: space-between;
    border-radius: 0;
    padding: 10px 15px 15px 15px;
  }
`;

const Left = styled.div`
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: blueviolet;

  @media (max-width: 650px) {
      height: 40px;
      width: 40px;
    }

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
    @media (max-width: 650px) {
      height: 40px;
      width: 40px;
    }
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-evenly;
  font-size: 20px;
  width: 80px;

  a {
    font-size: 13px;
    text-align: center;

    @media (max-width:650px) {
      font-size: 9px;
    }
  }
`;

const Likes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LikeHeart = styled.div`
  cursor: pointer;
  color: ${({ isLiked }) => (isLiked ? "red" : "white")};
`;

const CommentsIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Repost = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 503px;

  @media (max-width:650px) {
   width: 100% ;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width:650px) {
   width: 100%;
  }
`;

const Name = styled.div`
  font-size: 19px;
  font-family: "Lato", sans-serif;
  color: #ffffff;
  @media (max-width:650px) {
  font-size: 17px;
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50px;
  
  div{
    cursor: pointer;
  }
`;

const Hashtag = styled.span`
  font-weight: 700;
  cursor: pointer;
  color: #ffffff;
`;

const Description = styled.div`
  font-size: 17px;
  color: #B7B7B7;
  @media (max-width:650px) {
   font-size: 15px;
  }
`;

const Metadata = styled.div`
    height: 155px;
    width: 503px;
    border-radius: 16px;
    border: 1px solid #4D4D4D;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    @media (max-width:650px) {
    width:100%;
    height: 115px;
  }
`;

const UrlInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin: 25px 20px;
    width: 350px;

    @media (max-width:650px) {
    width: 100%;
    margin: 10px;
  }
`;

const UrlImage = styled.div`
  img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 153px;
    width: 153px;
    border-radius: 0 16px 16px 0;
    object-fit: cover;

    @media (max-width:650px) {
    width: 95px;
    height: 113px;
  }
  }
`;

const UrlTitle = styled.div`
  font-size: 16px;
  color: #CECECE;
  @media (max-width:650px) {
  font-size: 11px;
  }
`;
const UrlDescription = styled.div`
  max-height: 50px;
  font: 11px;
  color: #CECECE;
  word-break: break-all;
  overflow-y: hidden;

  @media (max-width:650px) {
    font-size: 9px;
  }
`;
const Url = styled.div`
  max-height: 50px;
  font-size: 11px;
  color: #CECECE;
  word-break: break-all;
  overflow-y: hidden;

  @media (max-width:650px) {
    font-size: 11px;
  }
`;

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

const ModalContent = styled.div`
  background-color: #333333;
  width: 600px;
  height: 262px;
  font-family: "Lato";
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 40px;

  @media (max-width:650px) {
    height: 150px;
  }

  p {
    width: 70%;
    font-size: 34px;
    color: #fff;
    text-align: center;
    font-weight: bold;
    line-height: 45px;

    @media (max-width:650px) {
      font-size: 20px;
      line-height: normal;
    }
  }
`;

const Buttons = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
  button {
    height: 36px;
    border-radius: 10px;
    font-size: 18px;
    border: solid 1px #333333;
    padding: 0 16px;

    @media (max-width:650px) {
      font-size: 15px;
    }

  }
  button:nth-child(1) {
    background-color: #fff;
    color: #1877f2;
  }
  button:nth-child(2) {
    background-color: #1877f2;
    color: #fff;
  }
`;

const RenderComments = styled.div`
  display: ${({ commentsIsOpen }) => (commentsIsOpen ? "initial" : "none")};
  margin-bottom: 40px;
  margin-top: -26px;
  width: 610px;

  @media (max-width: 650px) {
    height: auto;
    width: 100%;
  }
`;