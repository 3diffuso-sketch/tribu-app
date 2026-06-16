"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  searchable?: boolean;
  searchPlaceholder?: string;
  actions?: (row: any) => React.ReactNode;
}

export function DataTable({ columns, data, searchable = false, searchPlaceholder = "Buscar...", actions }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Helper to get nested value
  const getValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  // Filter data
  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    return columns.some(col => {
      const val = getValue(item, col.key);
      return String(val).toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = getValue(a, sortConfig.key);
    const bValue = getValue(b, sortConfig.key);
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {searchable && (
        <div className="relative w-full max-w-sm">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-roots-sand/50 rounded-lg text-sm focus:outline-none focus:border-roots-red/50 focus:ring-1 focus:ring-roots-red/50 transition-all"
          />
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block w-full overflow-x-auto glass-card rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-roots-cream/50 border-b border-roots-sand/50 text-sm text-foreground-muted">
              {columns.map(col => (
                <th 
                  key={col.key} 
                  className="px-4 py-3 font-semibold cursor-pointer hover:text-roots-charcoal transition-colors"
                  onClick={() => requestSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {sortConfig?.key === col.key && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="px-4 py-3 font-semibold text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, idx) => (
                <tr key={row.id || idx} className="border-b border-roots-sand/30 hover:bg-roots-cream/30 transition-colors">
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 text-sm text-roots-charcoal">
                      {col.render ? col.render(getValue(row, col.key), row) : getValue(row, col.key)}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-8 text-center text-sm text-foreground-muted">
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-3">
        {sortedData.length > 0 ? (
          sortedData.map((row, idx) => (
            <div key={row.id || idx} className="glass-card p-4 flex flex-col gap-2">
              {columns.map(col => (
                <div key={col.key} className="flex justify-between items-start gap-4">
                  <span className="text-xs font-medium text-foreground-muted">{col.label}</span>
                  <div className="text-sm text-right text-roots-charcoal font-medium">
                    {col.render ? col.render(getValue(row, col.key), row) : getValue(row, col.key)}
                  </div>
                </div>
              ))}
              {actions && (
                <div className="mt-3 pt-3 border-t border-roots-sand/30 flex justify-end gap-2">
                  {actions(row)}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="glass-card p-8 text-center text-sm text-foreground-muted">
             No se encontraron resultados
          </div>
        )}
      </div>
    </div>
  );
}
