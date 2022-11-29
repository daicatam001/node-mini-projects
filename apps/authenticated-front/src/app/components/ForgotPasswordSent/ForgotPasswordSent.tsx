import { Link } from "react-router-dom";

export default () => {
  return (
    <>
      <h1 className="font-bold text-3xl mb-4 text-center">Email sent!</h1>
      <p className="text-green-500 text-center mb-4">
        Please check your email for password reset link.
      </p>
      <div className="text-center">
        <Link to='/'>Go to home</Link>
      </div>
    </>
  );
};
