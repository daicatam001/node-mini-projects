import Spinner from "apps/authenticated-front/src/app/components/Spinner/Spinner";
import { FormEvent, useRef } from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
}

export default ({ onSubmit, isLoading = false }: LoginFormProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(
      (emailRef.current as HTMLInputElement).value.trim(),
      (passwordRef.current as HTMLInputElement).value.trim()
    );
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            className="block w-full rounded-md"
            ref={emailRef}
            disabled={isLoading}
            type="text"
            placeholder="you@awesome.com"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            className="block w-full rounded-md"
            type="password"
            disabled={isLoading}
            ref={passwordRef}
            placeholder="supersecret"
          />
        </div>
      </div>
      <button
        disabled={isLoading}
        className="btn-primary mt-8 w-full"
      >
        {isLoading ? (
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            <Spinner />
          </div>
        ) : null}
        Login
      </button>
    </form>
  );
};
