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
          <th className="border border-gray-400 p-2" colSpan={2}>Log</th>
        </tr>
        <tr>
          <Resizable width={columnWidths.col1} height={0} onResize={(e, data) => handleResize(e, data, 'col1')}>
            <th className="border border-gray-400 p-2" style={{ width: columnWidths.col1 + 'px' }}>id</th>
          </Resizable>
          <Resizable width={columnWidths.col2} height={0} onResize={(e, data) => handleResize(e, data, 'col2')}>
            <th className="border border-gray-400 p-2" style={{ width: columnWidths.col2 + 'px' }}>Initial Message</th>
          </Resizable>
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
    <div className="border border-gray-300 p-2 w-full h-[400px] overflow-y-auto">
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
