import Home from "apps/authenticated-front/src/app/pages/Home/Home";
import Login from "apps/authenticated-front/src/app/pages/Login/Login";
import SignUp from "apps/authenticated-front/src/app/pages/SignUp/SignUp";
import { Outlet, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="join" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
