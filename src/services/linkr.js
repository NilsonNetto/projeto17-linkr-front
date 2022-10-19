import axios from "axios";

const URL = 'http://localhost:4000';

function getTrendingHashtags(headers) {
  return axios.get(`${URL}/hashtags`, headers);
}

export { getTrendingHashtags };