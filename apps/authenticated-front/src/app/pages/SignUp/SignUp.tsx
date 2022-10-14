import SignUpForm from "apps/authenticated-front/src/app/components/SignUpForm/SignUpForm";

export default () => {
  return (
    <div className="pt-[100px]">
      <div className="max-w-[400px] mx-auto">
        <h1 className="font-bold text-3xl mb-8">Authenticated Join</h1>
        <SignUpForm />
      </div>
    </div>
  );
};
