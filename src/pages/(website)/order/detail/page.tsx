"use client";

import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import DataTable from "./DataTable";
import FooterTable from "./FooterTable";
import HeaderTable from "./HeaderTable";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

export function OrderDetail() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const { id } = useParams();
    const { data } = useQuery({
        queryKey: ["ORDERS"],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://test-be-phi.vercel.app/api/v1/orders/detail/${id}`
            );
            return data;
        },
    });
    const table = useReactTable({
        data: data ?? [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="container">
            <div className="flex items-center py-4">
                <HeaderTable table={table} />
            </div>
            <DataTable table={table} />
            <FooterTable table={table} />
        </div>
    );
}
