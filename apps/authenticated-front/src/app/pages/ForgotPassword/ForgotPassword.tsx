import { resetPassword } from "apps/authenticated-front/src/app/api";
import ForgotPassowordForm from "apps/authenticated-front/src/app/components/ForgotPasswordForm/ForgotPasswordForm";
import ForgotPasswordSent from "apps/authenticated-front/src/app/components/ForgotPasswordSent/ForgotPasswordSent";
import { useState } from "react";
import { Link } from "react-router-dom";

export default () => {
  const [isSent, setIsSent] = useState(false);
  const submitHandler = async (email: string) => {
    await resetPassword(email);
    setIsSent(true);
  };
  return (
    <div className="pt-[100px]">
      {isSent ? (
        <ForgotPasswordSent />
      ) : (
        <div className="max-w-[400px] mx-auto">
          <h1 className="font-bold text-3xl mb-4 text-center">
            Forgot Password
          </h1>
          <p className="text-gray-500 text-center mb-4">
            No problem. Enter your account email below and we’ll send you a link
            to reset your password.
          </p>
          <ForgotPassowordForm onSubmit={submitHandler} />
          <div className="text-center mt-4">
            <Link to="/join">Cancel</Link>
          </div>
        </div>
      )}
    </div>
  );
};
