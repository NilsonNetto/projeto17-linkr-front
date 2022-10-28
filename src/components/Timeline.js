import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import {
  mountHeaders,
  postPost,
  getPosts,
  getNewPosts
} from "./../services/linkr";
import Header from "./Header";
import PostBox from "./PostBox";
import Sidebar from "./Sidebar";
import LoadingPage from "./LoadingPage";
import { ThreeDots } from "react-loader-spinner";
import useInterval from "use-interval";
import { ImSpinner11 } from "react-icons/im";

export default function Timeline() {
  const [form, setForm] = useState({ description: "", link: "" });
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingPublish, setLoadingPublish] = useState(false);
  const [loadingNewPosts, setLoadingNewPosts] = useState(false);
  const [postsNumber, setPostsNumber] = useState(0);
  const [newPosts, setNewPosts] = useState(0);
  const [posts, setPosts] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const profilePicture = localStorage.getItem("profilePicture");

    if (token) {
      const getToken = JSON.parse(token);
      const getProfilePicture = JSON.parse(profilePicture);
      setUserData({ token: getToken, profilePicture: getProfilePicture });
      navigate(`/timeline`);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setLoadingPosts(true);
      const headers = mountHeaders(userData.token);

      getPosts(headers)
        .then((resposta) => {
          setPosts(resposta.data);
          setPostsNumber(resposta.data.length);
          setLoadingPosts(false);
          setLoadingPage(false);
          setLoadingNewPosts(false);
        })
        .catch((resposta) => {
          console.log(resposta);
          setLoadingPosts(false);
          setLoadingPage(false);
        });
    }
  }, [refreshPage, userData, loadingPublish, loadingNewPosts]);

  function post(event) {
    event.preventDefault();
    setLoadingPublish(true);
    setLoadingPosts(true);

    const headers = mountHeaders(userData.token);
    const body = {
      description: form.description,
      link: form.link,
    };

    postPost(body, headers)
      .then((resposta) => {
        console.log(resposta);
        setLoadingPublish(false);
        setForm({ description: "", link: "" });
        setRefreshPage(!refreshPage);
      })
      .catch((resposta) => {
        console.log(resposta);
        alert("Houve um erro ao publicar seu link");
        setLoadingPublish(false);
        setForm({ description: "", link: "" });
      });
  }

  function postsLoading() {
    if (posts.length > 0) {
      return (
        <>
          {posts.map((post, index) => {
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
                setRefreshPage={setRefreshPage}
                refreshPage={refreshPage}
              />
            );
          })}
        </>
      );
    } else if (posts.message) {
      return `${posts.message}`;
    }
  }

  useInterval(async () => {
    if (userData) {
      const headers = mountHeaders(userData.token);

      await getNewPosts(headers)
        .then((resposta) => {
          if (resposta.data > postsNumber) {
            setNewPosts(resposta.data - postsNumber);
          }
          console.log(newPosts);

        })
        .catch((resposta) => {
          console.log(resposta);
        });
    }
  }, 15000);

  return loadingPage ? (
    <LoadingPage />
  ) : (
    <>
      <Header />
      <Container>
        <Title>timeline</Title>
        <Feed>
          <TimelineBox>
            <Publish>
              <ImgDiv>
                <Img src={userData.profilePicture} alt="profile-pic" />
              </ImgDiv>
              <FormDiv>
                <PublishTitle>What are you going to share today?</PublishTitle>
                <Form onSubmit={post}>
                  <InputLink
                    type="url"
                    name="link"
                    value={form.link}
                    placeholder="https://..."
                    required
                    disabled={loadingPublish}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                  />
                  <InputDescription
                    type="text"
                    name="description"
                    value={form.description}
                    placeholder="Awesome article about #Javascript"
                    disabled={loadingPublish}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                  <button type="submit">
                    {loadingPublish ? (
                      <ThreeDots height={13} color={"white"} />
                    ) : (
                      <>Publish</>
                    )}
                  </button>
                </Form>
              </FormDiv>
            </Publish>
            <Load>
              {newPosts > 0 ?
                <LoadButton onClick={() => {
                  setNewPosts(0);
                  setLoadingNewPosts(true);
                }}>
                  {`${newPosts} new posts, load more!`}
                  <Icon>
                    <ImSpinner11 />
                  </Icon>
                </LoadButton>
                :
                <></>
              }
            </Load>
            <Posts>
              {loadingPosts ? (
                <ThreeDots height={40} color={"white"} />
              ) : (
                postsLoading()
              )}</Posts>
          </TimelineBox>
          <SidebarBox>
            <Sidebar />
          </SidebarBox>
        </Feed>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 72px;
`;

const Title = styled.div`
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
  margin-left:25px;
  @media (max-width: 950px) {
    display: none;
  }
`;

const Publish = styled.div`
  height: 209px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  margin-bottom: 15px;  
  @media (max-width:650px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0px;
    box-shadow: 0 4px 4px 0 rgba(0,0,0,0.25);
  }
`;

const ImgDiv = styled.div`
  margin-right: 21px;
  @media (max-width: 650px) {
    display: none;
  }
`;

const Img = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 26.5px;
  background-color: #707070;
  margin-top: 16px;
  margin-left: 18px;
`;

const FormDiv = styled.div`
  @media (max-width: 650px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const PublishTitle = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 20px;
  color: #707070;
  margin-top: 21px;
  margin-bottom: 10px;
  @media (max-width: 650px) {
    width: 100%;
    margin: 15px 0;
    text-align: center;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 22px;
  gap: 5px;
  @media (max-width: 650px) {
    width: 100%;
    padding: 0 15px;
    margin: 0;
  }
  input {
    width: 503px;
    background-color: #efefef;
    border-radius: 5px;
    border: #efefef;
    @media (max-width: 650px) {
      width: 100%;
    }
  }
  button {
    height: 31px;
    width: 112px;
    border-radius: 5px;
    background-color: #1877f2;
    border: #1877f2;
    margin-top: 5px;
    color: #ffffff;
    font-size: 14px;
    font-family: "Lato", sans-serif;
    @media (max-width: 650px) {
      height: 20px;
    }
  }
`;

const InputLink = styled.input`
  height: 30px;
  ::placeholder {
    color: #949494;
    font-family: "Lato", sans-serif;
    font-size: 15px;
    padding-left: 13px;
  }
`;

const InputDescription = styled.input`
  height: 66px;
  ::placeholder {
    color: #949494;
    font-family: "Lato", sans-serif;
    font-size: 15px;
    padding-left: 13px;
    display: flex;
    justify-content: center;
  }
`;

const Load = styled.div``;

const LoadButton = styled.div`
  height: 61px;
  width: 611px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: #1877F2;
  margin-top: 40px;
  margin-bottom: 14px;
  font-family: "Lato", sans-serif;
  font-size: 16px;
  color: #FFFFFF;
`;

const Icon = styled.div`
  margin-left: 10px;
`;

const Posts = styled.div`
  display:flex ;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;