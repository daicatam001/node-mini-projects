import { Link } from "react-router-dom";

interface ChangePasswordDesProps {
  changePwSuccess: boolean;
  tokenValid: boolean | undefined;
}

export default ({ changePwSuccess, tokenValid }: ChangePasswordDesProps) => {
  let descriptionTemp;
  switch (tokenValid) {
    case false:
      descriptionTemp = (
        <div className="text-center">
          <div className=" text-green-500 mb-4">
            Your token is expired or invalid!
          </div>
          <Link to="/forgot" className="text-lg">
            Forgot Password
          </Link>
        </div>
      );
      break;
    case true:
      descriptionTemp = (
        <p className="text-gray-500 text-center mb-4">
          Enter your new password below.
        </p>
      );
      break;
    default:
      descriptionTemp = changePwSuccess ? (
        <div className="text-center">
          <div className=" text-green-500 mb-4">
            Your password has been changed successfully!
          </div>
          <Link to="/login">Sign in</Link>
        </div>
      ) : (
        ""
      );
  }
  return (
    <>
      {changePwSuccess ? (
        <div className="text-center">
          <div className=" text-green-500 mb-4">
            Your password has been changed successfully!
          </div>
          <Link to="/login" className="text-lg">
            Sign in
          </Link>
        </div>
      ) : (
        descriptionTemp
      )}
    </>
  );
};
