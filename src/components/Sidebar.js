import { useState, useEffect } from "react";
import styled from "styled-components";
import { getTrendingHashtags } from "../services/linkr";



export default function Sidebar() {

  const [trendingHashtags, setTrendingHashtags] = useState([]);

  useEffect(() => {

    const config = {
      headers: {
        Authorization: `Bearer `
      }
    };
    console.log(trendingHashtags);
    getTrendingHashtags()
      .then(res => {
        setTrendingHashtags(res.data);
      })
      .catch(res => {
        console.log(res.data);
        alert('Trending hashtags error');
      });
  }, []);

  return (
    <SidebarStyle>
      <Header>
        trending
      </Header>
      <HorizontalLine />
      <HashtagsWrapper>
        {trendingHashtags.length === 0 ? 'Carregando...' : trendingHashtags.map((value, index) => <p># {value}</p>)}
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
    font-weight: 700;
    font-size: 19px;
    margin-bottom: 15px;
  }
`;