const {Router}=require("express");
const authController=require("../controller/authController");
const {requireAuth}=require("../middleware/authMiddleware")

const router=Router();
router.get('/',authController.welcome);
router.post("/signup",authController.signup);
router.post("/login",authController.newLogin);
router.post("/forgot-password",authController.forgotPassword);
// router.get("/reset-password/:id/:token",authController.resetPassword);
router.post("/reset-password",authController.resetPassword);
router.put("/update-user",requireAuth,authController.updateUser)
router.delete("/delete",authController.delete);
router.post("/create",authController.createUser);

module.exports=router;
