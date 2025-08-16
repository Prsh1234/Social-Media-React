export const validateSignUpData = (data) => {
    const errors = {
        email: '',
        password: '',
        confirmPassword: '',
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
    }// else if (data.password.length < 8) {
    //     errors.password = 'Password must be at least 8 characters';
    //     hasError = true;
    // } else if (!/[A-Z]/.test(data.password)) {
    //     errors.password = 'Password must contain at least one uppercase letter';
    //     hasError = true;
    // } else if (!/[a-z]/.test(data.password)) {
    //     errors.password = 'Password must contain at least one lowercase letter';
    //     hasError = true;
    // } else if (!/[0-9]/.test(data.password)) {
    //     errors.password = 'Password must contain at least one number';
    //     hasError = true;
    // } else if (!/[!@#$%^&*]/.test(data.password)) {
    //     errors.password = 'Password must contain at least one special character (!@#$%^&*)';
    //     hasError = true;
    // }

    if (data.confirmPassword.trim() === '') {
        errors.confirmPassword = 'Confirm Password is required';
        hasError = true;
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Password and Confirm Password do not match';
        hasError = true;
    }

    return { errors, hasError };
};

export const validatePassword = (data) => {
    const errors = {
        password: '',
        confirmPassword: '',
    };

    let hasError = false
    if (data.password.trim() === '') {
        errors.password = 'Password is required';
        hasError = true;
    }// else if (data.password.length < 8) {
    //     errors.password = 'Password must be at least 8 characters';
    //     hasError = true;
    // } else if (!/[A-Z]/.test(data.password)) {
    //     errors.password = 'Password must contain at least one uppercase letter';
    //     hasError = true;
    // } else if (!/[a-z]/.test(data.password)) {
    //     errors.password = 'Password must contain at least one lowercase letter';
    //     hasError = true;
    // } else if (!/[0-9]/.test(data.password)) {
    //     errors.password = 'Password must contain at least one number';
    //     hasError = true;
    // } else if (!/[!@#$%^&*]/.test(data.password)) {
    //     errors.password = 'Password must contain at least one special character (!@#$%^&*)';
    //     hasError = true;
    // }

    if (data.confirmPassword.trim() === '') {
        errors.confirmPassword = 'Confirm Password is required';
        hasError = true;
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Password and Confirm Password do not match';
        hasError = true;
    }

    return { errors, hasError };
}
