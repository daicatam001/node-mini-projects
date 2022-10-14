export default () => {
  return (
    <>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            className="block w-full rounded-md"
            type="text"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            className="block w-full rounded-md"
            type="text"
            placeholder="you@awesome.com"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            className="block w-full rounded-md"
            type="password"
            placeholder="supersecret"
          />
        </div>
      </div>
      <button className="mt-8 text-center bg-slate-600 w-full block py-2 text-white font-semibold rounded-md">
        Sign up
      </button>
    </>
  );
};
