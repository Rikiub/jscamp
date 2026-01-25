import cors from "cors";

const ALLOWED_ORIGINS = ["https://localhost:3000", "http://localhost:5173"];

export function corsMiddleware() {
	return cors({
		origin: (origin, callback) => {
			if (!origin || ALLOWED_ORIGINS.includes(origin)) {
				return callback(null, true);
			} else {
				return callback(new Error("Not allowed in CORS"));
			}
		},
	});
}
