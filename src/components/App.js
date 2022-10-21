import GlobalStyle from "../assets/GlobalStyle.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import HashtagPage from "./HashtagPage.js";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Timeline from "./Timeline.js";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/timeline' element={<Timeline />} />
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/hashtag/:hashtag' element={<HashtagPage />} />
      </Routes>
    </BrowserRouter>
  );
}