import { Button } from "@/components/ui/button";

const FooterTable = ({ table }: any) => {
    return (
        <div>
            <div className="flex-1 text-sm text-muted-foreground ms-1 my-3">
                {table.getFilteredSelectedRowModel().rows.length} của{" "}
                {table.getFilteredRowModel().rows.length} hàng đang được chọn.
            </div>
            <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Trước
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Tiếp theo
                </Button>
            </div>
        </div>
    );
};

export default FooterTable;
