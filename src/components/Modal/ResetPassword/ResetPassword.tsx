import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { setNewPassword } from "../../../requests";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useNavigate } from "react-router-dom";
import { ModalResetPassword } from "../../../utilities/interfaces";
import { motion } from "framer-motion";
import * as yup from "yup";
import * as icon from "../../../assets/icons/navIcons";
import "./ResetPassword.css";

function ResetPassword({ setIsActiveLoginPanel, setIsReset } :ModalResetPassword) {
    const [ errorInfo, setErrorInfo ] = useState<string>("");
    const [ toggleLoader, setToggleLoader ] = useState<boolean>(false);
    const [ loadComplete, setLoadComplete ] = useState<boolean>(false);

    const passwordRef = useRef<HTMLInputElement | null >(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null >(null);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const isInView = useInView(modalRef);

    const passwordReg = new RegExp(/^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,30}$/);

    const resetSchema = yup.object({
        password:yup.string().min(8).max(30).matches(passwordReg,"Invalid password"),
        confirmPassword:yup.string().min(8).max(30).test('password-should-match', "Passwords doesn't match", function(value){
            return this.parent.password === value
        }),
    });

    useEffect(() => {
        if (isInView) {
            disableBodyScroll(modalRef as unknown as Element | HTMLElement);
        } else {
            enableBodyScroll(modalRef as unknown as Element | HTMLElement);
        }
    }, [isInView]);

    const closeHandler = () => {
        setIsActiveLoginPanel(false)
        setIsReset(false);
        setTimeout(() => {
            navigate("/");
        },500);
    };

    const handleSubmit = async ( event:any ) => {
        event.preventDefault();
        passwordRef.current?.classList.remove("modal__input--invalid");
        confirmPasswordRef.current?.classList.remove("modal__input--invalid");

        const data = {
            password:passwordRef.current?.value,
            confirmPassword:confirmPasswordRef.current?.value
        };

        if (data.password && data.confirmPassword) {
            try {
                setToggleLoader(true);
                await resetSchema.validate( data, { abortEarly: false });
                const resetData  = await setNewPassword(data.password);
                console.log(resetData);
                if (resetData) {
                    setLoadComplete(true);
                    setTimeout( () => { setIsActiveLoginPanel(false)}, 1000);
                } else if (!resetData.status) {
                    setErrorInfo("Incorrect email or password");
                    passwordRef.current?.classList.add("modal__input--invalid");
                    confirmPasswordRef.current?.classList.add("modal__input--invalid");
                }
            } catch (err:any) {
                if (err.inner && Array.isArray(err.inner)) {
                    err.inner.forEach((item: any) => {
                        if (item.path === "password") {
                            setErrorInfo("Invalid password");
                        }
                        if (item.path === "confirmPassword") {
                            setErrorInfo("Password doesn't match");
                        }
                    });
                } else {
                    setErrorInfo("An error occurred. Couldn't change password.");
                }
                setToggleLoader(false);
                passwordRef.current?.classList.add("modal__input--invalid");
                confirmPasswordRef.current?.classList.add("modal__input--invalid");
            }
        }
    };

    const changeStyle = ( event:any ) => {
        passwordRef.current?.classList.remove("modal__input--invalid");
        confirmPasswordRef.current?.classList.remove("modal__input--invalid");
        setErrorInfo("");
    };

    return(
        <div className="modal__wrap">
            <motion.button
                className="modal__button--close"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                onClick={ closeHandler }>
                <img className="modal__icon--close" src={icon.close} alt="Close"/>
            </motion.button>
            <h1 className="modal__header">Reset Password</h1>
            <form className="modal__form" onSubmit={ handleSubmit } onKeyDown={( e ) => {
                if (e.key === "Enter") {
                    handleSubmit(e);
                }}}>
                <div className="modal__form-wrap">
                    <input onChange={ changeStyle } ref={passwordRef} required className="modal__input"
                           type="password"
                           id="password" name="password"
                           placeholder="Password"/>
                    <label className="modal__label" htmlFor="password">Password</label>
                </div>
                <div className="modal__form-wrap">
                    <input onChange={ changeStyle } ref={confirmPasswordRef} required className="modal__input"
                           type="password" id="confirmPasswor"
                           name="confirmPasswor" placeholder="Confirm Password"/>
                    <label className="modal__label" htmlFor="confirmPasswor">Confirm Password</label>
                </div>

                <p className="modal_error-info">{ errorInfo }</p>
                <div className={toggleLoader ? "modal__loader" : "modal__loader-off"}>
                    <div className={!loadComplete ? "circle-loader" : "circle-loader load-complete"}>
                        {loadComplete && <div className="checkmark draw"></div>}
                    </div>
                </div>
                <button className="modal__button">RESET</button>
            </form>
        </div>
    )
}

export default ResetPassword;