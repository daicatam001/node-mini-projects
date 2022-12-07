import Spinner from "apps/authenticated-front/src/app/components/Spinner/Spinner";
import { IUser } from "apps/authenticated-front/src/app/models";
import { useForm } from "react-hook-form";

type ForgotPassowordFormValue = { name: string; description: string };

interface ForgotPasswordProps {
  onSubmit: ({ name, description }: ForgotPassowordFormValue) => void;
  user: IUser;
}

export default ({ onSubmit, user }: ForgotPasswordProps) => {
  const {
    register,
    handleSubmit,
    formState,
    formState: { isSubmitting, errors },
  } = useForm<ForgotPassowordFormValue>({
    defaultValues: {
      name: user.name,
      description: user.description,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(
        ({ name, description }: ForgotPassowordFormValue) =>
          onSubmit({ name, description })
      )}
    >
      <div className="pb-6">
        <label className="block mb-1">Name</label>
        <div className="relative">
          <input
            className="block w-full rounded-md"
            {...register("name", {
              required: "Please enter a name",
            })}
            type="text"
          />
          {errors.name?.message && (
            <div className="text-sm text-red-500 absolute left-0 top-full">
              {errors.name.message}
            </div>
          )}
        </div>
      </div>
      <div className="pb-4">
        <label className="block">
          BIO <small className="ml-2">(Optional)</small>
        </label>
        <small className="text-gray-500 mb-2 block">
          This is the first thing people will see on your page. Give them a
          compelling reason to read more from you.
        </small>
        <div className="relative">
          <textarea
            className="block w-full rounded-md"
            {...register("description")}
            rows={4}
            placeholder="Start writing..."
          />
        </div>
      </div>
      <button disabled={isSubmitting} className="btn-primary mt-4 w-full">
        {isSubmitting ? (
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            <Spinner />
          </div>
        ) : null}
        Save
      </button>
    </form>
  );
};
