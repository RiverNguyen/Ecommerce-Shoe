import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, BarcodeIcon, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import ProductQuery from "@/common/hooks/ProductQuery";
import ChangeMoney from "@/common/hooks/changeMoney";

export const columns: ColumnDef<any>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "image",
        header: "Ảnh",
        cell: ({ row }) => (
            <Link to={`/detail/${row.original.productId}`}>
                <img
                    width={100}
                    height={100}
                    src={row.getValue("image")}
                    alt="product"
                    className="rounded-md"
                />
            </Link>
        ),
    },
    {
        accessorKey: "name",
        header: "Tên sản phẩm",
        cell: ({ row }) => (
            <>
                <Link to={`/detail/${row.original.productId}`}>
                    <div className="capitalize">{row?.original?.name}</div>
                </Link>
            </>
        ),
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Số lượng
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="lowercase ms-10">{row?.original?.quantity}</div>
            );
        },
    },
    {
        accessorKey: "totalPrice",

        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Tổng giá
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase ms-5">
                <ChangeMoney
                    money={row?.original?.quantity * row?.original?.price}
                />
            </div>
        ),
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;
            const id = row.original.productId;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <Link to={`/detail/${id}`}>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(payment.id)
                                }
                            >
                                <BarcodeIcon className="mr-2 h-4 w-4" /> Chi
                                tiết sản phẩm
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
