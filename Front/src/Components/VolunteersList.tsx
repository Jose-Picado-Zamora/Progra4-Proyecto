import { getCoreRowModel, useReactTable, flexRender, ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useVolunteers } from "../Services/VolunteersService";
import EditVolunteersButton from "./EditVolunteersButton";

const VolunteersList = () => {
  const { data, isLoading, isError, error } = useVolunteers();

  const volunteers = useMemo(() => data ?? [], [data]);

  type Volunteer = {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    rol: string;
    projectName: string;
  };

  const columns: ColumnDef<Volunteer>[] = useMemo(() => [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Phone', accessorKey: 'phone' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Address', accessorKey: 'address' },
    { header: 'Role', accessorKey: 'rol' },
    { header: 'Project Name', accessorKey: 'projectName' },
    {
      header: 'Actions',
      cell: ({ row }) => <EditVolunteersButton volunteer={row.original} />
    }
  ], []);

  const table = useReactTable<Volunteer>({
    data: volunteers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="p-4">Loading volunteers...</div>;
  }
  if (isError) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Volunteers</h1>
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
};

export default VolunteersList;