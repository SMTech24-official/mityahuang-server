import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import env from "../../config/clean-env";
import sendResponse from "../../lib/utils/sendResponse";
import { authRoutes } from "../modules/auth/routes/auth.routes";
import { taobaoRoutes } from "../modules/taobao/routes/taobao.routes";
import { UserRoutes } from "../modules/user/routes/user.route";
import { contactUsRoutes } from "../modules/contact-us/routes/contact-us.routes";
import { promotionLevelRouter } from "../modules/promotion-level/routes/promotion-level.routes";
import { whatsappContactRouter } from "../modules/whatsapp-contact/routes/whatsapp-contact.routes";

const routes = Router();

type TRouteModules = { path: string; routes: Router };

const routesModule: TRouteModules[] = [
  {
    path: "/users",
    routes: UserRoutes,
  },
  {
    path: "/auth",
    routes: authRoutes,
  },
  {
    path: "/taobao",
    routes: taobaoRoutes,
  },
  {
    path: "/contact-us",
    routes: contactUsRoutes,
  },
  {
    path: "/promotional-levels",
    routes: promotionLevelRouter,
  },
  {
    path: "/whatsapp-contact",
    routes: whatsappContactRouter,
  },

  // Extra but
  {
    path: "/route-lists",
    routes: routes.get("/", async (req, res) => {
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Route Lists",
        data: routesModule.map(
          (item: TRouteModules) =>
            `${env.isDev ? env.LOCAL_API_URL : env.PROD_API_URL}/api/v1/${item.path}`,
        ),
      });
    }),
  },
];

// TODO: Implement routes here
routesModule.forEach((item: TRouteModules) =>
  routes.use(item.path, item.routes),
);

export default routes;
