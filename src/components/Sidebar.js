import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import { mountHeaders, getTrendingHashtags } from "../services/linkr";

export default function Sidebar({ loadingPublish, loadingNewPosts, refreshPage }) {

  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  useEffect(() => {

    const headers = mountHeaders(userData.token);

    getTrendingHashtags(headers)
      .then(res => {
        setTrendingHashtags(res.data);
      })
      .catch(res => {
        console.log(res.data);
        alert('Trending hashtags error');
      });
  }, [loadingPublish, loadingNewPosts, refreshPage]);

  function hashtagPage(hashtag) {
    navigate(`/hashtag/${hashtag}`);
  }


  return (
    <SidebarStyle>
      <Header>
        trending
      </Header>
      <HorizontalLine />
      <HashtagsWrapper>
        {trendingHashtags.length === 0 ?
          'Carregando...' :
          trendingHashtags.map((value, index) => <p key={index} onClick={() => hashtagPage(value.name)}># {value.name}</p>)}
      </HashtagsWrapper>
    </SidebarStyle>
  );
}

const SidebarStyle = styled.div`
  width: 300px;
  background-color: #171717;
  border-radius: 16px;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
  margin: 15px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #484848;
`;

const HashtagsWrapper = styled.div`
  width: 100%;
  margin: 15px;

  p{
    cursor: pointer;
    font-weight: 700;
    font-size: 19px;
    margin-bottom: 15px;
  }
`;