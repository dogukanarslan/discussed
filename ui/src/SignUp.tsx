import { AuthForm } from "./AuthForm";

export const SignUp = () => {
  return (
    <AuthForm
      buttonText="Sign up"
      endpoint="/api/signup"
      title="Sign up"
      link={{ text: "Alread have an account?", href: "#signup" }}
    />
  );
};
