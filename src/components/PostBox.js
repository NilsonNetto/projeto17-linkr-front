import { useEffect } from "react";
import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

export default function PostBox({
  id,
  username,
  profilePicture,
  description,
  url,
  userLike,
  postLikes,
}) {
  return (
    <Post>
      <Left>
        <Img>
          <img src={profilePicture} alt="profile" />
        </Img>
        <Likes>
          <div>
            <AiOutlineHeart />
          </div>
          <div>likes</div>
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
        <Description>{description}</Description>
        <Link>{url}</Link>
      </Right>
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

const Description = styled.div``;

const Link = styled.div``;
