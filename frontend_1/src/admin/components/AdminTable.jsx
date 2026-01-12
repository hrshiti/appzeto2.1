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
    actions = ['view', 'edit', 'delete']
}) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
                    <p className="text-slate-500 mt-1 text-sm">{subtitle}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search records..."
                            onChange={(e) => onSearch && onSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary w-64"
                        />
                    </div>

                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="bg-primary hover:bg-[#048a8d] text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
                        >
                            <Plus size={16} />
                            Add New
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                {columns.map((col, idx) => (
                                    <th key={idx} className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        {col.header}
                                    </th>
                                ))}
                                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.length > 0 ? (
                                data.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="hover:bg-slate-50/80 transition-colors group">
                                        {columns.map((col, colIdx) => (
                                            <td key={colIdx} className="p-4 text-sm text-slate-700 font-medium">
                                                {col.render ? col.render(row) : row[col.accessor]}
                                            </td>
                                        ))}
                                        <td className="p-4 text-right">
                                            {customActions ? customActions(row) : (
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {actions.includes('view') && (
                                                        <button className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                                            <Eye size={16} />
                                                        </button>
                                                    )}
                                                    {actions.includes('edit') && (
                                                        <button className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                                                            <Edit size={16} />
                                                        </button>
                                                    )}
                                                    {actions.includes('delete') && (
                                                        <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length + 1} className="p-12 text-center text-slate-400">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                                                <Inbox className="w-6 h-6 text-slate-300" />
                                            </div>
                                            <p className="text-sm font-medium">No records found</p>
                                            <p className="text-xs text-slate-300 max-w-xs">
                                                Start by adding a new record using the "Add New" button above.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {data.length > 0 && (
                    <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                        <span>Showing 1 to {data.length} of {data.length} entries</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">Previous</button>
                            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">Next</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTable;
