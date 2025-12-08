import { useEffect, useState } from "react";
import { MessageForm } from "./MessageForm";

import { MessageList } from "./MessageList";

import { SignIn } from "./SignIn";

import "http://localhost:8080/socket.io/socket.io.js";
import { SignUp } from "./SignUp";

function App() {
  const [route, setRoute] = useState(window.location.hash);
  const storageUser = sessionStorage.getItem("user");
  const user = storageUser ? JSON.parse(storageUser) : null;

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user && route !== "#signin" && route !== "#signup") {
      window.location.hash = "#signin";
    }
  }, [route, user]);

  const handleSignout = () => {
    sessionStorage.removeItem("user");
    window.location.hash = "#signin";
  };

  if (route === "#signin") {
    return <SignIn />;
  }

  if (route === "#signup") {
    return <SignUp />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="header">
        <h3 className="header__heading">{user.username}</h3>
        <button onClick={handleSignout}>Sign out</button>
      </div>
      <MessageList />
      <MessageForm />
    </div>
  );
}

export default App;
