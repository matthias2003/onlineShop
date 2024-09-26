
import "./Settings.css";
import * as icons from "../../assets/icons/settingsIcons"
import {useState} from "react";

function Settings() {
    const [ imagePreview, setImagePreview ] = useState<string>("");

    const fileHanlder = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };

            reader.readAsDataURL(file);
            console.log(imagePreview)
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
                        <input className="settings__input" type="text"
                               id="email" name="email" value="admin@gmail.com"
                               placeholder="E-mail"/>
                        <label className="settings__label" htmlFor="email">E-mail</label>
                    </div>
                    <div className="settings__input-wrap">
                        <input className="settings__input" type="password"
                               id="password" name="password" value="**************"
                               placeholder="Password"/>
                        <label className="settings__label" htmlFor="password">Password</label>
                    </div>
                    <div className="settings__input-wrap">
                        <input className="settings__input" type="text"
                               id="name" name="name" value="Admin"
                               placeholder="Name"/>
                        <label className="settings__label" htmlFor="name">Name</label>
                    </div>
                    <div className="settings__input-wrap">
                        <input className="settings__input" type="text"
                               id="surname" name="surname" value="Adminowski"
                               placeholder="Surname"/>
                        <label className="settings__label" htmlFor="surname">Surname</label>
                    </div>
                    <div className="settings__input-wrap">
                        <input className="settings__input" type="date"
                               name="dateOfBirth" id="dateOfBirth" value="2002-01-12"
                               placeholder="Date of birth"/>
                        <label className="settings__label" htmlFor="dateOfBirth">Date of birth</label>
                    </div>

                    <div>
                        <label htmlFor="file-upload" className="settings__file-upload">
                            <img src={icons.upload} className="settings__icon-sm" alt="Upload profile image"/>
                            <p className="settings__file-p">Custom Upload</p>
                        </label>
                        <input onChange={fileHanlder} className="settings__file-hidden" id="file-upload" type="file"/>
                    </div>
                    <img src={imagePreview} />
                </div>
            </section>
        </main>
    )
}

export default Settings;