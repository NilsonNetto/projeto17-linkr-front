import GlobalStyle from "../assets/GlobalStyle.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HashtagPage from "./HashtagPage.js";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Timeline from "./Timeline.js";
import Likes from "./Likes.js";


export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/timeline' element={<Timeline />} />
        <Route path='/hashtag/:hashtag' element={<HashtagPage />} />
        <Route path='/likes' element={<Likes />} />
      </Routes>
    </BrowserRouter>
  );
}