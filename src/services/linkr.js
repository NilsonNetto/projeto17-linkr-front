import axios from "axios";

const URL = "http://localhost:4000";

function mountHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
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

function getPosts(headers) {
  return axios.get(`${URL}/timeline`, headers);
}

function getPageUser(id, headers) {
  return axios.get(`${URL}/user/${id}`, headers);
}

function searchUser(name, headers) {
  return axios.get(`${URL}/timeline/${name}`, headers);
}

function likePost(postId, headers) {
  return axios.post(`${URL}/likes/${postId}/like`, {}, headers);
}

function unlikePost(postId, headers) {
  return axios.post(`${URL}/likes/${postId}/unlike`, {}, headers);
}

export {
  mountHeaders,
  getTrendingHashtags,
  getHashtagByName,
  postPost,
  getPosts,
  getPageUser,
  searchUser,
  postSignin,
  postSignup,
  likePost,
  unlikePost
};
