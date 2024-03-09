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
                        <input type="text" value={email} onChange={(event) => {
                            setEmail(event.target.value)
                        }}/>
                        <input type="password" value={password} onChange={(event) => {
                            setPassword(event.target.value)
                        }}/>
                        <p>Forgot your password?</p>
                        <div className="remember-me">
                            <input readOnly checked={isChecked} onClick={(event) => {
                                setIsChecked(!isChecked)
                            }} type="checkbox"/>
                            <p>Remember me</p>
                        </div>
                        <button>SIGN IN</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginModal;