interface UserAvatarProps {
  name: string;
}

export default ({ name }: UserAvatarProps) => {
  const avatarText = name ? name[0] : "";
  return (
    <div
      className="w-[120px] h-[120px] rounded-full border-4 
          border-white bg-gray-200 flex justify-center items-center"
    >
      <div className="uppercase text-gray-400 text-[80px]">{avatarText}</div>
    </div>
  );
};
