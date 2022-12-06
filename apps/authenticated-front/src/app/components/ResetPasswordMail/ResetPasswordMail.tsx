import { Link } from "react-router-dom";

export interface ResetPassordMailProps {
  token: string;
}
export default ({ token }: ResetPassordMailProps) => {
  return (
    <div className="border p-6 bg-white max-w-[500px] mx-auto">
      <p className="font-medium">
        A request has been received to change the password for your account.
      </p>
      <div className="py-4 text-center">
        <Link
          to={`/change-password?token=${token}`}
          target="_blank"
          className="px-6 py-3 rounded bg-blue-500 text-white"
        >
          Reset Password
        </Link>
      </div>
    </div>
  );
};
