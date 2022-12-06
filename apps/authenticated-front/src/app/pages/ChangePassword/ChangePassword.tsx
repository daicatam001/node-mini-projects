import {
  changePassword,
  getResetPasswordTokenStatus,
} from "apps/authenticated-front/src/app/api";
import ChangePasswordDes from "apps/authenticated-front/src/app/components/ChangePasswordDes/ChangePasswordDes";
import ChangePasswordForm from "apps/authenticated-front/src/app/components/ChangePasswordForm/ChangePasswordForm";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default () => {
  const useQuery = () => new URLSearchParams(useLocation().search);

  const token = useQuery().get("token");

  const [tokenValid, setTokenValid] = useState<boolean | undefined>(undefined);
  const [changePwSuccess, setChangePwSuccess] = useState<boolean>(false);

  useEffect(() => {
    console.log(1)
    if (token) {
      getResetPasswordTokenStatus(token)
        .then(() => {
          setTokenValid(true);
        })
        .catch((e) => {
          setTokenValid(false);
        });
    } else {
      setTokenValid(false);
    }
  }, []);

  const submitHandler = async (password: string) => {
    await changePassword(password, token as string);
    setChangePwSuccess(true);
  };

  return (
    <div className="pt-[100px]">
      <div className="max-w-[400px] mx-auto">
        <h1 className="font-bold text-3xl mb-2 text-center">Change Password</h1>
        <ChangePasswordDes
          tokenValid={tokenValid}
          changePwSuccess={changePwSuccess}
        />
        {tokenValid && !changePwSuccess ? (
          <>
            <ChangePasswordForm onSubmit={submitHandler} />
            <div className="text-center mt-4 text-lg">
              Need an account?{" "}
              <Link to="/join" className="underline">
                Join
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
