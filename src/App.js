import React from "react";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider, Card, Layout, RangeSlider } from "@shopify/polaris";
import Controls from "./components/Controls";
import Preview from "./components/Preview";
import ModelProvider from "./components/Context/ModelProvider";
import CssCode from "./components/CssCode";

export default function App() {
  return (
    <ModelProvider>
      <AppProvider
        i18n={{
          Polaris: {
            ResourceList: {
              sortingLabel: "Sort by",
              defaultItemSingular: "item",
              defaultItemPlural: "items",
              showing: "Showing {itemsCount} {resource}",
              Item: {
                viewItem: "View details for {itemName}",
              },
            },
            Common: {
              checkbox: "checkbox",
            },
          },
        }}
      >
        <Layout>
          <Layout.Section oneHalf>
            <Controls />
          </Layout.Section>

          <Layout.Section oneHalf>
            <Preview />
            <CssCode />
          </Layout.Section>
        </Layout>
      </AppProvider>
    </ModelProvider>
  );
}
