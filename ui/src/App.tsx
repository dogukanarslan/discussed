import { useState } from "react";
import { MessageForm } from "./MessageForm";

import { MessageList } from "./MessageList";

import { Login } from "./Login";

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
    return <Login setIsLoggedIn={setIsLoggedIn} setIsSignUp={setIsSignUp} />;
  }

  return (
    <div className="container">
      <h1 className="messages-heading">Messages</h1>
      <MessageList />
      <MessageForm />
    </div>
  );
}

export default App;
