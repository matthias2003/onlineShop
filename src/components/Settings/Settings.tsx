import "./Settings.css";
import * as icons from "../../assets/icons/settingsIcons"
import React, { useState } from "react";
import { useUserData } from "../../hooks/useUserData";
import axios from "axios";
import {useAuth} from "../../hooks/useAuth";

function Settings() {
    const { userData, setUserData } = useUserData();
    const [ imagePreview, setImagePreview ] = useState<string>(userData.profilePicture);
    const { auth } = useAuth();
    const [ isDisabled, setIsDisabled ] = useState(true);
    const [ image, setImage ] = useState({
        preview: '',
        raw: '',
    });

    const [ userDetails, setUserDetails ] = useState({
        email: "admin@gmail.com",
        password: "Admin123!@#",
        confirmPassword: "Admin123!@#",
        name:"Admin",
        surname:"Adminowski"
    });

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

    const updatePersonalData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image.raw);
        formData.append('email',userData.email);
        try {

            const res =  await axios.post("http://127.0.0.1:3001/user/update", formData ,{
                headers: { 'Content-Type': 'multipart/form-data' }})
        } catch (err) {
            console.error('Error uploading image:', err);
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
                        <input className="settings__input" type="text" onChange={updateUserDetails}
                               id="email" name="email" value={userDetails.email}
                               placeholder="E-mail" disabled={isDisabled}/>
                        <label className="settings__label" htmlFor="email">E-mail</label>
                    </div>
                    <div className="settings__input-wrap">
                        <input className="settings__input" type="password" onChange={updateUserDetails}
                               id="password" name="password" value={userDetails.password}
                               placeholder="Password" disabled={isDisabled}/>
                        <label className="settings__label" htmlFor="password">Password</label>
                    </div>
                    <div className="settings__input-wrap">
                        <input className="settings__input" type="password" onChange={updateUserDetails}
                               id="confirmPassword" name="password" value={userDetails.password}
                               placeholder="Password" disabled={isDisabled}/>
                        <label className="settings__label" htmlFor="password">Confirm Password</label>
                    </div>
                    <div className="settings__input-wrap">
                        <input className="settings__input" type="text" onChange={updateUserDetails}
                               id="name" name="name" value={userDetails.name}
                               placeholder="Name" disabled={isDisabled}/>
                        <label className="settings__label" htmlFor="name">Name</label>
                    </div>
                    <div className="settings__input-wrap">
                        <input className="settings__input" type="text" onChange={updateUserDetails}
                               id="surname" name="surname" value={userDetails.surname}
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