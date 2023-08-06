import { useAuth } from "@/hooks";
import createAvatar from "@/lib/createAvatar";

const MyAvatar = ({ ...other }) => {
  const { user } = useAuth();

  return (
    <div
      className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300 font-bold"
      {...other}
    >
      {user && <div> {createAvatar(user.username).name}</div>}
    </div>
  );
};

export default MyAvatar;
