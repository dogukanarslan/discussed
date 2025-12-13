import { AuthForm } from "./AuthForm";

export const SignIn = () => {
  return (
    <AuthForm
      buttonText="Sign in"
      endpoint="/api/signin"
    />
  );
};
