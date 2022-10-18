import Home from "apps/authenticated-front/src/app/pages/Home/Home";
import Login from "apps/authenticated-front/src/app/pages/Login/Login";
import SignUp from "apps/authenticated-front/src/app/pages/SignUp/SignUp";
import { selectIsAuth } from "apps/authenticated-front/src/app/state/authSlide";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

export function App() {
  const isAuth = useSelector(selectIsAuth);
  return (
    <Routes>
      <Route path="" element={<Outlet />}>
        {isAuth ? (
          <Route index element={<Home />} />
        ) : (
          <>
            <Route
              index
              element={<Navigate to={isAuth ? "/" : "/join"} />}
            ></Route>
            <Route path="login" element={<Login />} />
            <Route path="join" element={<SignUp />} />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={isAuth ? "/" : "/join"} />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
