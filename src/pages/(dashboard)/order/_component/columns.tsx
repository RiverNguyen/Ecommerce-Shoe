/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowUpDown,
    BadgeCheckIcon,
    HourglassIcon,
    MoreHorizontal,
    Package2,
    Trash2,
    Truck,
} from "lucide-react";

import ChangeMoney from "@/common/hooks/changeMoney";
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
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => (
            <div className="capitalize">{row?.original?.status}</div>
        ),
    },
    {
        accessorKey: "orderNumber",
        header: "Mã đơn hàng",
        cell: ({ row }) => (
            <Link to={`/admin/orders/${row?.original?._id}`}>
                <div className="capitalize">{row?.original?.orderNumber}</div>
            </Link>
        ),
    },
    {
        accessorKey: "name",
        header: "Tên người mua",
        cell: ({ row }) => (
            <div className="capitalize">
                {row?.original?.customerInfo?.customerName}
            </div>
        ),
    },
    {
        accessorKey: "items",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Số sản phẩm
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const totalQuantity = row?.original?.items?.reduce(
                (total: number, item: any) => total + item.quantity,
                0
            );

            return <div className="lowercase ms-10">{totalQuantity}</div>;
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
            <div className="lowercase text-red-400 ms-5">
                <>
                    <ChangeMoney money={row?.original?.totalPrice} />
                </>
            </div>
        ),
    },
    {
        accessorKey: "createdAt",

        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Thời gian đặt
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row?.original?.createdAt);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();

            return (
                <div className="lowercase ms-5">{`${day}/${month}/${year}, ${hours}:${minutes}`}</div>
            );
        },
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const queryClient = useQueryClient();
            const id = row.original._id;
            const { mutate } = useMutation({
                mutationFn: async (status: string) => {
                    await axios.put(
                        `https://test-be-phi.vercel.app/api/v1/orders/update-status/${id}`,
                        { status: status }
                    );
                },
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["ORDERS"],
                    });
                    toast({
                        title: "Thành công",
                        description: "Cập nhật trạng thái thành công",
                        variant: "success",
                    });
                },
                onError: (error: any) => {
                    toast({
                        title: "Lỗi",
                        description: error.response.data.error,
                        variant: "destructive",
                    });
                },
            });
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                            Cập nhật trạng thái
                        </DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => mutate("đang xử lý")}>
                            <HourglassIcon className="mr-2 h-4 w-4 text-gray-500" />
                            Đang xử lý
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => mutate("đã xác nhận")}>
                            <BadgeCheckIcon className="mr-2 h-4 w-4 text-green-500" />
                            Đã xác nhận
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => mutate("đang vận chuyển")}
                        >
                            <Truck className="mr-2 h-4 w-4" />
                            Đang vận chuyển
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => mutate("đã giao")}>
                            <Package2 className="mr-2 h-4 w-4 text-sky-500" />
                            Đã giao
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => mutate("đã huỷ")}>
                            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                            Đã huỷ
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
