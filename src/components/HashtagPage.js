import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mountHeaders, getHashtagByName } from "../services/linkr";
import Header from "./Header";
import Sidebar from "./Sidebar";
import PostBox from "./PostBox";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY2NjYxODgxNCwiZXhwIjoxNjY5MjEwODE0fQ.KzFhfszOkSswu6VhWTCOzOW7Xn5Sb_xrvLQAN0JxkyM';

export default function HashtagPage() {

  const [postsWithHashtag, setPostsWithHashtag] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [updateLike, setUpdateLike] = useState(false);
  const { hashtag } = useParams();

  useEffect(() => {

    const headers = mountHeaders(token);

    getHashtagByName(hashtag, headers)
      .then(res => {
        setPostsWithHashtag(res.data);
        setLoadingPosts(false);
      })
      .catch(res => {
        console.log(res.data);
        alert('Get posts with hashtags error');
      });
  }, [hashtag, updateLike]);

  return (
    <>
      <Header />
      <Container>
        <TimelineBox>
          <Title># {hashtag}</Title>
          <Posts>
            {loadingPosts ? (
              <>Loading...</>
            ) : (
              <>
                {postsWithHashtag.map((post, index) => {
                  return (
                    <PostBox
                      key={index}
                      id={post.id}
                      username={post.username}
                      profilePicture={post.profilePicture}
                      description={post.description}
                      url={post.url}
                      userLike={post.userLike}
                      postLikes={post.postLikes}
                      updateLike={updateLike}
                      setUpdateLike={setUpdateLike}
                    />
                  );
                })}
              </>
            )}
          </Posts>
        </TimelineBox>
        <SidebarBox>
          <Sidebar />
        </SidebarBox>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SidebarBox = styled.div`
  margin: 164px 0 0 25px;
  @media (max-width: 950px) {
    display: none;
  }
`;
const Title = styled.h1`
  font-size: 43px;
  font-weight: 700;
  font-family: "Oswald", sans-serif;
  margin-bottom: 43px;
`;

const TimelineBox = styled.div`
  width: 611px;
  margin-top: 78px;
`;
const Posts = styled.div`
  margin-top: 13px;
`;