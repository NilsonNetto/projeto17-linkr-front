import GlobalStyle from "../assets/GlobalStyle.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import HashtagPage from "./HashtagPage.js";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Sidebar />} />
        <Route path='/hashtag/:hashtag' element={<HashtagPage />} />
      </Routes>
    </BrowserRouter>
  );
}