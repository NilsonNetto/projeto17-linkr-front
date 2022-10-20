import axios from "axios";

const URL = 'http://localhost:4000';

function getTrendingHashtags(headers) {
  return axios.get(`${URL}/hashtags`, headers);
}

function getHashtagByName(hashtag, headers) {
  return axios.get(`${URL}/hashtags/${hashtag}`, headers);
}

export { getTrendingHashtags, getHashtagByName };