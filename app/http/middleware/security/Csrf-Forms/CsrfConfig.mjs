import { doubleCsrf } from "csrf-csrf";

const CsrfConfig = async (csrf) => {
  return doubleCsrf({
    getSecret: (req) => req.secret,
    secret: csrf.secret,
    cookieName: csrf.cookie_name,
    cookieOptions: { sameSite: csrf.samesite, secure: csrf.secure, signed: csrf.signed },
    size: csrf.size,
    ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  });
};

export default CsrfConfig;