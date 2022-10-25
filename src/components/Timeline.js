import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import { mountHeaders, postPost, getPosts, deletePost } from "./../services/linkr";
import Header from "./Header";
import PostBox from "./PostBox";
import Sidebar from "./Sidebar";
import LoadingPage from "./LoadingPage";

export default function Timeline() {
  const [form, setForm] = useState({ description: "", link: "" });
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      navigate(`/timeline`);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    updating();
  }, [updateLike, userData]);

  async function updating() {

    if (userData) {
      const headers = mountHeaders(userData.token);

      await getPosts(headers)
        .then((resposta) => {
          setPosts(resposta.data);
          setIsLoading(false);
        })
        .catch((resposta) => {
          console.log(resposta);
          setIsLoading(false);
        });
    }
  }

  function post(event) {
    event.preventDefault();
    setLoading(true);

    const headers = mountHeaders(userData.token);
    const body = {
      description: form.description,
      link: form.link,
    };

    postPost(body, headers)
      .then((resposta) => {
        console.log(resposta);
        setLoading(false);
        setForm({ description: "", link: "" });
        updating();
      })
      .catch((resposta) => {
        console.log(resposta);
        alert("Houve um erro ao publicar seu link");
        setLoading(false);
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
      );
    } else {
      return (
        <>There are no posts yet</>
      );
    }
  }

  return (
    isLoading ? (
      <LoadingPage />
    ) : (
      <>
        <Header />
        <Container>
          <TimelineBox>
            <Title>timeline</Title>
            <Publish>
              <ImgDiv>
                <Img>
                  <img src={userData.profilePicture} alt='profile-pic' />
                </Img>
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
                    disabled={loading}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                  />
                  <InputDescription
                    type="text"
                    name="description"
                    value={form.description}
                    placeholder="Awesome article about #Javascript"
                    disabled={loading}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                  <button type="submit">
                    {loading ? <>Publishing...</> : <>Publish</>}
                  </button>
                </Form>
              </FormDiv>
            </Publish>
            <Posts>{postsLoading()}</Posts>
          </TimelineBox>
          <SidebarBox>
            <Sidebar />
          </SidebarBox>
        </Container>
      </>
    )
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TimelineBox = styled.div`
  width: 611px;
  margin-top: 78px;
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

const Publish = styled.div`
  height: 209px;
  width: 611px;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
`;

const ImgDiv = styled.div`
  margin-right: 21px;
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

const FormDiv = styled.div``;

const PublishTitle = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 20px;
  color: #707070;
  margin-top: 21px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 22px;

  input {
    width: 503px;
    background-color: #efefef;
    border-radius: 5px;
    border: #efefef;
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
  margin-top: 5px;

  ::placeholder {
    color: #949494;
    font-family: "Lato", sans-serif;
    font-size: 15px;
    padding-left: 13px;
    display: flex;
    justify-content: center;
  }
`;

const Posts = styled.div`
  margin-top: 13px;
`;
