import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowUpDown,
    BadgePlus,
    Edit2,
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
        accessorKey: "value",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Tên thuộc tính
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="font-semibold ms-5">{row.getValue("value")}</div>
        ),
    },
    {
        accessorKey: "values",
        header: "Chi tiết",
        cell: ({ row }) => {
            const values: any[] = row.getValue("values");

            return (
                <div>
                    {values.map((a: any) => {
                        return (
                            <span
                                key={a._id}
                                className={
                                    "first:ms-0 ms-3 rounded-full border border-gray-300 px-2 py-1 text-sm font-semibold bg-" +
                                    a.value +
                                    ""
                                }
                            >
                                {a.value}
                            </span>
                        );
                    })}
                </div>
            );
        },
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const attribute = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <Link to={`/admin/attributes/${attribute._id}/values`}>
                            <DropdownMenuItem>
                                <BadgePlus className="mr-2 h-4 w-4 text-green-500" />
                                Thêm giá trị
                            </DropdownMenuItem>
                        </Link>
                        <Link to={`/admin/products/edit/${attribute._id}`}>
                            <DropdownMenuItem>
                                <Edit2 className="mr-2 h-4 w-4 text-blue-500" />
                                Cập nhật thuộc tính
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                            Xoá thuộc tính
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
