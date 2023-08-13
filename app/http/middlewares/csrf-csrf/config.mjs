import { doubleCsrf } from "csrf-csrf";

const CsrfConfig = async (csrf) => {
	return doubleCsrf({
		getSecret: (req) => req.secret,
		secret: csrf.secret,
		cookieName: "X-CSRF-TOKEN",
		cookieOptions: { sameSite: csrf.samesite, secure: csrf.secure, signed: csrf.signed },
		size: csrf.size,
		ignoredMethods: ["HEAD", "OPTIONS"],
	});
};

export default CsrfConfig;