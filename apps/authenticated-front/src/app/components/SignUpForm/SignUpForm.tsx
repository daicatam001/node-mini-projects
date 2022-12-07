import Spinner from "apps/authenticated-front/src/app/components/Spinner/Spinner";
import { FormEvent, useRef } from "react";

interface SignUpFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  isLoading?: boolean;
}

export default ({ onSubmit, isLoading = false }: SignUpFormProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(
      (nameRef.current as HTMLInputElement).value.trim(),
      (emailRef.current as HTMLInputElement).value.trim(),
      (passwordRef.current as HTMLInputElement).value.trim()
    );
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            className="block w-full rounded-md"
            disabled={isLoading}
            ref={nameRef}
            type="text"
            placeholder="John Smith"
          />
        </div>
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
        Sign up
      </button>
    </form>
  );
};
