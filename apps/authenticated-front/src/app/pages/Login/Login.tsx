import { login } from "apps/authenticated-front/src/app/api";
import LoginForm from "apps/authenticated-front/src/app/components/LoginForm/LoginForm";
import { setAuth } from "apps/authenticated-front/src/app/state/authSlide";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const loginHandler = async (
    email: string,
    password: string
  ) => {
    const {
      data: { user, token, refreshToken },
    } = await login({ email, password });
    dispatch(setAuth({ user, token, refreshToken }));
  };
  return (
    <div className="pt-[100px]">
      <div className="max-w-[400px] mx-auto">
        <h1 className="font-bold text-3xl mb-8 text-center">Login</h1>
        <LoginForm onSubmit={loginHandler} />
      </div>
    </div>
  );
};
