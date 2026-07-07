import app, { PORT } from "./server.js";

app.listen(PORT, () => {
  console.log(`Smart Bharat backend running on port ${PORT}`);
});