import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key_shared_with_bookstack";
const BOOK_ID = 1;

const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    book_id: BOOK_ID,
    user_id: 1,
    user_name: "Test User",
};

const token = jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" });

console.log("\n--- Test URL ---\n");
console.log(`http://localhost:5173/?token=${token}`);
console.log(
    "\nCopy the link above and paste it into your browser to test the frontend upload flow."
);
