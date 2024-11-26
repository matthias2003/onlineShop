import { useContext } from "react";
import { FormSwitchContext } from "../components/Context/FormSwitchProvider";

export const useFormSwitch = () => {
    return useContext(FormSwitchContext);
}