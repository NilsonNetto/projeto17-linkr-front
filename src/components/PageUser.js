import { useState, useEffect } from "react";
import { getPageUser } from "../services/linkr";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import Header from "./Header";
import PostBox from "./PostBox";
export default function UserPage() {
  const { id } = useParams();
  console.log(id);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NjI4NTI3NCwiZXhwIjoxNjY4ODc3Mjc0fQ.XKUQZ1CZOy-FU8-ZIvv3Mz0NDgDFv5jeWjYYL6C6S3g";
  const [userPage, setUserPage] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  useEffect(() => {
    const promise = getPageUser(token, id);
    promise.then((res) => {
      setUserPage(res.data);
      setLoadingPosts(!loadingPosts);
    });
  }, []);
  console.log(userPage);
  return (
    <>
      <Header />
      <Container>
        <TimelineBox>
          <Title>{userPage?.username} 's posts</Title>
          <Posts>
            {loadingPosts ? (
              <>Loading...</>
            ) : (
              <>
                {userPage.posts.map((post, index) => {
                  return (
                    <PostBox
                      key={index}
                      id={post.id}
                      username={post.username}
                      profilePicture={post.profilePicture}
                      description={post.description}
                      url={post.url}
                      postLikes={post.postLikes}
                    />
                  );
                })}
              </>
            )}
          </Posts>
          <SidebarBox>
            <Sidebar />
          </SidebarBox>
        </TimelineBox>
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
`;

const TimelineBox = styled.div`
  width: 611px;
  margin-top: 78px;
`;
const Posts = styled.div`
  margin-top: 13px;
`;
