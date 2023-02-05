import express from "express";
import { adaptRoute } from "./main/adapters/express-route-adapter";
import { makeCheckCustomerElegibilityController } from "./main/factory/check-customer-elegibility-controller-factory";

export const routes = express.Router();

routes.post(
  "/check-customer-elegibility",
  adaptRoute(makeCheckCustomerElegibilityController())
);
