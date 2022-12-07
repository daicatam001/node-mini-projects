import { updateProfile } from "apps/authenticated-front/src/app/api";
import EditProfileForm from "apps/authenticated-front/src/app/components/EditProfileForm/EditProfileForm";
import { IUser } from "apps/authenticated-front/src/app/models";
import {
    selectUser,
    setUser
} from "apps/authenticated-front/src/app/state/authSlide";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const editProfileHander = async ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    const { data } = await updateProfile({ name, description });
    dispatch(setUser(data));
    navigate("/");
  };
  return (
    <div>
      <div className="bg-white h-[200px]"></div>
      <div className="pt-10 container !max-w-[700px]">
        <h3 className="text-3xl mb-8">Tell us about yourself</h3>
        <EditProfileForm onSubmit={editProfileHander} user={user as IUser} />
        <div className="text-center mt-4">
          <Link to="/">Cancel</Link>
        </div>
      </div>
    </div>
  );
};
