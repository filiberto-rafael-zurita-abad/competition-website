// AINewsReporter.tsx
import React from 'react';
import ChatWindow from './ChatWindow';
import DataTable from './DataTable';

const AINewsReporter = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Left Column: Chat Window */}
        <ChatWindow />

        {/* Right Column: Data Table */}
        <DataTable />
      </div>
    </div>
  );
};

export default AINewsReporter;
