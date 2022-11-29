import Spinner from "apps/authenticated-front/src/app/components/Spinner/Spinner";
import { useForm } from "react-hook-form";
interface ForgotPasswordProps {
  onSubmit: (email: string) => void;
}

type ForgotPassowordFormValue = { email: string };

export default ({ onSubmit }: ForgotPasswordProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ForgotPassowordFormValue>();
  

  return (
    <form onSubmit={handleSubmit(({email}: ForgotPassowordFormValue)=>{onSubmit(email)})}>
      <div className="pb-4">
        <label className="block mb-">Email</label>
        <div className="relative">
        <input
          className="block w-full rounded-md"
          {...register("email", {
            required: "Please enter a valid email",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email",
            },
          })}
          type="text"
          placeholder="you@awesome.com"
        />
        {errors.email?.message && (
          <div className="text-sm text-red-500 absolute left-0 top-full">
            {errors.email.message}
          </div>
        )}
        </div>
      </div>
      <button
        disabled={isSubmitting}
        className="relative mt-4 text-center bg-slate-600 w-full block py-2 text-white font-semibold rounded-md"
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
