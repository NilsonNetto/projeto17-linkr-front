import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { likePost, unlikePost } from "../services/linkr";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ReactHashtag from "@mdnm/react-hashtag";
import ReactTooltip from "react-tooltip";

export default function PostBox({
  id,
  username,
  profilePicture,
  description,
  url,
  userLike,
  postLikes,
}) {
  const [isLiked, setIsLiked] = useState(userLike);
  const navigate = useNavigate();

  function likesCount(likes) {

    if (userLike) {

      const filteredLikes = likes.filter(value => value !== username);

      switch (likes.length) {
        case 0: return 'Erro'; break;
        case 1: return 'Você'; break;
        case 2: return `Você e ${filteredLikes[0]}`; break;
        default: return `Você, ${filteredLikes[0]} e outras ${likes.length - 2} pessoas`;
      }
    }
    switch (likes.length) {
      case 0: return 'No one likes this, be the first!'; break;
      case 1: return likes[0]; break;
      case 2: return `${likes[0]} e ${likes[1]}`; break;
      default: return `${likes[0]}, ${likes[1]} e outras ${likes.length - 2} pessoas`;
    };
  }

  function likeAndDislike({ postId }) {
    const config = {
      headers: {
        Authorization: `Bearer `,
      },
    };

    if (isLiked) {
      unlikePost(postId, config)
        .then((res) => {
          console.log(res.data);
          setIsLiked(false);
        })
        .catch((res) => {
          console.log(res.message);
          alert("unlike error");
        });
    } else {
      likePost(postId, config)
        .then((res) => {
          console.log(res.data);
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

  return (
    <Post>
      <Left>
        <Img>
          <img src={profilePicture} alt="profile" />
        </Img>
        <Likes isLiked={isLiked}>
          <LikeHeart isLiked={isLiked} onClick={() => likeAndDislike(id)}>
            {isLiked ? <BsHeartFill /> : <BsHeart />}
          </LikeHeart>
          <a data-tip={likesCount(postLikes)}>{postLikes.length} likes</a>
        </Likes>
      </Left>
      <Right>
        <Top>
          <Name>{username}</Name>
          <Icons>
            <div>
              <FaPencilAlt />
            </div>
            <div>
              <FaTrash />
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
        <Link>{url}</Link>
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

const Link = styled.div``;
