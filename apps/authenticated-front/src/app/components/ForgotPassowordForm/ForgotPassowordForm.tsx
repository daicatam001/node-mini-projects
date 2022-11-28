import Spinner from "apps/authenticated-front/src/app/components/Spinner/Spinner";
import { useForm } from "react-hook-form";
interface ForgotPasswordProps {
  onSubmit: (email: string, password: string) => void;
}

type ForgotPassowordFormValue = { email: string };

export default ({ onSubmit }: ForgotPasswordProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPassowordFormValue>();
  const submitHandler = ({ email }: ForgotPassowordFormValue) => {
    console.log(email);
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            className="block w-full rounded-md"
            {...register("email", { required: true })}
            type="email"
            placeholder="you@awesome.com"
          />
        </div>
      </div>
      <button
        disabled={isSubmitting}
        className="relative mt-8 text-center bg-slate-600 w-full block py-2 text-white font-semibold rounded-md"
      >
        {isSubmitting ? (
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            <Spinner />
          </div>
        ) : null}
        Login
      </button>
    </form>
  );
};
