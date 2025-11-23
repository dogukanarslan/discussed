import { useState } from "react";
import { MessageForm } from "./MessageForm";

import { MessageList } from "./MessageList";

import { SignIn } from "./SignIn";

import "http://localhost:8080/socket.io/socket.io.js";
import { SignUp } from "./SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("user")
  );
  const [isSignUp, setIsSignUp] = useState(false);

  if (isSignUp) {
    return <SignUp setIsLoggedIn={setIsLoggedIn} setIsSignUp={setIsSignUp} />;
  }

  if (!isLoggedIn) {
    return <SignIn setIsLoggedIn={setIsLoggedIn} setIsSignUp={setIsSignUp} />;
  }

  const handleSignout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("user");
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="header__heading">Messages</h1>
        <button onClick={handleSignout}>Sign out</button>
      </div>
      <MessageList />
      <MessageForm />
    </div>
  );
}

export default App;
