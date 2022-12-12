import { IUser } from "apps/authenticated-front/src/app/models";
import { format } from "date-fns";

interface UserProfileProps {
  user: IUser;
}

export default ({ user }: UserProfileProps) => {
  const joinDateFormated = format(new Date(user.createdAt), "MMMM yyyy");
  return (
    <>
      <h1 className="font-bold text-[60px]">{user.name}</h1>
      <p className="text-gray-500 mb-6">Joined at {joinDateFormated}</p>
      <p>{user.description}</p>
    </>
  );
};
