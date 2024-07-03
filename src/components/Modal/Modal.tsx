import {createContext, Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import { motion, useInView } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import "./Modal.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import {boolean} from "zod";

interface propTypes {
    setIsActiveLoginPanel:Dispatch<SetStateAction<boolean>>,
    isActiveLoginPanel: boolean,
}

interface SwitchFormContextType {
    switchForm: boolean;
    setSwitchForm: Dispatch<SetStateAction<boolean>>;
}

export const FormContext = createContext<SwitchFormContextType>({
    switchForm: false,
    setSwitchForm: () => {}
});


function Modal({ isActiveLoginPanel, setIsActiveLoginPanel } :propTypes) {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(modalRef);
    const [ switchForm, setSwitchForm ] = useState(false);

    useEffect(() => {
        if (isInView) {
            disableBodyScroll(modalRef as unknown as Element | HTMLElement);
        } else {
            enableBodyScroll(modalRef as unknown as Element | HTMLElement);
        }
    }, [isInView]);

    const options = {
        hidden: {
            y: "-105vh",
            opacity: 0
        },
        visible: {
            y:"0",
            opacity: 1,
            transition: {
                duration:0.1,
                type:"spring",
                stiffness:500,
                damping:25
            },
        },
        exit: {
            y:"-105vh",
            opacity: 0,
        }
    };

    return(
        <Backdrop setIsActive={ setIsActiveLoginPanel }>
            <motion.div
                onClick={( event ) => { event.stopPropagation() }}
                className="modal"
                variants={options}
                initial="hidden"
                animate="visible"
                ref={modalRef}
                exit="exit">
                <FormContext.Provider value={ { switchForm, setSwitchForm }}>
                    { !switchForm ?
                        <Login setIsActiveLoginPanel={ setIsActiveLoginPanel }/>
                        :
                        <Register setIsActiveLoginPanel={ setIsActiveLoginPanel } />
                    }
                </FormContext.Provider>
            </motion.div>
        </Backdrop>
    )
}

export default Modal;