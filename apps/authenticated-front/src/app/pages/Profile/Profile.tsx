import UserProfile from "apps/authenticated-front/src/app/components/UserProfile/UserProfile"
import { IUser } from "apps/authenticated-front/src/app/models";
import { selectUser } from "apps/authenticated-front/src/app/state/authSlide";
import { useSelector } from "react-redux";

export default ()=>{
    const user = useSelector(selectUser); 
    return (
        <div className="mt-[100px] bg-white">
            <UserProfile user={user as IUser}/>
        </div>
    )
}