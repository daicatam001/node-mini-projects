export interface ResetPassordMailProps {
  token: string;
}
export default (props: ResetPassordMailProps) => {
  return (
    <div className="border p-6 bg-white max-w-[500px] mx-auto">
      <p className="font-medium">
        A request has been received to change the password for your SendGrid
        account.
      </p>
      <div className="py-4">
        <button className="">Reset Password</button>
      </div>
    </div>
  );
};
