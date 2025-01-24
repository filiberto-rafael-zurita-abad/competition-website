"use client";
// DataTable.tsx
import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

const DataTable = () => {
  const [activeTable, setActiveTable] = useState('log');
  const [columnWidths, setColumnWidths] = useState({
    col1: 150,
    col2: 150,
  });

  const handleTableSwitch = (table: string) => {
    setActiveTable(table);
  };

  const handleResize = (event: any, { size }: { size: { width: number, height: number } }, col: string) => {
    setColumnWidths({ ...columnWidths, [col]: size.width });
  };

  const logTable = (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="bg-gray-100 p-2 rounded-t" colSpan={2}>Log</th>
        </tr>
        <tr>
          <Resizable width={columnWidths.col1} height={0} onResize={(e, data) => handleResize(e, data, 'col1')}>
            <th className="bg-gray-50 p-2" style={{ width: columnWidths.col1 + 'px' }}>id</th>
          </Resizable>
          <Resizable width={columnWidths.col2} height={0} onResize={(e, data) => handleResize(e, data, 'col2')}>
            <th className="bg-gray-50 p-2" style={{ width: columnWidths.col2 + 'px' }}>Initial Message</th>
          </Resizable>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 bg-white">Log Data 1</td>
          <td className="p-2 bg-white">Log Data 2</td>
        </tr>
        <tr>
          <td className="p-2 bg-white">Log Data 3</td>
          <td className="p-2 bg-white">Log Data 4</td>
        </tr>
      </tbody>
    </table>
  );

  const apiTable = (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="bg-gray-100 p-2 rounded-t" colSpan={2}>API</th>
        </tr>
        <tr>
          <th className="bg-gray-50 p-2">Header A</th>
          <th className="bg-gray-50 p-2">Header B</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 bg-white">API Data A</td>
          <td className="p-2 bg-white">API Data B</td>
        </tr>
        <tr>
          <td className="p-2 bg-white">API Data C</td>
          <td className="p-2 bg-white">API Data D</td>
        </tr>
      </tbody>
    </table>
  );

    const actionsTable = (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="bg-gray-100 p-2 rounded-t" colSpan={2}>Actions</th>
        </tr>
        <tr>
          <th className="bg-gray-50 p-2">Action 1</th>
          <th className="bg-gray-50 p-2">Action 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 bg-white">Action Data 1</td>
          <td className="p-2 bg-white">Action Data 2</td>
        </tr>
        <tr>
          <td className="p-2 bg-white">Action Data 3</td>
          <td className="p-2 bg-white">Action Data 4</td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className="border border-gray-300 p-4 rounded-lg w-full max-w-2xl h-[80vh] flex flex-col">
      <div className="flex justify-start gap-2 mb-4">
        <button 
          className={`px-4 py-2 rounded ${
            activeTable === 'log' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`} 
          onClick={() => handleTableSwitch('log')}
        >
          Log
        </button>
        <button 
          className={`px-4 py-2 rounded ${
            activeTable === 'api' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`} 
          onClick={() => handleTableSwitch('api')}
        >
          API
        </button>
        <button 
          className={`px-4 py-2 rounded ${
            activeTable === 'actions' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`} 
          onClick={() => handleTableSwitch('actions')}
        >
          Actions
        </button>
      </div>
      {activeTable === 'log' ? logTable : activeTable === 'api' ? apiTable : actionsTable}
    </div>
  );
};

export default DataTable;
