import { resetPassword } from "apps/authenticated-front/src/app/api";
import ForgotPassowordForm from "apps/authenticated-front/src/app/components/ForgotPasswordForm/ForgotPasswordForm";
import ForgotPasswordSent from "apps/authenticated-front/src/app/components/ForgotPasswordSent/ForgotPasswordSent";
import ResetPasswordMail from "apps/authenticated-front/src/app/components/ResetPasswordMail/ResetPasswordMail";
import { useState } from "react";
import { Link } from "react-router-dom";

export default () => {
  const [isSent, setIsSent] = useState(false);
  const [resetPwToken, setResetPwToken] = useState("");
  const submitHandler = async (email: string) => {
    const {
      data: { resetPasswordToken },
    } = await resetPassword(email);
    setResetPwToken(resetPasswordToken);
    setIsSent(true);
  };
  return (
    <div className="pt-[100px]">
      {isSent ? (
        <div className="space-y-4">
          <ForgotPasswordSent />
          {resetPwToken ?  <ResetPasswordMail token={resetPwToken} /> : null}
        </div>
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
