import { logout } from "apps/authenticated-front/src/app/api";
import UserProfile from "apps/authenticated-front/src/app/components/UserProfile/UserProfile";
import { IUser } from "apps/authenticated-front/src/app/models";
import { clearAuth, selectUser } from "apps/authenticated-front/src/app/state/authSlide";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const onLogoutHandler = () => {
    dispatch(clearAuth());
  };
  return (
    <div className="mt-[100px] bg-white pb-10">
      <UserProfile user={user as IUser} />
      <div className="container">
        <div className="mt-10 flex gap-4">
          <Link to="/edit-profile" className="btn-primary">Update profile</Link>
          <button className="btn-danger" onClick={onLogoutHandler}>Logout</button>
        </div>
      </div>
    </div>
  );
};
