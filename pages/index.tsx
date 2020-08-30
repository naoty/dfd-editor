import React, { useState } from "react";

type Node = {
  id: string;
  type: NodeType;
  name: string;
  location: string | null;
};

enum NodeType {
  ExternalEntity = "ExternalEntity",
  Process = "Process",
  Datastore = "Datastore",
}

type Edge = {
  from: string;
  to: string;
  data: string;
};

const Index: React.FC = () => {
  const [nodes] = useState<Node[]>([
    {
      id: "e_user",
      type: NodeType.ExternalEntity,
      name: "User",
      location: null,
    },
    {
      id: "p_api_sign_up",
      type: NodeType.Process,
      name: "API",
      location: "/sign_up",
    },
    {
      id: "d_mysql_users",
      type: NodeType.Datastore,
      name: "MySQL",
      location: "users",
    },
  ]);

  const [edges] = useState<Edge[]>([
    { from: "e_user", to: "p_api_sign_up", data: "user params" },
    { from: "p_api_sign_up", to: "d_mysql_users", data: "user" },
  ]);

  return (
    <main className="grid grid-cols-3 grid-rows-2">
      <div className="col-span-1 row-span-1 border-r">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border">ID</th>
                <th className="border">Type</th>
                <th className="border">Name</th>
                <th className="border">Location</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map(node => (
                <tr key={node.id}>
                  <td className="border px-2">{node.id}</td>
                  <td className="border px-2">{node.type}</td>
                  <td className="border px-2">{node.name}</td>
                  <td className="border px-2">{node.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-span-1 row-span-1 row-start-2 border-r">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border">From</th>
                <th className="border">To</th>
                <th className="border">Data</th>
              </tr>
            </thead>
            <tbody>
              {edges.map(edge => (
                <tr key={`${edge.from}-${edge.to}`}>
                  <td className="border px-2">{edge.from}</td>
                  <td className="border px-2">{edge.to}</td>
                  <td className="border px-2">{edge.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-span-2 row-span-2 h-screen">
        <h1 className="text-4xl">Here is right</h1>
      </div>
    </main>
  );
};

export default Index;
