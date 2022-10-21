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

export { getTrendingHashtags, getHashtagByName, postPost, getPosts };