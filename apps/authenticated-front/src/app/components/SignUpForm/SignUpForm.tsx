import { FormEvent, useState } from "react";

interface SignUpFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
}

export default ({ onSubmit }: SignUpFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    onSubmit(name, email, password);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            className="block w-full rounded-md"
            value={name}
            onInput={(event: FormEvent<HTMLInputElement>) =>
              setName((event.target as HTMLInputElement).value)
            }
            type="text"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            className="block w-full rounded-md"
            value={email}
            onInput={(event: FormEvent<HTMLInputElement>) =>
              setEmail((event.target as HTMLInputElement).value)
            }
            type="text"
            placeholder="you@awesome.com"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            className="block w-full rounded-md"
            type="password"
            value={password}
            onInput={(event: FormEvent<HTMLInputElement>) =>
              setPassword((event.target as HTMLInputElement).value)
            }
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
