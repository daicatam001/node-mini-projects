import { FormEvent, useRef, useState } from "react";

interface SignUpFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
}

export default ({ onSubmit }: SignUpFormProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: FormEvent) => {
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
        Sign up
      </button>
    </form>
  );
};
