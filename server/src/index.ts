import app from "./app";
import env from "./helpers/env";

const port = env.PORT;

app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
