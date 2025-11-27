import { useEffect, useState } from "react";
import { MessageForm } from "./MessageForm";

import { MessageList } from "./MessageList";

import { SignIn } from "./SignIn";

import "http://localhost:8080/socket.io/socket.io.js";
import { SignUp } from "./SignUp";

function App() {
  const [route, setRoute] = useState(window.location.hash);
  const user = sessionStorage.getItem("user");

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
  }, [user, route]);

  const handleSignout = () => {
    sessionStorage.removeItem("user");
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
        <h1 className="header__heading">Messages</h1>
        <button onClick={handleSignout}>Sign out</button>
      </div>
      <MessageList />
      <MessageForm />
    </div>
  );
}

export default App;
