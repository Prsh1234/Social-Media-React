export const validateLoginData = (data) => {
    const errors = {
        email: '',
        password: '',
    };
    let hasError = false;

    if (data.email.trim() === '') {
        errors.email = 'Email is required';
        hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Invalid email format';
        hasError = true;
    }

    if (data.password.trim() === '') {
        errors.password = 'Password is required';
        hasError = true;
    }

    return { errors, hasError };
};
