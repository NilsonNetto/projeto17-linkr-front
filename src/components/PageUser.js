import { useState, useEffect, useContext } from "react";
import { mountHeaders, followUser, unfollowUser, getPageUser } from "../services/linkr";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import Header from "./Header";
import PostBox from "./PostBox";
import UserContext from "../context/UserContext";

export default function UserPage() {
  const { id } = useParams();
  const [userPage, setUserPage] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [updateLike, setUpdateLike] = useState(false);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const headers = mountHeaders(userData.token);

    const promise = getPageUser(id, headers);
    promise.then((res) => {
      setUserPage(res.data);
      setLoadingPosts(!loadingPosts);
    });
  }, [updateLike]);

  function followAndUnfollow(userId) {

    const headers = mountHeaders(userData.token);

    if (userPage.follow) {
      unfollowUser(userId, headers)
        .then(res => {
          console.log('unfollow');
        })
        .catch(res => {
          console.log(res.message);
          alert('unfollow error');
        });
    } else {
      followUser(userId, headers)
        .then(res => {
          console.log('follow');
        })
        .catch(res => {
          console.log(res.message);
          alert('follow error');
        });
    }
  }


  return (
    <>
      <Header />
      <Container>
        <TimelineBox>
          <Title follow={userPage.follow}>
            <Username>{userPage?.username} 's posts</Username>
            <FollowButton onClick={(id) => followAndUnfollow(id)}>{userPage.follow ? 'Unfollow' : 'Follow'}</FollowButton>
          </Title>
          <PostsWrapper>
            {loadingPosts ? (
              <>Loading...</>
            ) : (
              <>
                {userPage.posts.map((post, index) => {
                  return (
                    <PostBox
                      key={index}
                      id={post.id}
                      userId={post.userId}
                      username={post.username}
                      profilePicture={post.profilePicture}
                      description={post.description}
                      url={post.url}
                      urlTitle={post.metadata.title}
                      urlDescription={post.metadata.description}
                      urlImage={post.metadata.image}
                      postLikes={post.postLikes}
                      updateLike={updateLike}
                      setUpdateLike={setUpdateLike}
                    />
                  );
                })}
              </>
            )}
          </PostsWrapper>
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
const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Username = styled.div`
  font-size: 43px;
  font-weight: 700;
  font-family: "Oswald", sans-serif;
`;

const FollowButton = styled.div`
  width: 115px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ follow }) => (follow ? "#1877F2" : "#FFFFFF")};
  background-color: ${({ follow }) => (follow ? "#FFFFFF" : "#1877F2")};
  border-radius: 5px;
  cursor: pointer;
`;

const TimelineBox = styled.div`
  width: 611px;
  margin-top: 78px;
  margin-bottom: 43px;
`;

const PostsWrapper = styled.div`
  margin-top: 13px;
`;
