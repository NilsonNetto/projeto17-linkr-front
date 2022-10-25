import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mountHeaders, getHashtagByName } from "../services/linkr";
import Header from "./Header";
import Sidebar from "./Sidebar";
import PostBox from "./PostBox";
import UserContext from "../context/UserContext";
import LoadingPage from "./LoadingPage.js";

export default function HashtagPage() {

  const [postsWithHashtag, setPostsWithHashtag] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateLike, setUpdateLike] = useState(false);
  const { hashtag } = useParams();
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const profilePicture = localStorage.getItem("profilePicture");;

    if (token) {
      const getToken = JSON.parse(token);
      const getProfilePicture = JSON.parse(profilePicture);
      setUserData({ token: getToken, profilePicture: getProfilePicture });
      navigate(`/hashtag/${hashtag}`);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {

    if (userData) {
      const headers = mountHeaders(userData.token);

      getHashtagByName(hashtag, headers)
        .then(res => {
          setPostsWithHashtag(res.data);
          setIsLoading(false);
        })
        .catch(res => {
          console.log(res.data);
          alert('Get posts with hashtags error');
        });
    }
  }, [hashtag, updateLike, userData]);

  return (isLoading ? (
    <LoadingPage />
  ) : (<>
    <Header />
    <Container>
      <TimelineBox>
        <Title># {hashtag}</Title>
        <Posts>
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
                  urlTitle={post.metadata.title}
                  urlDescription={post.metadata.description}
                  urlImage={post.metadata.image}
                  userLike={post.userLike}
                  postLikes={post.postLikes}
                  updateLike={updateLike}
                  setUpdateLike={setUpdateLike}
                />
              );
            })}
          </>
        </Posts>
      </TimelineBox>
      <SidebarBox>
        <Sidebar />
      </SidebarBox>
    </Container>
  </>)
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