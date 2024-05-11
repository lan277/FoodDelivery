import express from "express"
import authMiddleware from "../middleware/auth.js"
import {listOrders, placeOrder, updateStatus, userOrders, verifyOrder} from "../controllers/oderController.js"


const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userOrder",authMiddleware,userOrders);
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)
export default orderRouter;