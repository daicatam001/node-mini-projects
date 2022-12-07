import { clearAuth } from "apps/authenticated-front/src/app/state/authSlide";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const onLogoutHandler = () => {
    dispatch(clearAuth());
  };

  return (
    <div className="mt-[100px] bg-white">
      <div className="py-14">
        <h1 className="font-bold text-4xl text-center">Settings</h1>
      </div>
      <div className="grid grid-cols-2 container pt-8">
        <div className="py-4">
          <button className="btn-danger !w-auto" onClick={onLogoutHandler}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
