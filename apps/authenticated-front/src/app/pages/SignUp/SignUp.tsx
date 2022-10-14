import api from "apps/authenticated-front/src/app/api";
import SignUpForm from "apps/authenticated-front/src/app/components/SignUpForm/SignUpForm";

export default () => {
  const signUpHandler = async (
    name: string,
    email: string,
    password: string
  ) => {
    const { data } = await api
      .post("/sign-up", { name, email, password })
      .catch(() => ({ data: null }));
    console.log(data);
  };
  return (
    <div className="pt-[100px]">
      <div className="max-w-[400px] mx-auto">
        <h1 className="font-bold text-3xl mb-8">Authenticated Join</h1>
        <SignUpForm onSubmit={signUpHandler} />
      </div>
    </div>
  );
};
