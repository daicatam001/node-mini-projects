import { changePassword } from "apps/authenticated-front/src/app/api";
import ChangePasswordForm from "apps/authenticated-front/src/app/components/ChangePasswordForm/ChangePasswordForm";
import UserAvatar from "apps/authenticated-front/src/app/components/UserAvatar/UserAvatar";
import UserProfile from "apps/authenticated-front/src/app/components/UserProfile/UserProfile";
import { IUser } from "apps/authenticated-front/src/app/models";
import {
  clearAuth,
  selectUser,
} from "apps/authenticated-front/src/app/state/authSlide";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { success } from "shared/util-toast";
export default () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const onLogoutHandler = () => {
    dispatch(clearAuth());
  };

  const onChangePasswordHandler = async (password: string) => {
    await changePassword(password);
    success("Password saved successfully");
  };
  return (
    <div className=" bg-slate-100">
      <div className="mt-[100px] h-[120px] container relative">
        <div className="container h-full absolute left-0 -bottom-10">
          <UserAvatar name={user!.name} />
        </div>
      </div>
      <div className="bg-white py-14">
        <div className="container grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <div className="pb-14">
              <UserProfile user={user as IUser} />
            </div>
            <div className="flex gap-4">
              <Link to="/edit-profile" className="btn-primary">
                Update profile
              </Link>
              <button className="btn-danger" onClick={onLogoutHandler}>
                Logout
              </button>
            </div>
          </div>
          <div className="col-span-1">
            <div className="pb-4">
              <h3 className="text-3xl font-bold">Change Password</h3>
              <div className="mt-8 w-[400px]">
                <ChangePasswordForm onSubmit={onChangePasswordHandler} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
