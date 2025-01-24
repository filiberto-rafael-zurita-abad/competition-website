"use client";
// DataTable.tsx
import React, { useState } from 'react';

const DataTable = () => {
  const [activeTable, setActiveTable] = useState('log');

  const handleTableSwitch = (table: string) => {
    setActiveTable(table);
  };

  const logTable = (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border border-gray-400 p-2" colSpan={2}>Log</th>
        </tr>
        <tr>
          <th className="border border-gray-400 p-2">Header 1</th>
          <th className="border border-gray-400 p-2">Header 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-400 p-2">Log Data 1</td>
          <td className="border border-gray-400 p-2">Log Data 2</td>
        </tr>
        <tr>
          <td className="border border-gray-400 p-2">Log Data 3</td>
          <td className="border border-gray-400 p-2">Log Data 4</td>
        </tr>
      </tbody>
    </table>
  );

  const apiTable = (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border border-gray-400 p-2" colSpan={2}>API</th>
        </tr>
        <tr>
          <th className="border border-gray-400 p-2">Header A</th>
          <th className="border border-gray-400 p-2">Header B</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-400 p-2">API Data A</td>
          <td className="border border-gray-400 p-2">API Data B</td>
        </tr>
        <tr>
          <td className="border border-gray-400 p-2">API Data C</td>
          <td className="border border-gray-400 p-2">API Data D</td>
        </tr>
      </tbody>
    </table>
  );

    const actionsTable = (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border border-gray-400 p-2" colSpan={2}>Actions</th>
        </tr>
        <tr>
          <th className="border border-gray-400 p-2">Action 1</th>
          <th className="border border-gray-400 p-2">Action 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-400 p-2">Action Data 1</td>
          <td className="border border-gray-400 p-2">Action Data 2</td>
        </tr>
        <tr>
          <td className="border border-gray-400 p-2">Action Data 3</td>
          <td className="border border-gray-400 p-2">Action Data 4</td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className="border border-gray-300 p-2 w-full">
      <div className="flex justify-start space-x-2 mb-2 border-b border-gray-300">
        <button className={`p-1 rounded-md  border-b-2 border-transparent hover:border-gray-400 focus:outline-none ${activeTable === 'log' ? 'bg-white border-gray-400 border-b-2' : 'bg-gray-100'}`} onClick={() => handleTableSwitch('log')}>Log</button>
        <button className={`p-1 rounded-md  border-b-2 border-transparent hover:border-gray-400 focus:outline-none ${activeTable === 'api' ? 'bg-white border-gray-400 border-b-2' : 'bg-gray-100'}`} onClick={() => handleTableSwitch('api')}>API</button>
        <button className={`p-1 rounded-md  border-b-2 border-transparent hover:border-gray-400 focus:outline-none ${activeTable === 'actions' ? 'bg-white border-gray-400 border-b-2' : 'bg-gray-100'}`} onClick={() => handleTableSwitch('actions')}>Actions</button>
      </div>
      {activeTable === 'log' ? logTable : activeTable === 'api' ? apiTable : actionsTable}
    </div>
  );
};

export default DataTable;
