import "./Register.css";
import { SyntheticEvent, useState } from "react";
import { registerUser } from "../../requests";
import { z } from "zod";


function Register() {
    const [ formData, setFormData ] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: Date
    })

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const passwordReg = new RegExp(/^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,30}$/)
    const emailReg = new RegExp(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);

    const registerSchema = z.object({
        name:z.string().min(1).max(20),
        surname:z.string().min(1).max(20),
        email: z.string().email().min(5).max(30).regex(emailReg),
        password: z.string().min(8).max(30).regex(passwordReg),
        confirmPassword: z.string().min(8),
        dateOfBirth: z.coerce.date()
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // path of error
    }).refine((data) => {
        const minDate = new Date('1900-01-01');
        const maxDate = new Date();
        return data.dateOfBirth >= minDate && data.dateOfBirth <= maxDate;
    }, {
        message: "Date of birth must be between 1900-01-01 and 2023-12-31",
        path: ["dateOfBirth"],
    });


    const updateFormData = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event:SyntheticEvent) => {
        event.preventDefault();
        try {
            registerSchema.parse(formData);
            await registerUser(formData);
        } catch (err) {
            console.log(err)
        }

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
                        id="confirmPassword"
                        name="confirmPassword"
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
                        min="1900-01-01"
                        max={getCurrentDate()}
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