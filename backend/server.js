import { createServerApp } from "./config/server.js";

const { server } = createServerApp();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`📜 The Alchemist's Courier backend server running cleanly on port ${PORT}`);
});
