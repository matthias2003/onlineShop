import { motion } from "framer-motion";
import "./Modal.css"
import Backdrop from "../Backdrop/Backdrop";
import {Dispatch, SetStateAction, useState} from "react";
import {sendLoginInfo} from "../../../requests";
function Modal({setIsActiveLoginPanel}:{setIsActiveLoginPanel:Dispatch<SetStateAction<boolean>>}) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const data = {
            email:email,
            password:password,
        }
        await sendLoginInfo(data);
    }
    const options = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y:"0",
            opacity: 1,
            transition: {
                duration:0.1,
                type:"spring",
                stiffness:500,
                damping:25,
            },
        },
        exit: {
            y:"100vh",
            opacity: 0,
        }
    }

    return(
        <Backdrop setIsActiveLoginPanel={setIsActiveLoginPanel}>
            <motion.div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className={"modal"}
                variants={options}
                initial={"hidden"}
                animate={"visible"}
                exit={"exit"}>
                    <h1>Sign in</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={"form--group"}>
                            <input type="text" id={"email"} placeholder={"E-mail"} value={email} onChange={(event) => {
                                setEmail(event.target.value)
                            }}/>
                            <label htmlFor={"email"} className={"form--label"}>E-mail</label>
                        </div>
                        <div className={"form--group"}>
                            <input type="password" id={"password"} placeholder={"Password"} value={password}
                                   onChange={(event) => {
                                       setPassword(event.target.value)
                                   }}/>
                            <label htmlFor={"password"} className={"form--label"}>Password</label>
                        </div>
                        <p>Forgot your password?</p>
                        {/*<div className="remember-me">*/}
                        {/*    <input readOnly checked={isChecked} onClick={(event) => {*/}
                        {/*        setIsChecked(!isChecked)*/}
                        {/*    }} type="checkbox"/>*/}
                        {/*    <p>Remember me</p>*/}
                        {/*</div>*/}
                        <button>SIGN IN</button>
                        <p>Don't have an account? Sign Up</p>
                    </form>
            </motion.div>
        </Backdrop>
    )
}

export default Modal;