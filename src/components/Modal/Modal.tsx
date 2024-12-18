import {useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useFormSwitch } from "../../hooks/useFormSwitch";
import { ModalActive } from "../../utilities/interfaces";
import Backdrop from "../Backdrop/Backdrop";
import Login from "./Login/Login";
import Register from "./Register/Register";
import "./Modal.css";
import ResetPassword from "./ResetPassword/ResetPassword";

function Modal({ isActiveLoginPanel, setIsActiveLoginPanel, isReset, setIsReset } :ModalActive) {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(modalRef);
    const { switchForm } = useFormSwitch();

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
                type:`spring`,
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
        <Backdrop setIsActive={ setIsActiveLoginPanel } setIsReset={ setIsReset } isReset={ isReset }>
            <motion.div
                onClick={( event ) => { event.stopPropagation() }}
                className="modal"
                variants={options}
                initial="hidden"
                animate="visible"
                ref={modalRef}
                exit="exit">
                { isReset ?
                    ( <ResetPassword setIsActiveLoginPanel={setIsActiveLoginPanel} setIsReset={setIsReset}/> )
                    :
                    ( switchForm ?
                            ( <Register setIsActiveLoginPanel={setIsActiveLoginPanel} />)
                            :
                            ( <Login setIsActiveLoginPanel={setIsActiveLoginPanel} /> )
                )}
            </motion.div>
        </Backdrop>
    )
}

export default Modal;