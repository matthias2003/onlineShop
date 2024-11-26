import {createContext, useState} from "react";
import { SwitchFormContextType } from "../../utilities/interfaces";

export const FormSwitchContext = createContext<SwitchFormContextType>({
    switchForm: false,
    setSwitchForm: () => {}
});

export const FormSwitchProvider = ({ children }:any) => {
    const [ switchForm, setSwitchForm ] = useState<boolean>(false);
    console.log(switchForm)
    return (
        <FormSwitchContext.Provider value={ { switchForm, setSwitchForm }}>
            { children }
        </FormSwitchContext.Provider>
    );
}