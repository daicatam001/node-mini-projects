import SignUpForm from "apps/authenticated-front/src/app/components/SignUpForm/SignUpForm";

export default () => {
  return (
    <div className="pt-[100px] flex justify-center">
      <div className="max-w-[600px]">
        <h1 className="font-bold text-3xl mb-8">Authenticated Join</h1>
        <SignUpForm />
      </div>
    </div>
  );
};
