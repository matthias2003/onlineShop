import "./Settings.css";
import * as icons from "../../assets/icons/settingsIcons"
import React, { MutableRefObject, useEffect, useRef, useState} from "react";
import { useUserData } from "../../hooks/useUserData";
import { updateUser } from "../../requests";
import * as yup from "yup";
import { UserData, UpdateRefs } from "../../utilities/interfaces";

function Settings() {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const surnameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const repPasswordRef = useRef<HTMLInputElement | null>(null);
    const { userData, setUserData } = useUserData();
    const [ imagePreview, setImagePreview ] = useState<string>();
    const [ isDisabled, setIsDisabled ] = useState(true);
    const [ userDetails, setUserDetails ] = useState<UserData>({
        email: "",
        name: "",
        profilePicture: "",
        surname: ""
    });
    const [image, setImage] = useState<{
        preview: string;
        raw: File | string;
    }>({
        preview: '',
        raw: '',
    });

    useEffect(() => {
        setUserDetails(userData);
        setImagePreview(userData.profilePicture);
    }, [userData]);

    const updateRefs: UpdateRefs = {
        name:nameRef,
        surname:surnameRef,
        email:emailRef,
        password:passwordRef,
        confirmPassword:repPasswordRef,
    }

    const changeStyle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ref = updateRefs[event.target.name];
        if (ref?.current) {
            ref?.current.classList.remove("settings__input--invalid")
        }
    };

    const passwordReg = new RegExp(/^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,30}$/)
    const emailReg = new RegExp(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);

    const editSchema = yup.object({
        name: yup.string().min(1).max(20).required("Name is required"),
        surname:yup.string().min(1).max(20).required("Surname is required"),
        email: yup.string().email().min(5).max(30).matches(emailReg, "Invalid email"),
        password:yup.string().min(8).max(30).matches(passwordReg,"Invalid password"),
        confirmPassword:yup.string().min(8).max(30).test('password-should-match', "Passwords doesn't match", function(value){
            return this.parent.password === value
        })
    })

    const updateUserDetails = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const fileHandler = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const file : File | undefined= e.target?.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImage({
                preview: previewUrl,
                raw: file,
            });
            setImagePreview(previewUrl);
        }
    }

    const editPersonalData = async () => {
        setIsDisabled(false);
    }

    const updatePersonalData = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const formData = new FormData();
        try {
            await editSchema.validate(userDetails,{ abortEarly: false });
            if (image.raw) {
                formData.append('image', image.raw);
            }
            formData.append('email',userData.email);
            formData.append('userData', JSON.stringify(userDetails))
            await updateUser(formData);
            setIsDisabled(true);
            setUserData(userDetails);
        } catch (err:any) {
            console.log(err)
            err.inner.forEach((item:any) => {
                if (item.path in updateRefs) {
                    const ref = updateRefs[item.path].current;
                    ref?.classList.add("settings__input--invalid")
                }
            })
        }
    }

    return(
        <main className="settings__container">
            <section className="settings__addresses">
                <h4 className="settings__headline">Saved addresses</h4>
                <div className="settings__address-wrap">
                    <div className="settings__address">
                        <p className="settings__paragraph">Admin Adminowski</p>
                        <p className="settings__paragraph">admin@gmail.com</p>
                        <p className="settings__paragraph">Adminowa 47b</p>
                        <p className="settings__paragraph">47-321</p>
                        <p className="settings__paragraph">Adminowo</p>
                        <div className="settings__icons">
                            <figure className="settings__icon-wrap">
                                <img className="settings__icon" src={icons.deleteIcon} alt="Delete"/>
                            </figure>
                            <figure className="settings__icon-wrap">
                                <img className="settings__icon" src={icons.edit} alt="Edit"/>
                            </figure>
                        </div>
                    </div>
                    <div className="settings__address">
                        <p className="settings__paragraph">Admin Adminowski</p>
                        <p className="settings__paragraph">admin@gmail.com</p>
                        <p className="settings__paragraph">Adminowa 47b</p>
                        <p className="settings__paragraph">47-321</p>
                        <p className="settings__paragraph">Adminowo</p>
                        <div className="settings__icons">
                            <figure className="settings__icon-wrap">
                                <img className="settings__icon" src={icons.deleteIcon} alt="Delete"/>
                            </figure>
                            <figure className="settings__icon-wrap">
                                <img className="settings__icon" src={icons.edit} alt="Edit"/>
                            </figure>
                        </div>
                    </div>
                </div>
            </section>
            <section className="settings__payments">
                <h4 className="settings__headline">Saved payment methods</h4>
                <div className="settings__payments-wrap">
                    <div className="settings__payment">
                        <figure className="settings__icon-wrap">
                            <img className="settings__icon settings__icon-large" src={icons.mastercard} alt="Delete"/>
                        </figure>
                        <p className="settings__payment-p">**** **** **** 7462</p>
                    </div>
                    <div className="settings__payment">
                        <figure className="settings__icon-wrap">
                            <img className="settings__icon settings__icon-large" src={icons.visa} alt="Delete"/>
                        </figure>
                        <p className="settings__payment-p">**** **** **** 4722</p>
                    </div>
                </div>
            </section>
            <h4 className="settings__headline">Personal details</h4>
            <section className="settings__details">
                <div className="settings__details-wrap">
                    <div className="settings__input-wrap">
                        <input ref={emailRef} className="settings__input" type="text" onChange={(e) => {
                            updateUserDetails(e)
                            changeStyle(e)
                        }}
                               id="email" name="email" value={userDetails.email || ""}
                               placeholder="E-mail" disabled={isDisabled}/>
                        <label className="settings__label" htmlFor="email">E-mail</label>
                    </div>
                    <div className="settings__input-wrap">
                        <input ref={passwordRef} className="settings__input" type="password" onChange={(e) => {
                            updateUserDetails(e)
                            changeStyle(e)
                        }}
                               id="password" name="password" value="placeholder"
                               placeholder="Password" disabled/>
                        <label className="settings__label" htmlFor="password">Password</label>
                    </div>
                    <div className="settings__input-wrap">
                        <input ref={repPasswordRef} className="settings__input" type="password" onChange={(e) => {
                            updateUserDetails(e)
                            changeStyle(e)
                        }}
                               id="confirmPassword" name="confirmPassword" value="placeholder"
                               placeholder="Password" disabled/>
                        <label className="settings__label" htmlFor="password">Confirm Password</label>
                    </div>
                    <div className="settings__input-wrap">
                        <input ref={nameRef} className="settings__input" type="text" onChange={(e) => {
                            updateUserDetails(e)
                            changeStyle(e)
                        }}
                               id="name" name="name" value={userDetails.name || ""}
                               placeholder="Name" disabled={isDisabled}/>
                        <label className="settings__label" htmlFor="name">Name</label>
                    </div>
                    <div className="settings__input-wrap">
                        <input ref={surnameRef} className="settings__input" type="text" onChange={(e) => {
                            updateUserDetails(e)
                            changeStyle(e)
                        }}
                               id="surname" name="surname" value={userDetails.surname || ""}
                               placeholder="Surname" disabled={isDisabled}/>
                        <label className="settings__label" htmlFor="surname">Surname</label>
                    </div>
                    <div className="settings__input-wrap">
                        <input className="settings__input" type="date"
                               name="dateOfBirth" id="dateOfBirth" value="2002-01-12"
                               placeholder="Date of birth" disabled/>
                        <label className="settings__label" htmlFor="dateOfBirth">Date of birth</label>
                    </div>
                    <div className="setting__last-row">
                        <div className="settings__avatar-wrap">
                            <figure className="settings__avatar">
                                <img className="settings__avatar-img" src={imagePreview} alt="Avatar"/>
                            </figure>
                            <label htmlFor="file-upload" className="settings__file-upload">
                                <img src={icons.upload} className="settings__icon-sm" alt="Upload profile"/>
                                <p className="settings__file-p">Upload</p>
                            </label>
                            <input onChange={fileHandler} accept=".png,.jpg, .svg" className="settings__file-hidden"
                                   id="file-upload" type="file"/>
                        </div>
                        <div className="settings__submit-wrap">
                            <div className="settings__button--wrap">
                                <button className="setting__submit" onClick={editPersonalData}>Edit</button>
                            </div>
                            <div className="settings__button--wrap">
                                <button className="setting__submit" onClick={updatePersonalData}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Settings;