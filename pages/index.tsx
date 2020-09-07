import React, { useReducer } from "react";
import dynamic from "next/dynamic";
import { Tabs, TabList, Tab, TabPanel, resetIdCounter } from "react-tabs";
import { initialState, reducer } from "../lib/reducer";
import EdgesTable from "../components/EdgesTable";
import NodesTable from "../components/NodesTable";
import Editor from "../components/Editor";

const Diagram = dynamic(() => import("../components/Diagram"), { ssr: false });

const Index: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  resetIdCounter();

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
            <Tab>Diagram</Tab>
            <Tab>Editor</Tab>
          </TabList>

          <TabPanel>
            <Diagram text={state.text} />
            <div id="diagram-container"></div>
          </TabPanel>

          <TabPanel>
            <Editor text={state.text} />
          </TabPanel>
        </Tabs>
      </div>
    </main>
  );
};

export default Index;
