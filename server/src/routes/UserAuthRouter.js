import express from "express";
import { register, login, logout} from "../controller/UserAuthController.js";
import { authRequired } from "../middleware/UserAuth.js";



const Userrouter = express.Router();

// ------------------ Public Routes ------------------ //

Userrouter.post("/register", register);
Userrouter.post("/login", login);
 Userrouter.post("/logout", logout);

 Userrouter.get("/test", authRequired,(req,res)=>{
  res.send("User Auth Route Working Fine");
 });
// Userrouter.post("/GoogleLogin",GoogleLogin);   


// router.get(
//   '/github',
//   passport.authenticate('github', { scope: ['user:email'] })
// )

// router.get(
//   "/github/callback",

//   passport.authenticate("github", { failureRedirect: "/" }),
//   (req, res) => {
//       console.log("GitHub callback hit!");
//     res.render("profile");
//   }
// ); 

export default Userrouter;
