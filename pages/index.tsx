import React, { useReducer, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import SplitPane from "react-split-pane";
import { Tabs, TabList, Tab, TabPanel, resetIdCounter } from "react-tabs";
import { initialState, reducer } from "../lib/reducer";
import EdgesTable from "../components/EdgesTable";
import NodesTable from "../components/NodesTable";
import Editor from "../components/Editor";

const stateKey = "index";
const Diagram = dynamic(() => import("../components/Diagram"), { ssr: false });

const Index: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState, initialState => {
    try {
      const item = window.localStorage.getItem(stateKey);
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      console.error(error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(stateKey, JSON.stringify(state));
    } catch (error) {
      console.error(error);
    }
  }, [state]);

  resetIdCounter();

  return (
    <main>
      <Head>
        <title>dfd-editor</title>
      </Head>

      <SplitPane split="vertical" defaultSize="30%">
        <div className="h-full flex flex-col border-r">
          <NodesTable
            className="flex-1 border-b"
            nodes={Object.values(state.nodes)}
            dispatch={dispatch}
          />

          <EdgesTable
            className="flex-1"
            nodes={Object.values(state.nodes)}
            edges={Object.values(state.edges)}
            dispatch={dispatch}
          />
        </div>

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
      </SplitPane>
    </main>
  );
};

export default Index;
