import { Card } from "@shopify/polaris";
import React, { useContext } from "react";
import { ModelContext } from "../Context/ModelProvider";

export default function CssCode() {
  const { shadow } = useContext(ModelContext);
  return (
    <Card>
      <Card sectioned title="CSS Code">
        <p>
          <label>box-shadow :</label>
          {shadow};
        </p>
      </Card>
    </Card>
  );
}
