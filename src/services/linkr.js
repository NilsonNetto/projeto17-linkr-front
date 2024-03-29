import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.REACT_APP_API_BASE_URL;

function mountHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function postSignin(body) {
  return axios.post(`${URL}/signin`, body);
}

function postSignup(body) {
  return axios.post(`${URL}/signup`, body);
}

function getTrendingHashtags(headers) {
  return axios.get(`${URL}/hashtags`, headers);
}

function getHashtagByName(hashtag, headers) {
  return axios.get(`${URL}/hashtags/${hashtag}`, headers);
}

function postPost(body, headers) {

  return axios.post(`${URL}/publish`, body, headers);
}

function getPosts(headers, offset) {
  return axios.get(`${URL}/timeline/${offset}`, headers);
}

function getNewPosts(headers) {
  return axios.get(`${URL}/new`, headers);
}

function getPageUser(id, headers) {
  return axios.get(`${URL}/user/${id}`, headers);
}

function searchUser(name, headers) {
  return axios.get(`${URL}/users/${name}`, headers);
}

function listLikes(postId, headers) {
  return axios.get(`${URL}/likes/${postId}`, headers);
}

function likePost(postId, headers) {
  return axios.post(`${URL}/likes/${postId}/like`, {}, headers);
}

function unlikePost(postId, headers) {
  return axios.post(`${URL}/likes/${postId}/unlike`, {}, headers);
}

function followUser(userId, headers) {
  return axios.post(`${URL}/follow/${userId}/follow`, {}, headers);
}

function unfollowUser(userId, headers) {
  return axios.post(`${URL}/follow/${userId}/unfollow`, {}, headers);
}

function newEditPost(dataPostEdited, headers) {
  return axios.put(`${URL}/editPost`, dataPostEdited, headers);
}

function deletePost(postId, headers) {
  return axios.delete(`${URL}/deletePost/${postId}`, headers);
}

function getComments(postId, headers) {
  return axios.get(`${URL}/comments/${postId}`, headers);
}

function postComment(body, headers) {
  return axios.post(`${URL}/createComment`, body, headers);
}

export {
  mountHeaders,
  getTrendingHashtags,
  getHashtagByName,
  postPost,
  getPosts,
  getNewPosts,
  getPageUser,
  searchUser,
  postSignin,
  postSignup,
  listLikes,
  likePost,
  unlikePost,
  followUser,
  unfollowUser,
  newEditPost,
  deletePost,
  getComments,
  postComment
};
