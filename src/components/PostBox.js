import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { mountHeaders, likePost, unlikePost } from "../services/linkr";

import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ReactHashtag from "@mdnm/react-hashtag";
import ReactTooltip from "react-tooltip";
import DeletePost from "./DeletePost.js";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NjU1NzgzMCwiZXhwIjoxNjY5MTQ5ODMwfQ.dJ4EIEnNVZ9yFuZTdDR8jDhT1OXd5QDvHYWMiEcIpUk';

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
  setUpdateLike
}) {
  const [isLiked, setIsLiked] = useState(userLike);
  const navigate = useNavigate();

  function likesCount(likes) {

    if (likes[0] === null) {
      return 'No one likes this, be the first!';
    }

    if (userLike) {
      const filteredLikes = likes.filter(value => value !== username);

      switch (likes.length) {
        case 1: return 'Você'; break;
        case 2: return `Você e ${filteredLikes[0]}`; break;
        default: return `Você, ${filteredLikes[0]} e outras ${likes.length - 2} pessoas`;
      }
    } else {
      switch (likes.length) {
        case 1: return likes[0]; break;
        case 2: return `${likes[0]} e ${likes[1]}`; break;
        default: return `${likes[0]}, ${likes[1]} e outras ${likes.length - 2} pessoas`;
      }
    };

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
          <a data-tip={likesCount(postLikes)}>{postLikes[0] === null ? 0 : postLikes.length} likes</a>

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
              <FaPencilAlt />
            </div>
            <div>
              <FaTrash onClick={DeletePost}/>
            </div>
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
            {description}
          </ReactHashtag>
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
