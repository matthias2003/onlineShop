import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop/Backdrop";
import { sendLoginInfo } from "../../requests";
import * as icon from "../../assets/icons/navIcons";
import "./Modal.css"

function Modal({ setIsActiveLoginPanel } : { setIsActiveLoginPanel:Dispatch<SetStateAction<boolean>> }) {
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const data = {
            email:email,
            password:password
        };
        await sendLoginInfo(data);
    }

    const options = {
        hidden: {
            y: "-100vh",
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
            y:"100vh",
            opacity: 0,
        }
    };

    return(
        <Backdrop setIsActiveLoginPanel={ setIsActiveLoginPanel }>
            <motion.div
                onClick={( event ) => { event.stopPropagation() }}
                className="login-modal"
                variants={options}
                initial="hidden"
                animate="visible"
                exit="exit">
                <button className="login-modal__button--close" onClick={ () => { setIsActiveLoginPanel(false)} }><img className="login-modal__icon--close" src={icon.close} alt="Close"/></button>
                <h1 className="login-modal__header">Sign in</h1>
                <form className="login-modal__form" onSubmit={ handleSubmit }>
                    <div className="login-modal__form-wrap">
                        <input className="login-modal__input" type="text" id="email" placeholder="E-mail" value={email} onChange={( event ) => { setEmail(event.target.value) }}/>
                        <label className="login-modal__label" htmlFor="email">E-mail</label>
                    </div>
                    <div className="login-modal__form-wrap">
                        <input className="login-modal__input" type="password" id="password" placeholder="Password" value={password} onChange={ ( event ) => { setPassword(event.target.value) }}/>
                        <label className="login-modal__label" htmlFor="password">Password</label>
                    </div>
                    <p>Forgot your password?</p>
                    <button className="login-modal__button">SIGN IN</button>
                    <p>Don't have an account? Sign Up</p>
                </form>
            </motion.div>
        </Backdrop>
    )
}

export default Modal;