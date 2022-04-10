import React from "react";
import { authService, signOut } from "fbase";

const Home = () => {
  const onSignOutClick = () => authService.signOut();

  return (
    <div>
      <h1>HOME</h1>
      <button onClick={onSignOutClick}>Sign out</button>
    </div>
  );
};

export default Home;
