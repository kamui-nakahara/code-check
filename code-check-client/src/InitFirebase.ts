import { initializeApp } from "firebase/app";

const firebaseConfig=require("./token.json");

const app = initializeApp(firebaseConfig);

export default app;
