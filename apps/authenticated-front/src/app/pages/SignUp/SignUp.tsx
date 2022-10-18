import api, { signUp } from "apps/authenticated-front/src/app/api";
import SignUpForm from "apps/authenticated-front/src/app/components/SignUpForm/SignUpForm";
import { setAuth } from "apps/authenticated-front/src/app/state/authSlide";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const signUpHandler = async (
    name: string,
    email: string,
    password: string
  ) => {
    const {
      data: { user, token, refreshToken },
    } = await signUp({ name, email, password });
    dispatch(setAuth({ user, token, refreshToken }));
  };
  return (
    <div className="pt-[100px]">
      <div className="max-w-[400px] mx-auto">
        <h1 className="font-bold text-3xl mb-8 text-center">Join now!</h1>
        <SignUpForm onSubmit={signUpHandler} />
      </div>
    </div>
  );
};
