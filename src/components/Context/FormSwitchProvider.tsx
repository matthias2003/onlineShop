import { createContext, useState } from "react";
import { SwitchFormContextType } from "../../utilities/interfaces";

export const FormSwitchContext = createContext<SwitchFormContextType>({
    switchForm: false,
    setSwitchForm: () => {}
});

export const FormSwitchProvider = ({ children }:any) => {
    const [ switchForm, setSwitchForm ] = useState<boolean>(false);
    return (
        <FormSwitchContext.Provider value={ { switchForm, setSwitchForm }}>
            { children }
        </FormSwitchContext.Provider>
    );
}