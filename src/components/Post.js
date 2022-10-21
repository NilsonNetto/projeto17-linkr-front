import styled from "styled-components";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useState } from "react";
import { likePost, unlikePost } from "../services/linkr";


export default function Post({ children }) {

  const [isLiked, setIsLiked] = useState(children.userLike);

  function likeAndDislike({ postId }) {

    const config = {
      headers: {
        Authorization: `Bearer `
      }
    };

    if (isLiked) {
      unlikePost(postId, config)
        .then(res => {
          console.log(res.data);
          setIsLiked(false);
        })
        .catch(res => {
          console.log(res.message);
          alert('like error');
        });

    } else {
      likePost(postId, config)
        .then(res => {
          console.log(res.data);
          setIsLiked(true);
        })
        .catch(res => {
          console.log(res.message);
          alert('like error');
        });
    }
  }

  return (
    <PostWrapper>
      <h1>{children.title}</h1>
      <PostLikes isLiked={isLiked} onClick={() => likeAndDislike(children.postId)}>
        {isLiked ? <BsHeartFill /> : <BsHeart />}
      </PostLikes>
    </PostWrapper>
  );
}

const PostWrapper = styled.div`
  width: 400px;
  height: 100px;
  padding: 10px;
  border: 1px solid red;
`;

const PostLikes = styled.div`
  width: 30px;
  height: 30px;
  margin-top: 20px;
  font-size: 20px;
  cursor: pointer;
  color: ${({ isLiked }) => isLiked ? 'red' : 'white'} ;
`;