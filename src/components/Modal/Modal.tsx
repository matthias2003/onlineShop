import { Dispatch, SetStateAction, useEffect, useRef, useState, useContext } from "react";
import { motion, useInView } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";
import { sendLoginInfo } from "../../requests";
import { AuthContext } from "../Context/AuthProvider";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import * as icon from "../../assets/icons/navIcons";
import "./Modal.css"

interface propTypes {
    setIsActiveLoginPanel:Dispatch<SetStateAction<boolean>>,
    isActiveLoginPanel: boolean
}

function Modal({ isActiveLoginPanel, setIsActiveLoginPanel } :propTypes) {
    const emailRef = useRef<HTMLInputElement | null >(null);
    const passwordRef = useRef<HTMLInputElement | null >(null)
    const [ errorInfo, setErrorInfo ] = useState<string>("")
    const modalRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(modalRef);
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        if (isInView) {
            disableBodyScroll(modalRef as unknown as Element | HTMLElement);
        } else {
            enableBodyScroll(modalRef as unknown as Element | HTMLElement);
        }
    }, [isInView]);

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const data = {
            email:emailRef.current?.value,
            password:passwordRef.current?.value
        };

        try {
            const loginData  = await sendLoginInfo(data);
            if (loginData.status) {
                setIsActiveLoginPanel(false); // TODO: change logic of logging in
                setAuth(loginData.accessToken)
            } else if (!loginData.status) {
                setErrorInfo("Incorrect email or password");
                //TODO: ADD RED INPUT STYLE HERE
            }
        } catch (err) {
            console.log("Not working") // TODO: add messages related to status codes returned from API
        }
    }

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
                className="login-modal"
                variants={options}
                initial="hidden"
                animate="visible"
                ref={modalRef}
                exit="exit">
                <div className="login-modal__wrap">
                    <button className="login-modal__button--close" onClick={ () => { setIsActiveLoginPanel(false)} }><img className="login-modal__icon--close" src={icon.close} alt="Close"/></button>
                    <h1 className="login-modal__header">Sign in</h1>
                    <form className="login-modal__form" onSubmit={ handleSubmit } onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            handleSubmit(e);
                        }
                    }}>
                        <div className="login-modal__form-wrap">
                            <input ref={emailRef} required className="login-modal__input" type="text" id="email" placeholder="E-mail" />
                            <label className="login-modal__label" htmlFor="email">E-mail</label>
                        </div>
                        <div className="login-modal__form-wrap">
                            <input ref={passwordRef} required className="login-modal__input" type="password" id="password" placeholder="Password" />
                            <label className="login-modal__label" htmlFor="password">Password</label>
                        </div>
                        <p className="login-modal_error-info">{errorInfo}</p>
                        <p>Forgot your password?</p>
                        <button className="login-modal__button">SIGN IN</button>
                        <p>Don't have an account? Sign Up</p>
                    </form>
                </div>
            </motion.div>
        </Backdrop>
    )
}

export default Modal;