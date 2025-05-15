import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useFairs, Fair } from "../Services/FairsService";

const FairsList = () => {
  const { data, isLoading, isError, error } = useFairs();

  const fairs = useMemo(() => (data ?? []) as Fair[], [data]);

  const columns: ColumnDef<Fair>[] = useMemo(() => [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "name" },
    { header: "Date", accessorKey: "date" },
    { header: "Location", accessorKey: "location" },
    { header: "Type", accessorKey: "type" },
    { header: "Objective", accessorKey: "objective" },
    { header: "Organizer", accessorKey: "organizer" },
    { header: "Details", accessorKey: "details" },
    { header: "Audience", accessorKey: "audience" },
  ], []);

  const table = useReactTable<Fair>({
    data: fairs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className="p-4">Loading fairs...</div>;
  if (isError) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Fairs</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
                    className="px-4 py-2 text-sm text-gray-700 break-words max-w-[160px] align-top"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

export default FairsList;
