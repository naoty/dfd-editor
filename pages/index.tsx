import React from "react";

const Index: React.FC = () => (
  <main className="grid grid-cols-3">
    <div className="col-span-1 h-screen border-r">
      <h1 className="text-2xl">Nodes</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border">ID</th>
            <th className="border">Type</th>
            <th className="border">Name</th>
            <th className="border">Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border">e_user</td>
            <td className="border">External entity</td>
            <td className="border">User</td>
            <td className="border"></td>
          </tr>
          <tr>
            <td className="border">p_api_sign_up</td>
            <td className="border">Process</td>
            <td className="border">API</td>
            <td className="border">/sign_up</td>
          </tr>
          <tr>
            <td className="border">d_mysql_users</td>
            <td className="border">Data store</td>
            <td className="border">MySQL</td>
            <td className="border">users</td>
          </tr>
        </tbody>
      </table>

      <h1 className="text-2xl">Edges</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border">From</th>
            <th className="border">To</th>
            <th className="border">Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border">e_user</td>
            <td className="border">p_api_sign_up</td>
            <td className="border">user params</td>
          </tr>
          <tr>
            <td className="border">p_api_sign_up</td>
            <td className="border">d_mysql_users</td>
            <td className="border">user</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="col-span-2 h-screen">
      <h1 className="text-4xl">Here is right</h1>
    </div>
  </main>
);

export default Index;
