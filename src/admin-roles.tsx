import { ThemeProvider } from "@/components/theme-provider";
import { JSX, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import MenuHeader from "./components/menu-header"
import { SiteFooter } from "./components/footer";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type Role = {
    id?: string; // Optional ID for backend sync
    name: string;
    description: string;
    permissions: string[];
    color: string;
}

let updateTable: ((data: Role[]) => void) | null = null;

const columns: ColumnDef<Role>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
        accessorKey: "name",
        header: "Name",
        cell: ({ row, getValue }) => (
            <Input
                value={getValue() as string}
                onChange={(e) => {
                    const newValue = e.target.value;
                    // Sync with backend
                    const roleId = (row.original as Role).id;
                    const roleIndex = roles.findIndex(r => r.id === roleId);
                    if (roleIndex !== -1) {
                        roles[roleIndex].name = newValue;

                        if (updateTable) {
                            updateTable([...roles]);
                        }
                    }
                }}
            />
        )
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row, getValue }) => (
            <Input
                value={getValue() as string}
                onChange={(e) => {
                    const newValue = e.target.value;
                    // Sync with backend
                    const roleId = (row.original as Role).id;
                    const roleIndex = roles.findIndex(r => r.id === roleId);
                    if (roleIndex !== -1) {
                        roles[roleIndex].description = newValue;

                        if (updateTable) {
                            updateTable([...roles]);
                        }
                    }
                }}
            />
        )
    },
    {
        accessorKey: "permissions",
        header: "Permissions",
        cell: ({ row, getValue }) => (
            <Input
                value={getValue() as string}
                onChange={(e) => {
                    const newValue = e.target.value;
                    // Sync with backend
                    const roleId = (row.original as Role).id;
                    const roleIndex = roles.findIndex(r => r.id === roleId);
                    if (roleIndex !== -1) {
                        roles[roleIndex].permissions = newValue.split(",").map(p => p.trim());
                        if (updateTable) {
                            updateTable([...roles]);
                        }
                    }
                }}
            />
        )
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row, getValue }) => {
            let value = getValue() as string;
            if (typeof value !== "string") {
                return <div className="text-red-500">Invalid color</div>;
            }
            return (
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => {
                            const newColor = e.target.value;
                            const roleId = (row.original as Role).id;

                            // Create a new array instead of modifying the existing one
                            const updatedRoles = roles.map(role => {
                                if (role.id === roleId) {
                                    return { ...role, color: newColor };
                                }
                                return role;
                            });

                            // Update the roles reference
                            roles = updatedRoles;

                            if (updateTable) {
                                updateTable(updatedRoles);
                            }
                        }} className="h-8 w-10 cursor-pointer"
                    />

                </div>
            );
        },
    }
]


let roles: Role[] = [
    {
        id: "1",
        name: "Admin",
        description: "Full access to all features and settings.",
        permissions: ["manage_users", "view_reports", "edit_settings"],
        color: "#ff8080"  // Lighter red (approximation of rgba with 0.5 alpha)
    },
    {
        id: "2",
        name: "Editor",
        description: "Can edit content but cannot manage users or settings.",
        permissions: ["edit_content", "view_reports"],
        color: "#8080ff"  // Lighter blue (approximation of rgba with 0.5 alpha)
    },
    {
        id: "3",
        name: "Viewer",
        description: "Can view content but cannot edit or manage anything.",
        permissions: ["view_content"],
        color: "#80ff80"  // Lighter green (approximation of rgba with 0.5 alpha)
    }
];

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [rows, setRows] = useState(data);
    const table = useReactTable({
        data: rows,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    updateTable = (data: Role[]) => {
        setRows(data as unknown as TData[]);
    };
    return (
        <>
            <div className="rounded-md border overflow-y-scroll h-[50vh]">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="p-4 flex items-center justify-between w-[300px]">
                <Button onClick={
                    () => {
                        const newRole: Role = {
                            id: String(roles.length + 1), // Simple ID generation
                            name: "New Role",
                            description: "Description of the new role",
                            permissions: [],
                            color: "#ffffff"
                        };
                        roles.push(newRole);
                        setRows([...roles] as unknown as TData[]);
                    }
                }>Add Role</Button>
            </div>
            <div className="p-4 flex items-center justify-between w-[300px]">
                <Button variant="destructive" onClick={() => {
                    table.getSelectedRowModel().rows.forEach((row) => {
                        const rowData = (row.original as unknown as Role);
                        if (typeof rowData === "object") {
                            roles = roles.filter((r) => r.id !== rowData.id);
                        }
                    });
                    setRows([...roles] as unknown as TData[]);
                }}>Delete Selected Roles</Button>
            </div>
            <div className="p-4 flex items-center justify-between w-[300px]">
                <Button className="bg-green-500 hover:bg-green-600" onClick={() => {
                    // Here you would typically send the updated roles to your backend
                    console.log("Updated roles:", roles);
                }}>Save Changes</Button>
            </div>
        </>
    )
}


function RoleManagementPage(): JSX.Element {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={true} />
                <DataTable columns={columns} data={roles} />
                <SiteFooter autoHide={-1} />
            </div>
        </ThemeProvider>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <RoleManagementPage />
        </StrictMode>
    );
} else {
    console.error("Root element not found");
}

// If on desktop, disable scrolling
function checkDesktop() {
    if (window.innerWidth > 640) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}
window.onresize = checkDesktop;
checkDesktop();
