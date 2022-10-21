import axios from "axios";

const URL = 'http://localhost:4000';

function getTrendingHashtags(headers) {
  return axios.get(`${URL}/hashtags`, headers);
}

function getHashtagByName(hashtag, headers) {
  return axios.get(`${URL}/hashtags/${hashtag}`, headers);
}

function postPost(body, token) {
  return axios.post(`${URL}/publish`, body, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

function getPosts(token) {
  return axios.get(`${URL}/timeline`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

function likePost(postId, headers) {
  return axios.post(`${URL}/likes/${postId}/like`, headers);
}

function unlikePost(postId, headers) {
  return axios.post(`${URL}/likes/${postId}/unlike`, headers);
}

export { getTrendingHashtags, getHashtagByName, postPost, getPosts, likePost, unlikePost };