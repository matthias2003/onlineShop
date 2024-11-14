import "./Register.css";
import {createRef, Dispatch, SetStateAction, SyntheticEvent, useContext, useRef, useState} from "react";
import { registerUser } from "../../../requests";
import {util, z} from "zod";
import * as icon from "../../../assets/icons/navIcons";
import { FormContext } from "../Modal";
import { motion } from "framer-motion";
import * as yup from 'yup';
import objectKeys = util.objectKeys;

interface propTypes {
    setIsActiveLoginPanel:Dispatch<SetStateAction<boolean>>
}

function Register({ setIsActiveLoginPanel } :propTypes) {
    const { setSwitchForm }  = useContext(FormContext);
    const [ formError , setFormError ] = useState<string>("")
    const [ toggleLoader, setToggleLoader ] = useState<boolean>(false);
    const [ loadComplete, setLoadComplete ] = useState<boolean>(false);
    const [ formData, setFormData ] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: Date
    })
    const nameRef = useRef<HTMLInputElement | null>(null);
    const surnameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const repPasswordRef = useRef<HTMLInputElement | null>(null);
    const dateRef = useRef<HTMLInputElement | null>(null);

    const registerRefs= {
        name:nameRef,
        surname:surnameRef,
        email:emailRef,
        password:passwordRef,
        confirmPassword:repPasswordRef,
        dateOfBirth:dateRef
    }

    const changeStyle = (event:any) => {
        registerRefs[event.target.name].current.classList.remove("register-modal__input--invalid")
    };

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const passwordReg = new RegExp(/^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,30}$/)
    const emailReg = new RegExp(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);

    const registerSchema = yup.object({
        name: yup.string().min(1).max(20).required("Name is required"),
        surname:yup.string().min(1).max(20).required("Surname is required"),
        email: yup.string().email().min(5).max(30).matches(emailReg, "Invalid email"),
        password:yup.string().min(8).max(30).matches(passwordReg,"Invalid password"),
        confirmPassword:yup.string().min(8).max(30).test('password-should-match', "Passwords doesn't match", function(value){
            return this.parent.password === value
        }),
        dateOfBirth: yup.date()
    })

    const updateFormData = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event:SyntheticEvent) => {
        event.preventDefault();
        setToggleLoader(true);

        try {
            await registerSchema.validate( formData,{abortEarly: false});
            await registerUser(formData);
            setLoadComplete(true);
            setTimeout( () => { setSwitchForm(false)},1000)
        } catch (err:any) {
            setToggleLoader(false);

            err.inner.forEach((item:any) => {
                if (item.path in registerRefs) {
                    registerRefs[item.path].current.classList.add("register-modal__input--invalid")
                }
            })
        }
    }
    return(
        <div className="register-modal">
            <motion.button
                className="modal__button--close"
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.8}}
                onClick={() => {
                    setIsActiveLoginPanel(false)
                }}
            >
                <img className="modal__icon--close" src={icon.close} alt="Close"/>
            </motion.button>

            <h1 className="register-modal__header">Sign up</h1>
            <form className="register-modal__form" onSubmit={handleSubmit}>
                <div className="register-modal__form-wrap">
                    <div className="register-modal__form-wrap " style={{margin: "0 5px 0 0"}}>
                        <input
                            className="register-modal__input"
                            type="text"
                            id="name"
                            name="name"
                            ref={nameRef}
                            placeholder="First name"
                            onChange={ (e) => {
                                updateFormData(e);
                                changeStyle(e);
                            }}
                        />
                        <label className="register-modal__label" htmlFor="name">First Name</label>
                    </div>
                    <div className="register-modal__form-wrap" style={{margin: "0 0 0 5px"}}>
                        <input
                            className="register-modal__input"
                            type="text"
                            id="surname"
                            name="surname"
                            ref={surnameRef}
                            placeholder="Last Name"
                            onChange={ (e) => {
                                updateFormData(e);
                                changeStyle(e);
                            }}
                        />
                        <label className="register-modal__label" htmlFor="surname">Last Name</label>
                    </div>
                </div>
                <div className="register-modal__form-wrap">
                    <input
                        className="register-modal__input"
                        type="text"
                        id="email"
                        name="email"
                        ref={emailRef}
                        placeholder="Email"
                        onChange={ (e) => {
                            updateFormData(e);
                            changeStyle(e);
                        }}
                    />
                    <label className="register-modal__label" htmlFor="email">Email</label>
                </div>
                <div className="register-modal__form-wrap">
                    <input
                        className="register-modal__input"
                        type="password"
                        id="password"
                        name="password"
                        ref={passwordRef}
                        placeholder="Password"
                        onChange={ (e) => {
                            updateFormData(e);
                            changeStyle(e);
                        }}
                    />
                    <label className="register-modal__label" htmlFor="password">Password</label>
                </div>
                <div className="register-modal__form-wrap">
                    <input
                        className="register-modal__input"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        ref={repPasswordRef}
                        placeholder="Confirm Password"
                        onChange={ (e) => {
                            updateFormData(e);
                            changeStyle(e);
                        }}
                    />
                    <label className="register-modal__label" htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <div className="register-modal__form-wrap">
                    <input
                        className="register-modal__input"
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        ref={dateRef}
                        placeholder="dateOfBirth"
                        min="1900-01-01"
                        max={getCurrentDate()}
                        onChange={ (e) => {
                            updateFormData(e);
                            changeStyle(e);
                        }}
                    />
                    <label className="register-modal__label" htmlFor="dateOfBirth">Date of birth</label>
                </div>

                <div className={ toggleLoader ? "register-modal__loader" : "register-modal__loader-off"} >
                    <div className={ !loadComplete ? "circle-loader" : "circle-loader load-complete" }>
                        { loadComplete && <div className="checkmark draw"></div> }
                    </div>
                </div>

                <button className="register-modal__button">SING UP</button>
                <p>Already have an account? <span className="register-modal__link" onClick={() => {
                    setSwitchForm(false)
                }}>Sign In</span></p>
            </form>
        </div>
    )
}

export default Register;