import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./Components/Header/Header";
import Articles from "./Components/Articles/Articles";

function App() {
  const user = {
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  };

  return (
    <>
      <header>
        <Header user={user} />
      </header>
      <Routes>
        <Route path="/" element={<Articles />}/>
      </Routes>
        
    </>
  );
}

export default App;
