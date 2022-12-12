import ChangePassword from "apps/authenticated-front/src/app/pages/ChangePassword/ChangePassword";
import EditProfile from "apps/authenticated-front/src/app/pages/EditProfile/EditProfile";
import ForgotPassword from "apps/authenticated-front/src/app/pages/ForgotPassword/ForgotPassword";
import Login from "apps/authenticated-front/src/app/pages/Login/Login";
import Profile from "apps/authenticated-front/src/app/pages/Profile/Profile";
import SignUp from "apps/authenticated-front/src/app/pages/SignUp/SignUp";
import { selectIsAuth } from "apps/authenticated-front/src/app/state/authSlide";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export function App() {
  const isAuth = useSelector(selectIsAuth);
  return (
    <>
      <Routes>
        <Route path="" element={<Outlet />}>
          {isAuth ? (
            <>
              <Route index element={<Profile />} />
              <Route path="edit-profile" element={<EditProfile />} />
            </>
          ) : (
            <>
              <Route index element={<Navigate to={"/login"} />}></Route>
              <Route path="login" element={<Login />} />
              <Route path="join" element={<SignUp />} />
              <Route path="forgot" element={<ForgotPassword />} />
              <Route path="change-password" element={<ChangePassword />} />
            </>
          )}
          <Route
            path="*"
            element={<Navigate to={isAuth ? "/" : "/join"} />}
          ></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
