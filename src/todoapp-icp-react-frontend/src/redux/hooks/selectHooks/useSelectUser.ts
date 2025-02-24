import { IUser } from "../../../utils/types";
import { selectUser } from "../../slices/userSlice";
import { useAppSelector } from "../helperHooks";

type UseSelectUser = () => IUser | null;

export const useSelectUser: UseSelectUser = () => {
  const user = useAppSelector(selectUser);

  return user;
};