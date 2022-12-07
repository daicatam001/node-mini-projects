import { IUser } from "apps/authenticated-front/src/app/models";
import { format } from "date-fns";

interface UserProfileProps {
  user: IUser;
}

export default ({ user }: UserProfileProps) => {
  const avatarText = user.name ? user.name[0] : "";
  const joinDateFormated = format(new Date(user.createdAt), "MMMM yyyy");
  return (
    <>
      <div className="h-[120px] bg-slate-300">
        <div className="container relative">
          <div
            className="w-[120px] h-[120px] absolute left-0 top-10 rounded-full border-4 
          border-white bg-gray-200 flex justify-center items-center"
          >
            <div className="uppercase text-gray-400 text-[80px]">
              {avatarText}
            </div>
          </div>
        </div>
      </div>
      <div className="py-[80px] container">
        <h1 className="font-bold text-[60px]">{user.name}</h1>
        <p className="text-gray-500">Joined at {joinDateFormated}</p>
      </div>
    </>
  );
};
