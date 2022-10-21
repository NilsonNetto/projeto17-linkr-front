import styled from "styled-components";
import Post from "./Post";

const posts = [
  { postId: 1, title: "titulo post 01", userLike: true },
  { postId: 2, title: "titulo post 02", userLike: false },
  { postId: 3, title: "titulo post 03", userLike: false },
  { postId: 4, title: "titulo post 04", userLike: true },
  { postId: 5, title: "titulo post 05", userLike: true },
];

export default function Likes() {

  return (
    <PostsBox>
      {posts.map((post) => <Post key={post.postId}>{post}</Post>)}
    </PostsBox>
  );
}

const PostsBox = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

