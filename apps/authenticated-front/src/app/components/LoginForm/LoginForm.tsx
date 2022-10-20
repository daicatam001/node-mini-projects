import { FormEvent, useRef } from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export default ({ onSubmit }: LoginFormProps) => {
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
            type="text"
            placeholder="you@awesome.com"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            className="block w-full rounded-md"
            type="password"
            ref={passwordRef}
            placeholder="supersecret"
          />
        </div>
      </div>
      <button className="mt-8 text-center bg-slate-600 w-full block py-2 text-white font-semibold rounded-md">
        Login
      </button>
    </form>
  );
};
