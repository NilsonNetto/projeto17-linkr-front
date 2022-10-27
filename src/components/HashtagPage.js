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
    setIsLoading(true);
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
      <Title># {hashtag}</Title>
      <Feed>
        <TimelineBox>
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
      </Feed>
    </Container>
  </>)
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 72px;
`;

const Title = styled.h1`
  width: 937px;
  font-size: 43px;
  font-weight: 700;
  font-family: "Oswald", sans-serif;
  margin-top: 78px;
  margin-bottom: 43px;
  text-align: left;

  @media (max-width: 950px) {
    width: 611px;
  }

  @media (max-width: 650px) {
    width: 100%;
    padding-left: 20px;
  }
`;

const Feed = styled.div`
  display: flex;

  @media (max-width: 650px) {
    width: 100%;
  }
`;

const TimelineBox = styled.div`
  width: 100%;
`;

const SidebarBox = styled.div`
  margin-left: 25px;
  @media (max-width: 950px) {
    display: none;
  }
`;

const Posts = styled.div`
  display:flex ;
  flex-direction: column;
  align-items: center;
  gap: 15px;;
`;