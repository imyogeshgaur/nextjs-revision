export const isValidEmail = (value: any): boolean => {
    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
}

export const isValidPassword = (value: any): boolean => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}[\]:;<>,.?/~]).{8,}$/.test(value);
}

export const isValidPhoneNumber = (value: any): boolean => {
    return /d{10}$|^\d{10}$/.test(value);
}