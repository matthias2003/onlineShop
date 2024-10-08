import { Dispatch, SetStateAction, useEffect, useRef, useState, useContext } from "react";
import { useInView } from "framer-motion";
import {registerUser, sendLoginInfo} from "../../../requests";
import { useAuth } from "../../../hooks/useAuth";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import * as icon from "../../../assets/icons/navIcons";
import "./Login.css"
import { z } from "zod";
import { FormContext } from "../Modal";
import { motion } from "framer-motion";

interface propTypes {
    setIsActiveLoginPanel:Dispatch<SetStateAction<boolean>>
}

function Login({ setIsActiveLoginPanel } :propTypes) {
    const emailRef = useRef<HTMLInputElement | null >(null);
    const passwordRef = useRef<HTMLInputElement | null >(null)
    const [ errorInfo, setErrorInfo ] = useState<string>("")
    const [ toggleLoader, setToggleLoader ] = useState<boolean>(false);
    const [ loadComplete, setLoadComplete ] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(modalRef);
    const { setAuth } = useAuth();
    const { setSwitchForm }  = useContext(FormContext);

    const loginSchema = z.object({
        email:z.string().email("Invalid email").min(5).max(30),
        password:z.string().min(5).max(30)
    })

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
            setToggleLoader(true);
            loginSchema.parse(data);
            const loginData  = await sendLoginInfo(data);
            if (loginData.status) {
                setLoadComplete(true);
                setTimeout( () => { setIsActiveLoginPanel(false)},1000)
                setAuth({token:loginData.accessToken})
            } else if (!loginData.status) {
                setErrorInfo("Incorrect email or password");
                emailRef.current?.classList.add("login-modal__input--invalid")
                passwordRef.current?.classList.add("login-modal__input--invalid")
            }
        } catch (err) {
            setToggleLoader(false);
            setErrorInfo("Incorrect email or password");
            emailRef.current?.classList.add("login-modal__input--invalid")
            passwordRef.current?.classList.add("login-modal__input--invalid")
        }
    }

    const changeStyle = (event:any) => {
        emailRef.current?.classList.remove("login-modal__input--invalid")
        passwordRef.current?.classList.remove("login-modal__input--invalid")
        setErrorInfo("")
    };


    return(
        <div className="login-modal__wrap">
            <motion.button
                className="modal__button--close"
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.8}}
                onClick={() => { setIsActiveLoginPanel(false) }}
            >
                <img className="modal__icon--close" src={icon.close} alt="Close"/>
            </motion.button>
            <h1 className="login-modal__header">Sign in</h1>
            <form className="login-modal__form" onSubmit={handleSubmit} onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleSubmit(e);
                }
            }}>
                <div className="login-modal__form-wrap">
                    <input onChange={changeStyle} ref={emailRef} required className="login-modal__input" type="text"
                           id="email" name="email"
                           placeholder="E-mail"/>
                    <label className="login-modal__label" htmlFor="email">E-mail</label>
                </div>
                <div className="login-modal__form-wrap">
                    <input onChange={changeStyle} ref={passwordRef} required className="login-modal__input"
                           type="password" id="password"
                           name="password" placeholder="Password"/>
                    <label className="login-modal__label" htmlFor="password">Password</label>
                </div>
                <p>Forgot your password?</p>
                <p className="login-modal_error-info">{errorInfo}</p>

                <div className={toggleLoader ? "login-modal__loader" : "login-modal__loader-off"}>
                    <div className={!loadComplete ? "circle-loader" : "circle-loader load-complete"}>
                        {loadComplete && <div className="checkmark draw"></div>}
                    </div>
                </div>

                <button className="login-modal__button">SIGN IN</button>
                <p>Don't have an account? <span className="login-modal__link" onClick={() => {
                    setSwitchForm(true)
                }}>Sign Up</span></p>
            </form>
        </div>
    )
}

export default Login;