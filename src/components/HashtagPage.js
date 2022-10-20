import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHashtagByName } from "../services/linkr";


export default function HashtagPage() {

  const [postsWithHashtag, setPostsWithHashtag] = useState([]);
  const { hashtag } = useParams();

  useEffect(() => {

    const config = {
      headers: {
        Authorization: `Bearer `
      }
    };

    getHashtagByName(hashtag, config)
      .then(res => {
        setPostsWithHashtag(res.data);
      })
      .catch(res => {
        console.log(res.data);
        alert('Get posts with hashtags error');
      });
  }, []);

  console.log(postsWithHashtag);

  return (
    <h1>{hashtag}</h1>
  );
}