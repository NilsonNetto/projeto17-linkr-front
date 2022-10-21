import axios from "axios";

const URL = "http://localhost:4000";

function getTrendingHashtags(headers) {
  return axios.get(`${URL}/hashtags`, headers);
}

function getHashtagByName(hashtag, headers) {
  return axios.get(`${URL}/hashtags/${hashtag}`, headers);
}

function postPost(body, token) {
  return axios.post(`${URL}/publish`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getPosts(token) {
  return axios.get(`${URL}/timeline`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function postSignin(body) {
  return axios.post(`${URL}/signin`, body);
}

function postSignup(body) {
  return axios.post(`${URL}/signup`, body);
}

function getPageUser(token, id) {
  return axios.get(`${URL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function searchUser(token, name) {
  return axios.get(`${URL}/timeline/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export {
  getTrendingHashtags,
  getHashtagByName,
  postPost,
  getPosts,
  getPageUser,
  searchUser,
  postSignin,
  postSignup,
};
