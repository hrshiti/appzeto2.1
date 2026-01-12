import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Eye, Inbox } from 'lucide-react';

const AdminTable = ({
    title,
    subtitle,
    columns,
    data,
    onAdd,
    onSearch,
    customActions,
    actions = ['view', 'edit', 'delete'],
    itemsPerPage = 10
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <h1 className="text-lg font-bold text-[#012829]">{title}</h1>
                    {subtitle && <p className="text-slate-500 text-[11px] leading-tight mt-1">{subtitle}</p>}
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => onSearch && onSearch(e.target.value)}
                            className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-primary w-48 bg-white"
                        />
                    </div>

                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="bg-primary hover:bg-[#048a8d] text-white px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-primary/10"
                        >
                            <Plus size={14} />
                            Add New
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="bg-[#012829]">
                            {columns.map((col, idx) => (
                                <th key={idx} className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-200">
                                    {col.header}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-200 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {currentData.length > 0 ? (
                            currentData.map((row, rowIdx) => (
                                <tr key={rowIdx} className="hover:bg-slate-50 transition-colors group">
                                    {columns.map((col, colIdx) => (
                                        <td key={colIdx} className="px-4 py-2.5 text-xs text-slate-700 font-medium">
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </td>
                                    ))}
                                    <td className="px-4 py-2.5 text-right">
                                        {customActions ? customActions(row) : (
                                            <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {actions.includes('view') && (
                                                    <button className="p-1 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors">
                                                        <Eye size={14} />
                                                    </button>
                                                )}
                                                {actions.includes('edit') && (
                                                    <button className="p-1 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-md transition-colors">
                                                        <Edit size={14} />
                                                    </button>
                                                )}
                                                {actions.includes('delete') && (
                                                    <button className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="py-12 text-center text-slate-400">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Inbox className="w-5 h-5 text-slate-300" />
                                        <p className="text-xs font-medium">No records found</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Functional Pagination - Compact */}
            {data.length > 0 && (
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <p className="text-[10px] font-medium text-slate-500">
                        Showing <span className="text-slate-900 font-bold">{startIndex + 1}</span>-{Math.min(startIndex + itemsPerPage, data.length)} of {data.length}
                    </p>
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all border ${currentPage === 1 ? 'text-slate-300 border-slate-100' : 'text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                        >
                            Prev
                        </button>
                        <div className="flex items-center gap-1">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-bold transition-all ${currentPage === i + 1 ? 'bg-[#012829] text-white shadow-sm' : 'text-slate-400 hover:bg-slate-100'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all border ${currentPage === totalPages ? 'text-slate-300 border-slate-100' : 'text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTable;
