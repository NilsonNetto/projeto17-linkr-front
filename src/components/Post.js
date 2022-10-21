import styled from "styled-components";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useState } from "react";
import { likePost, unlikePost } from "../services/linkr";
import ReactHashtag from "@mdnm/react-hashtag";
import { useNavigate } from "react-router-dom";


export default function Post({ children }) {

  const [isLiked, setIsLiked] = useState(children.userLike);
  const navigate = useNavigate();

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
          alert('unlike error');
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

  function redirectHashtag(hashtag) {
    const redirect = hashtag.replace('#', '');
    navigate(`/hashtag/${redirect}`);
  }


  return (
    <PostWrapper>
      <h1>{children.title}</h1>
      <Description>
        <ReactHashtag
          renderHashtag={(hashtagValue) => <Hashtag onClick={() => redirectHashtag(hashtagValue)}>{hashtagValue}</Hashtag>}>
          {children.description}
        </ReactHashtag>
      </Description>
      <PostLikes isLiked={isLiked} onClick={() => likeAndDislike(children.postId)}>
        {isLiked ? <BsHeartFill /> : <BsHeart />}
      </PostLikes>
    </PostWrapper >
  );
}

const PostWrapper = styled.div`
  width: 400px;
  height: 100px;
  padding: 10px;
  border: 1px solid red;
`;

const Description = styled.div`
  width: 100%;
  color: white;
  font-size: 18px;
`;

const PostLikes = styled.div`
  width: 30px;
  height: 30px;
  margin-top: 20px;
  font-size: 20px;
  cursor: pointer;
  color: ${({ isLiked }) => isLiked ? 'red' : 'white'} ;
`;

const Hashtag = styled.span`
  font-weight: 700;
  cursor: pointer;
`;