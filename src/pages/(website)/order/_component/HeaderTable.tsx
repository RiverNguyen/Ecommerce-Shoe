import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const HeaderTable = ({ table }: any) => {
    return (
        <div className="flex items-center py-4">
            <Input
                placeholder="Tìm kiếm theo trạng thái..."
                value={
                    (table.getColumn("status")?.getFilterValue() as string) ??
                    ""
                }
                onChange={(event) =>
                    table
                        .getColumn("status")
                        ?.setFilterValue(event.target.value)
                }
                className="max-w-sm me-3"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Chọn <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter((column: any) => column.getCanHide())
                        .map((column: any) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default HeaderTable;
