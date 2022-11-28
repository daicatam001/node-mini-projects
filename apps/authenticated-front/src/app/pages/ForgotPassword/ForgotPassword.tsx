import ForgotPassowordForm from "apps/authenticated-front/src/app/components/ForgotPassowordForm/ForgotPassowordForm";

export default () => {
  const submitHandler = (data: any) => {
    console.log(data);
  };
  return (
    <div className="pt-[100px]">
      <div className="max-w-[400px] mx-auto">
        <h1 className="font-bold text-3xl mb-4 text-center">Forgot Password</h1>
        <p className="text-gray-500 text-center mb-4">
          No problem. Enter your account email below and we’ll send you a link
          to reset your password.
        </p>
        <ForgotPassowordForm onSubmit={submitHandler} />
      </div>
    </div>
  );
};