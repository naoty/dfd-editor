import React, { useReducer } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { initialState, reducer } from "../lib/reducer";
import EdgesTable from "../components/EdgesTable";
import NodesTable from "../components/NodesTable";
import Editor from "../components/Editor";

const Index: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="grid grid-cols-3 grid-rows-2">
      <div className="col-span-1 row-span-1 border-r border-b">
        <NodesTable nodes={Object.values(state.nodes)} dispatch={dispatch} />
      </div>

      <div className="col-span-1 row-span-1 row-start-2 border-r">
        <EdgesTable
          nodes={Object.values(state.nodes)}
          edges={Object.values(state.edges)}
          dispatch={dispatch}
        />
      </div>

      <div className="col-span-2 row-span-2 h-screen">
        <Tabs>
          <TabList>
            <Tab>Editor</Tab>
            <Tab>Graph</Tab>
          </TabList>

          <TabPanel>
            <Editor nodes={state.nodes} edges={state.edges} />
          </TabPanel>

          <TabPanel>
            <h1>Here is graph</h1>
          </TabPanel>
        </Tabs>
      </div>
    </main>
  );
};

export default Index;
