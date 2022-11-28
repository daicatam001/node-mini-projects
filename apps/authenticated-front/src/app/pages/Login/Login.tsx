import { login } from "apps/authenticated-front/src/app/api";
import LoginForm from "apps/authenticated-front/src/app/components/LoginForm/LoginForm";
import { setAuth } from "apps/authenticated-front/src/app/state/authSlide";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default () => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loginHandler = async (email: string, password: string) => {
    try {
      setHasError(false);
      setIsLoading(true);
      const {
        data: { user, token, refreshToken },
      } = await login({ email, password });
      dispatch(setAuth({ user, token, refreshToken }));
    } catch (e) {
      setHasError(true);
      setIsLoading(false);
    }
  };
  return (
    <div className="pt-[100px]">
      <div className="max-w-[400px] mx-auto">
        <h1 className="font-bold text-3xl mb-8 text-center">Login</h1>
        <div
          className={`text-center text-red-500 text-sm ${
            hasError ? "opacity-1" : "opacity-0"
          }`}
        >
          Username or password is incorrect
        </div>
        <LoginForm onSubmit={loginHandler} isLoading={isLoading} />
        <div className="flex justify-between text-sm mt-4">
          <Link to="/forgot" className="underline underline-offset-1">
            Forgot password
          </Link>
          <div>
            Don’t have an account?
            <Link to="/join" className="underline underline-offset-1 ml-1">
              Join
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
