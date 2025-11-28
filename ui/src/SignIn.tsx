import { AuthForm } from "./AuthForm";

export const SignIn = () => {
  return (
    <AuthForm
      buttonText="Sign in"
      endpoint="/api/signin"
      title="Sign in"
      link={{ text: "Create a new account", href: "#signup" }}
    />
  );
};
