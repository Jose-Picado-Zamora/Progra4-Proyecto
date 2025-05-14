import { getCoreRowModel, useReactTable, flexRender, ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useEntrepreneurs, Entrepreneur } from "../Services/Entrepreneurs";

const EntrepreneursList = () =>{
    const { data, isLoading, isError, error } = useEntrepreneurs();

  const entrepreneurs = useMemo(() => data ?? [], [data]);

  const columns: ColumnDef<Entrepreneur>[] = useMemo(() => [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Business Name', accessorKey: 'businessName' },
    { header: 'Phone', accessorKey: 'phone' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Feria Name', accessorKey: 'feriaName' },
    { header: 'Stand Number', accessorKey: 'standNumber' },
    { header: 'Products Description', accessorKey: 'productsDescription' },
  ], []);

   const table = useReactTable<Entrepreneur>({
    data: entrepreneurs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

    if (isLoading) return <div className="p-4">Loading entrepreneurs...</div>;
    if (isError) return <div className="p-4 text-red-500">Error: {error.message}</div>;

 return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Entrepreneurs</h1>
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
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
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

}

export default EntrepreneursList;