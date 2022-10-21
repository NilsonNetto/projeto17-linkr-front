import styled from "styled-components";
import Post from "./Post";

const posts = [
  { postId: 1, title: "titulo post 01", description: "descrição do post #react #teste", userLike: true },
  { postId: 2, title: "titulo post 02", description: "descrição do post #belezinha #teste", userLike: false },
  { postId: 3, title: "titulo post 03", description: "descrição do post #react ##", userLike: false },
  { postId: 4, title: "titulo post 04", description: "descrição do post #react #xuxu", userLike: true },
  { postId: 5, title: "titulo post 05", description: "descrição do post #react #teste", userLike: true },
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

