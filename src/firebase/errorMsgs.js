export function getLoginErrorMessage(errCode) {
    return (
        errCode === "auth/invalid-credential" ? "Invalid credentials, try again or create a new account." :
        errCode === "auth/invalid-email" ? "Invalid email format." :
        errCode === "auth/missing-password" ? "Password is required." :
        "An error occurred. Please try again."
    )
}