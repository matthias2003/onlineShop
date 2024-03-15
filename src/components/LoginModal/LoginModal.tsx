import "./LoginModal.css";
import { Dispatch, SetStateAction, useState } from "react";
import { sendLoginInfo } from "../../requests";


function LoginModal( {setIsActiveLoginPanel}:{setIsActiveLoginPanel:Dispatch<SetStateAction<boolean>>} ) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isChecked, setIsChecked ] = useState<boolean>(false);


    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const data = {
            email:email,
            password:password,
        }
        await sendLoginInfo(data);
    }

    return (
        <>
            <div onClick={()=> { setIsActiveLoginPanel(false) }} className="background--overlay"></div>
            <div className="centered">
                <div className="modal">
                    <h1>Sign in</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={"form--group"}>
                            <input type="text" id={"email"} placeholder={"E-mail"} value={email} onChange={(event) => {
                                setEmail(event.target.value)
                            }}/>
                            <label htmlFor={"email"} className={"form--label"}>E-mail</label>
                        </div>
                        <div className={"form--group"}>
                            <input type="password" id={"password"} placeholder={"Password"} value={password} onChange={(event) => {
                                setPassword(event.target.value)
                            }}/>
                            <label htmlFor={"password"} className={"form--label"}>Password</label>
                        </div>
                        <p>Forgot your password?</p>
                        <div className="remember-me">
                            <input readOnly checked={isChecked} onClick={(event) => {
                                setIsChecked(!isChecked)
                            }} type="checkbox"/>
                            <p>Remember me</p>
                        </div>
                        <button>SIGN IN</button>
                        <p>Don't have an account? Sign Up</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginModal;