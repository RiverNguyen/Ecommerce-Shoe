import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowUpDown,
    ListOrderedIcon,
    MoreHorizontal,
    Trash2,
} from "lucide-react";

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
import ChangeMoney from "@/common/hooks/changeMoney";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

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
            const totalQuantity = row.original.items.reduce(
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
            <div className="lowercase ms-5">
                <ChangeMoney money={row?.original?.totalPrice} />
            </div>
        ),
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;
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
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <Link to={`/order/${id}`}>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(payment.id)
                                }
                            >
                                <ListOrderedIcon className="mr-2 h-4 w-4" /> Chi
                                tiết hoá đơn
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => mutate("đã huỷ")}>
                            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                            Huỷ đơn hàng
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
