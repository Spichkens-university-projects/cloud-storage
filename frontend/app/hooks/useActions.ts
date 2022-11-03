import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { RootActions } from "../store/root-actions";

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(RootActions, dispatch)
}