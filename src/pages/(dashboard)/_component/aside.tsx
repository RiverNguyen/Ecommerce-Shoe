import { TooltipProvider } from "@/components/ui/tooltip";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
    Home,
    LineChart,
    Package2,
    Settings,
    ShoppingCart,
    SlackIcon,
    Users2,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

const AsideAdmin = () => {
    const location = useLocation();

    const getLinkClass = (path: string) => {
        let classes =
            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8";
        if (location.pathname === path) {
            classes += " bg-accent text-accent-foreground";
        } else {
            classes += " text-muted-foreground";
        }
        return classes;
    };
    return (
        <>
            <TooltipProvider>
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link
                        to="/"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to="/admin"
                                className={getLinkClass("/admin")}
                            >
                                <Home className="h-5 w-5" />
                                <span className="sr-only">Quản lý</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Quản lý</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to="attributes"
                                className={getLinkClass("/admin/attributes")}
                            >
                                <SlackIcon className="h-5 w-5" />
                                <span className="sr-only">Thuộc tính</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Quản lý</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to="orders"
                                className={getLinkClass("/admin/orders")}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Orders</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Đơn hàng</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <NavLink
                                to="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Users2 className="h-5 w-5" />
                                <span className="sr-only">Customers</span>
                            </NavLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">Customers</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <NavLink
                                to="/admin/chart"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <LineChart className="h-5 w-5" />
                                <span className="sr-only">Analytics</span>
                            </NavLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">Analytics</TooltipContent>
                    </Tooltip>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <NavLink
                                to="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </NavLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </nav>
            </TooltipProvider>
        </>
    );
};

export default AsideAdmin;
