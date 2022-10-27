import styled from "styled-components";

export default function Comments({
  key,
  comment,
  username,
  isFollowing,
  isAuthorPost,
  postId,
  profileImg,
  userId,
}) {
  return (
    <OpenComments>
      <Container>
        <ImageProfile>
          <img src={profileImg} alt={`Profile picture of ${username}`} />
        </ImageProfile>

        <ContainerComments>
          <InfoProfile>
            <h1> {username} </h1>
            {isFollowing ? (
              <>
                <div className="dot"></div> <h2> following </h2>
              </>
            ) : (
              ""
            )}
            {isAuthorPost ? (
              <>
                <div className="dot"></div> <h2> post's author </h2>
              </>
            ) : (
              ""
            )}
          </InfoProfile>

          <Comment>{comment}</Comment>
        </ContainerComments>
      </Container>
      <div className="diviser"></div>
    </OpenComments>
  );
}

const OpenComments = styled.div`
  background-color: #1e1e1e;
  width: 100%;
  height: auto;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;

  :first-child {
    padding-top: 20px;
  }

  .diviser {
    width: 100%;
    height: 1px;
    border-radius: 50px;
    background-color: #353535;
    margin: 16px 0;
  }
`;

const Container = styled.div`
  display: flex;
`;

const ImageProfile = styled.div`
  width: 40px;
  height: 40px;
  img {
    border-radius: 50px;
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
`;

const ContainerComments = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18px;
`;

const InfoProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  h1 {
    color: #fff;
    font-weight: 700;
  }

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50px;
    background-color: #565656;
    margin: 0 6px;
  }

  h2 {
    color: #565656;
  }
`;

const Comment = styled.div`
  color: #acacac;
  line-height: 20px;
`;
