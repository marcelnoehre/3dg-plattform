import { AppColor } from "../enums/app-color.enum";
import { AppIcon } from "../enums/app-icon.enum";
import { AppItem } from "../enums/app-item.enum";
import { AppRoute } from "../enums/app-route.enum";
import { Permission } from "../enums/permission.enum";

export interface App {
	item: AppItem;
	icon: AppIcon;
	route: AppRoute;
	color: AppColor;
	permission: Permission;
}