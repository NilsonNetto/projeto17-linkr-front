import GlobalStyle from "../assets/GlobalStyle.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HashtagPage from "./HashtagPage.js";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Timeline from "./Timeline.js";
import UserPage from "./PageUser.js";
import UserContext from "../context/UserContext.js";
import { useState } from "react";


export default function App() {

  const [userData, setUserData] = useState();

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
