import React from "react";
import EdgesTable from "../components/EdgesTable";
import NodesTable from "../components/NodesTable";

const Index: React.FC = () => (
  <main className="grid grid-cols-3 grid-rows-2">
    <div className="col-span-1 row-span-1 border-r border-b">
      <NodesTable />
    </div>

    <div className="col-span-1 row-span-1 row-start-2 border-r">
      <EdgesTable />
    </div>

    <div className="col-span-2 row-span-2 h-screen">
      <h1 className="text-4xl">Here is right</h1>
    </div>
  </main>
);

export default Index;
