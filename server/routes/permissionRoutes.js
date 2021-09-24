const {Router}=require("express");
const permissionContoller=require("../controller/permissionController");
const { requireAdminAccess,requireAuth } = require("../middleware/authMiddleware");

const router=Router();
router.get("/",requireAdminAccess,permissionContoller.welcome);
router.post("/",requireAdminAccess,permissionContoller.getRoles);
router.post('/single',requireAdminAccess,permissionContoller.getPermission);
router.put("/update",requireAdminAccess,permissionContoller.updatePermissions);
router.post("/add-form",requireAdminAccess,permissionContoller.addForm);
router.post("/get-forms",requireAuth,permissionContoller.getForms);
router.post("/get-form",requireAuth,permissionContoller.getForm);





module.exports=router;