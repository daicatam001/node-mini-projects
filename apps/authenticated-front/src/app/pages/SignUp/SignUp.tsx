import api, { signUp } from "apps/authenticated-front/src/app/api";
import SignUpForm from "apps/authenticated-front/src/app/components/SignUpForm/SignUpForm";
import { setAuth } from "apps/authenticated-front/src/app/state/authSlide";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const signUpHandler = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);
      const {
        data: { user, token, refreshToken },
      } = await signUp({ name, email, password });
      dispatch(setAuth({ user, token, refreshToken }));
    } catch (e) {}
    setIsLoading(false);
  };
  return (
    <div className="pt-[100px]">
      <div className="max-w-[400px] mx-auto">
        <h1 className="font-bold text-3xl mb-8 text-center">Join now!</h1>
        <SignUpForm onSubmit={signUpHandler} isLoading={isLoading} />
        <div className="mt-4 text-center text-sm">
          Already have an account?
          <Link to="/login" className="underline underline-offset-1 ml-1">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
