import GlobalStyle from "../assets/GlobalStyle.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import HashtagPage from "./HashtagPage.js";
import Timeline from "./Timeline.js";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/timeline' element={<Timeline />} />
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/hashtag/:hashtag' element={<HashtagPage />} />
      </Routes>
    </BrowserRouter>
  );
}