import { Card } from "@shopify/polaris";
import React, { useContext, useState } from "react";
import InputColor from "react-input-color";
import { ModelContext } from "../Context/ModelProvider";

export default function Preview() {
  const { handleChange, shadow } = useContext(ModelContext);
  const [color, setColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  return (
    <Card>
      <Card sectioned title="Preview">
        <InputColor
          initialValue="#5e72e4"
          onChange={(val) => {
            setColor(val.hex);
          }}
          placement="top"
        />
        <InputColor
          initialValue="#ffff"
          onChange={(val) => {
            setBackgroundColor(val.hex);
          }}
          placement="top"
        />
        <div style={{ height: 250, backgroundColor: backgroundColor }}>
          <div
            style={{
              height: 200,
              width: 200,
              backgroundColor: color,
              boxShadow: shadow,
              marginTop: "30px",
              marginLeft: "20px",
            }}
          ></div>
        </div>
      </Card>
    </Card>
  );
}
