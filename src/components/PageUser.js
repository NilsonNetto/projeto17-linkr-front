import { useState, useEffect, useContext } from "react";
import { mountHeaders, followUser, unfollowUser, getPageUser } from "../services/linkr";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import PostBox from "./PostBox";
import UserContext from "../context/UserContext";
import LoadingPage from "./LoadingPage.js";
import { ThreeDots } from "react-loader-spinner";

export default function UserPage() {
  const { id } = useParams();
  const [userPage, setUserPage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const [following, setFollowing] = useState(false);
  const [updateLike, setUpdateLike] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const profilePicture = localStorage.getItem("profilePicture");;

    if (token) {
      const getToken = JSON.parse(token);
      const getProfilePicture = JSON.parse(profilePicture);
      setUserData({ token: getToken, profilePicture: getProfilePicture });
      navigate(`/user/${id}`);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (userData) {
      const headers = mountHeaders(userData.token);

      const promise = getPageUser(id, headers);
      promise.then((res) => {
        setUserPage(res.data);
        setFollowing(res.data.follow);
        setIsLoading(false);
      });
    }
  }, [updateLike, userData, id]);

  function followAndUnfollow(userId) {
    setFollowLoading(true);
    const headers = mountHeaders(userData.token);

    if (following) {
      unfollowUser(userId, headers)
        .then(res => {
          setFollowing(false);
          setFollowLoading(false);
        })
        .catch(res => {
          console.log(res.message);
          alert('unfollow error');
          setFollowLoading(false);
        });
    } else {
      followUser(userId, headers)
        .then(res => {
          setFollowing(true);
          setFollowLoading(false);
        })
        .catch(res => {
          console.log(res.message);
          alert('follow error');
          setFollowLoading(false);
        });
    }
  }

  return (
    (isLoading ? (
      <LoadingPage />
    ) : (
      <>
        <Header />
        <Container>
          <TimelineBox>
            <Title follow={following}>
              <Username>{userPage?.username} 's posts</Username>
              <FollowButton follow={following} followLoading={followLoading} onClick={() => followAndUnfollow(id)}>
                {followLoading ?
                  (<ThreeDots height={13} color={following ? '#1877F2' : '#FFFFFF'} />) :
                  (following ? 'Unfollow' : 'Follow')
                }

              </FollowButton>
            </Title>
            <PostsWrapper>
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
            </PostsWrapper>
          </TimelineBox>
          <SidebarBox>
            <Sidebar />
          </SidebarBox>
        </Container>
      </>
    ))

  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 72px;
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
  pointer-events: ${({ followLoading }) => (followLoading ? 'none' : 'auto')};
`;

const TimelineBox = styled.div`
  width: 611px;
  margin-top: 78px;
  margin-bottom: 43px;
`;

const PostsWrapper = styled.div`
  margin-top: 13px;
`;
