import "./Register.css";
import { SyntheticEvent, useState } from "react";
import { registerUser } from "../../requests";


function Register() {
    const [ formData, setFormData ] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        dateOfBirth: Date //TODO: DATE IS NOT ASSIGNING TO formData state
    })

    const updateFormData = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event:SyntheticEvent) => {
        event.preventDefault();
        const res = await registerUser(formData);
        console.log(res);
    }
    return(
        <div className="register-modal">
            <h1 className="register-modal__header">SING UP</h1>
            <form className="register-modal__form" onSubmit={handleSubmit}>
                <div className="register-modal__form-wrap">
                    <input
                        className="register-modal__input"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="First name"
                        onChange={updateFormData}
                    />
                    <label className="register-modal__label" htmlFor="firstName">First Name</label>
                </div>
                <div className="register-modal__form-wrap">
                    <input
                        className="register-modal__input"
                        type="text"
                        id="surname"
                        name="surname"
                        placeholder="Last Name"
                        onChange={updateFormData}
                    />
                    <label className="register-modal__label" htmlFor="lastName">Last Name</label>
                </div>
                <div className="register-modal__form-wrap">
                    <input
                        className="register-modal__input"
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={updateFormData}
                    />
                    <label className="register-modal__label" htmlFor="email">Email</label>
                </div>
                <div className="register-modal__form-wrap">
                    <input
                        className="register-modal__input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={updateFormData}
                    />
                    <label className="register-modal__label" htmlFor="password">Password</label>
                </div>
                <div className="register-modal__form-wrap">
                    <input
                        className="register-modal__input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Confirm Password"
                        onChange={updateFormData}
                    />
                    <label className="register-modal__label" htmlFor="password">Confirm Password</label>
                </div>
                <div className="register-modal__form-wrap">
                    <input
                        className="register-modal__input"
                        type="date"
                        id="birthDate"
                        name="dateOfBirth"
                        placeholder="dateOfBirth"
                        onChange={updateFormData}
                    />
                    <label className="register-modal__label" htmlFor="birthDate">Date of birth</label>
                </div>
                <button className="register-modal__button">SING UP</button>
            </form>
        </div>
    )
}

export default Register;