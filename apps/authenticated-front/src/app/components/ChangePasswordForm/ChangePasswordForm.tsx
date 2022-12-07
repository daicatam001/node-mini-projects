import Spinner from "apps/authenticated-front/src/app/components/Spinner/Spinner";
import { useForm } from "react-hook-form";
interface ForgotPasswordProps {
  onSubmit: (password: string) => void;
}

type ForgotPassowordFormValue = { password: string; passwordConfirm: string };

export default ({ onSubmit }: ForgotPasswordProps) => {
  const {
    register,
    handleSubmit,
    formState,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<ForgotPassowordFormValue>();
  const password = watch("password");
  return (
    <form
      onSubmit={handleSubmit(({ password }: ForgotPassowordFormValue) =>
        onSubmit(password)
      )}
    >
      <div className="pb-4">
        <label className="block mb-1">New Password</label>
        <div className="relative">
          <input
            className="block w-full rounded-md"
            {...register("password", {
              required: "Your password must be at least 8 characters long",
              minLength: {
                value: 8,
                message: "Your password must be at least 8 characters long",
              },
            })}
            type="password"
          />
          {errors.password?.message && (
            <div className="text-sm text-red-500 absolute left-0 top-full">
              {errors.password.message}
            </div>
          )}
        </div>
      </div>
      <div className="pb-4">
        <label className="block mb-1">Confirm Password</label>
        <div className="relative">
          <input
            className="block w-full rounded-md"
            {...register("passwordConfirm", {

              validate: {
                match: (v) => {
                  return v === password ? true : 'Confirm password doesn\'t match' ;
                },
               
              },
            })}
            type="password"
          />
          {errors.passwordConfirm?.message && (
            <div className="text-sm text-red-500 absolute left-0 top-full">
              {errors.passwordConfirm.message}
            </div>
          )}
        </div>
      </div>
      <button
        disabled={isSubmitting}
        className="btn-primary mt-4 w-full"
      >
        {isSubmitting ? (
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            <Spinner />
          </div>
        ) : null}
        Send
      </button>
    </form>
  );
};
