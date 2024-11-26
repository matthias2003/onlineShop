import { Dispatch, MutableRefObject, SetStateAction } from "react";

export interface BackdropProps {
    children: any,
    setIsActive:Dispatch<SetStateAction<boolean>>
}

export interface AuthState {
    token: string;
}

export interface AuthContextInterface {
    auth: AuthState;
    setAuth: Dispatch<SetStateAction<AuthState>>;
}

export interface SwitchFormContextType {
    switchForm: boolean;
    setSwitchForm: Dispatch<SetStateAction<boolean>>;
}

export interface UserData {
    name: string;
    surname: string;
    email: string;
    profilePicture: string;
}

export interface UserDataContextTypes {
    userData: UserData;
    setUserData: Dispatch<SetStateAction<UserData>>;
}

export interface PayloadProps {
    id:string,
    iat:number,
    exp:number
}

export interface SearchDataItem {
    _id: string,
    brand: string,
    color: string,
    gender: string,
    price: string,
    sold: number,
    img: string
    name: string
}

interface CartData {
    id:string
    name: string,
    color: string,
    price: string,
    img: string,
    size: number,
    quantity: number
}

export interface Cart {
    [key: string]: CartData;
}

export interface Faves {
    [key: string]: SearchDataItem;
}

export interface ModalActive {
    setIsActiveLoginPanel:Dispatch<SetStateAction<boolean>>,
    isActiveLoginPanel: boolean,
}

export interface ModalSetActive {
    setIsActiveLoginPanel:Dispatch<SetStateAction<boolean>>
}

export interface UpdateRefs {
    [key: string]: MutableRefObject<HTMLInputElement | null>;
}