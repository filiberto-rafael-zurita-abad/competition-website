// DataTable.tsx
import React from 'react';

const DataTable = () => {
  return (
    <div className="border border-gray-300 p-2">
      <h2>Data Table</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Header 1</th>
            <th className="border border-gray-400 p-2">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 p-2">Data 1</td>
            <td className="border border-gray-400 p-2">Data 2</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2">Data 3</td>
            <td className="border border-gray-400 p-2">Data 4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
