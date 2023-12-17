import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import { useAppDispatch } from "../app/hooks";
import { setToast, setUserStatus } from "../app/slices/AppSlice";
const Footer = () => {
  const dispatch = useAppDispatch();
  const handleLogOut = async () => {
    await signOut(firebaseAuth);
    await dispatch(setUserStatus(undefined));
    dispatch(setToast("Log Out successFully"));
  };
  return (
    <footer>
      <div className="block"></div>
      <div className="data"></div>
      <div className="block">
        <MdOutlinePowerSettingsNew onClick={handleLogOut} />
      </div>
    </footer>
  );
};

export default Footer;
