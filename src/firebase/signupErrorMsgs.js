export const getSignUpErrorMessage = (errorCode) => {
    const errorMessages = {
        "auth/invalid-email": "Invalid email format. Please enter a valid email.",
        "auth/email-already-in-use": "This email is already registered. Try logging in.",
        "auth/weak-password": "Weak password. Use at least 6 characters.",
        "auth/missing-email": "Please enter an email address.",
        "auth/missing-password": "Please enter a password.",
        "auth/operation-not-allowed": "Sign-up with email/password is disabled.",
        "auth/network-request-failed": "Network error. Check your internet connection.",
        "auth/too-many-requests": "Too many attempts. Try again later.",
    };
    return errorMessages[errorCode] || "An unexpected error occurred. Please try again.";
};