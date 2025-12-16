import express from "express";
import { register, login, logout, checkauth} from "../controller/user.controller.js";
import { protect } from "../middleware/middleware.js";



const router = express.Router();

// ------------------ Public Routes ------------------ //

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get('/checkAuth',protect,checkauth);


// Router.post("/GoogleLogin",GoogleLogin);   
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

export default router;
