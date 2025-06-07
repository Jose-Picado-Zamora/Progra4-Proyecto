import { useState, useMemo } from "react";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useFairs } from "../Services/FairsService";
import EditFairModal from "./EditFairModal";

const FairsList = () => {
  const { data, isLoading, isError, error } = useFairs();
  const fairs = useMemo(() => data ?? [], [data]);

  type Fair = {
    id: number;
    name: string;
    description: string;
    location: string;
    date: string;
  };

  const [selectedFair, setSelectedFair] = useState<Fair | null>(null);

  const onEdit = (fair: Fair) => {
    setSelectedFair(fair);
  };

  const columns: ColumnDef<Fair>[] = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell: (info) => <div className="text-sm">{info.getValue()}</div>,
      },
      {
        header: "Name",
        accessorKey: "name",
        cell: (info) => (
          <div className="text-sm break-words whitespace-pre-wrap w-full">
            {info.getValue()}
          </div>
        ),
      },
      {
        header: "Description",
        accessorKey: "description",
        cell: (info) => (
          <div className="text-sm break-words whitespace-pre-wrap w-full">
            {info.getValue()}
          </div>
        ),
      },
      {
        header: "Location",
        accessorKey: "location",
        cell: (info) => (
          <div className="text-sm break-words whitespace-pre-wrap w-full">
            {info.getValue()}
          </div>
        ),
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: (info) => {
          const value = info.getValue() as string;
          const formattedDate = value?.split("T")[0];
          return <span className="text-sm">{formattedDate}</span>;
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => onEdit(row.original)}
          >
            Edit
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable<Fair>({
    data: fairs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className="p-4">Loading fairs...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Fairs</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-sm text-gray-700 align-top break-words whitespace-pre-wrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFair && (
        <EditFairModal
          fair={selectedFair}
          onClose={() => setSelectedFair(null)}
        />
      )}
    </div>
  );
};

export default FairsList;
