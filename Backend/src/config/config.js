export const cookieOptions = {
    httpOnly: true,
    secure: true, // Always true in production when using sameSite: 'none'
    sameSite: "none", // Needed for cross-origin cookies
    maxAge: 1000 * 60 * 60 * 5, // 5 hours
};
