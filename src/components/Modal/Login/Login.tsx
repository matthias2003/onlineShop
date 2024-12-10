import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { resetPassword, sendLoginInfo } from "../../../requests";
import { useAuth } from "../../../hooks/useAuth";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useFormSwitch } from "../../../hooks/useFormSwitch";
import { ModalSetActive } from "../../../utilities/interfaces";
import { motion } from "framer-motion";
import * as yup from "yup";
import * as icon from "../../../assets/icons/navIcons";
import "./Login.css";

function Login({ setIsActiveLoginPanel } :ModalSetActive) {
    const [ errorInfo, setErrorInfo ] = useState<string>("");
    const [ toggleLoader, setToggleLoader ] = useState<boolean>(false);
    const [ loadComplete, setLoadComplete ] = useState<boolean>(false);
    const [ resetPasswordStatus, setResetPasswordStatus ] = useState<boolean>(false);
    const [ resetPasswordMessage, setResetPasswordMessage] = useState<string>(" ");

    const emailRef = useRef<HTMLInputElement | null >(null);
    const emailRefReset = useRef<HTMLInputElement | null >(null);
    const passwordRef = useRef<HTMLInputElement | null >(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const { setAuth } = useAuth();
    const { setSwitchForm } = useFormSwitch();
    const isInView = useInView(modalRef);

    const loginSchema = yup.object({
        email:yup.string().email("Invalid email").min(5).max(30),
        password:yup.string().min(5).max(30)
    });

    const resetSchema = yup.object({
        email:yup.string().email("Invalid email").min(5).max(30),
    });

    const toggleResetPassword = () => {
        setResetPasswordStatus(!resetPasswordStatus);
        emailRef.current?.classList.remove("login-modal__input--invalid");
        passwordRef.current?.classList.remove("login-modal__input--invalid");
        emailRefReset.current?.classList.remove("login-modal__input--invalid");
        setResetPasswordMessage(" ");
        setErrorInfo("");
    };

    const changeStyleReset = () => {
        emailRefReset.current?.classList.remove("login-modal__input--invalid");
        setResetPasswordMessage("");
    };

    const resetPasswordHandler = async ( e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email:emailRefReset.current?.value,
        };
        if (data.email) {
            try {
                await resetSchema.validate( data, { abortEarly: false });
                await resetPassword(data.email);
                setResetPasswordMessage("We have sent you a link to change your password by email!");
                setTimeout(() => {
                    setResetPasswordStatus(false);
                    setResetPasswordMessage(" ");
                },3000);
            } catch (err) {
                setResetPasswordMessage("Please enter valid email");
                emailRefReset.current?.classList.add("login-modal__input--invalid");
            }
        }
    };

    useEffect(() => {
        if (isInView) {
            disableBodyScroll(modalRef as unknown as Element | HTMLElement);
        } else {
            enableBodyScroll(modalRef as unknown as Element | HTMLElement);
        }
    }, [isInView]);

    const handleSubmit = async ( event:any ) => {
        event.preventDefault();
        const data = {
            email:emailRef.current?.value,
            password:passwordRef.current?.value
        };

        try {
            setToggleLoader(true);
            await loginSchema.validate( data, { abortEarly: false });
            const loginData  = await sendLoginInfo(data);
            if (loginData.status) {
                setLoadComplete(true);
                setTimeout( () => { setIsActiveLoginPanel(false)}, 1000);
                setAuth({token:loginData.accessToken });
            } else if (!loginData.status) {
                setErrorInfo("Incorrect email or password");
                emailRef.current?.classList.add("login-modal__input--invalid");
                passwordRef.current?.classList.add("login-modal__input--invalid");
            }
        } catch (err) {
            setToggleLoader(false);
            setErrorInfo("Incorrect email or password");
            emailRef.current?.classList.add("login-modal__input--invalid");
            passwordRef.current?.classList.add("login-modal__input--invalid");
        }
    };

    const changeStyle = ( event:any ) => {
        emailRef.current?.classList.remove("login-modal__input--invalid");
        passwordRef.current?.classList.remove("login-modal__input--invalid");
        setErrorInfo("");
    };

    return(
        <>
        { !resetPasswordStatus ?
            (
            <div className="login-modal__wrap">
                <motion.button
                    className="modal__button--close"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => { setIsActiveLoginPanel(false) }}>
                    <img className="modal__icon--close" src={icon.close} alt="Close"/>
                </motion.button>
                <h1 className="login-modal__header">Sign in</h1>
                <form className="login-modal__form" onSubmit={ handleSubmit } onKeyDown={( e ) => {
                    if (e.key === "Enter") {
                        handleSubmit(e);
                    }}}>
                    <div className="login-modal__form-wrap">
                        <input onChange={ changeStyle } ref={emailRef} required className="login-modal__input" type="text"
                               id="email" name="email"
                               placeholder="E-mail"/>
                        <label className="login-modal__label" htmlFor="email">E-mail</label>
                    </div>
                    <div className="login-modal__form-wrap">
                        <input onChange={ changeStyle } ref={passwordRef} required className="login-modal__input"
                               type="password" id="password"
                               name="password" placeholder="Password"/>
                        <label className="login-modal__label" htmlFor="password">Password</label>
                    </div>
                    <p className="login-modal__link-text" onClick={ toggleResetPassword }>Forgot your password?</p>
                    <p className="login-modal_error-info">{ errorInfo }</p>
                    <div className={toggleLoader ? "login-modal__loader" : "login-modal__loader-off"}>
                        <div className={!loadComplete ? "circle-loader" : "circle-loader load-complete"}>
                            {loadComplete && <div className="checkmark draw"></div>}
                        </div>
                    </div>
                    <button className="login-modal__button">SIGN IN</button>
                    <p>Don't have an account? <span className="login-modal__link" onClick={() => {setSwitchForm(true)}}>Sign Up</span>
                    </p>
                </form>
            </div>
            )
            :
            (
                <div className="login-modal__wrap">
                    <motion.button
                        className="modal__button--close"
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.8}}
                        onClick={() => {
                            setIsActiveLoginPanel(false)
                        }}>
                        <img className="modal__icon--close" src={icon.close} alt="Close"/>
                    </motion.button>
                    <h1 className="login-modal__header">Reset password</h1>
                    <form className="login-modal__form" onSubmit={resetPasswordHandler} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            resetPasswordHandler(e);
                        }
                    }}>
                        <div className="login-modal__form-wrap">
                            <input onChange={changeStyleReset} ref={emailRefReset} required className="login-modal__input"
                                   type="text"
                                   id="email" name="email"
                                   placeholder="E-mail"/>
                            <label className="login-modal__label" htmlFor="email">E-mail</label>
                        </div>
                        <p className="login-modal_error-info">{errorInfo}</p>
                        <p>Already reset your password? <span className="login-modal__link-text" onClick={ toggleResetPassword }>Login</span></p>
                        <p className="login-modal_error-info">{ resetPasswordMessage }</p>
                        <div className={toggleLoader ? "login-modal__loader" : "login-modal__loader-off"}>
                            <div className={!loadComplete ? "circle-loader" : "circle-loader load-complete"}>
                                {loadComplete && <div className="checkmark draw"></div>}
                            </div>
                        </div>
                        <button className="login-modal__button">RESET</button>
                    </form>
                </div>
            )
        }
        </>
    )
}

export default Login;