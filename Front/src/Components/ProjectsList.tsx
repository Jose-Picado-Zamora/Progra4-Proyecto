import { getCoreRowModel, useReactTable, flexRender, ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useProjects } from "../Services/ProjectsService";
import EditProjectButton from "./EditProjectsButton";


const ProjectsList = () => {

    const { data, isLoading, isError, error } = useProjects();


    //se memoriza la informacion  
    const projects = useMemo(() => data ?? [], [data]);

    type Project = {
        id: number;
        name: string;
        email: string;
        location: string;
        application: string;
    };

    const columns: ColumnDef<Project>[] = useMemo(() => [
        { header: 'ID', accessorKey: 'id' },
        { header: 'Name', accessorKey: 'name' },
        { header: 'Email', accessorKey: 'email' },
        { header: 'Location', accessorKey: 'location', },
        { header: 'Application', accessorKey: 'application', },

        {
            header: 'Actions',
            cell: ({ row }) => <EditProjectButton project={row.original} />
        }
    ], []);

    const table = useReactTable<Project>({
        data: projects,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });


    if (isLoading) {

        return <div className="p-4"> Loading projects... </div>;
    }
    if (isError) {

        return <div className="p-4 text-red-500"> Error: {error.message} </div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Projects</h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
export default ProjectsList;

















