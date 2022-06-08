import { Button, Card, Checkbox, RangeSlider } from "@shopify/polaris";
import React, { useContext, useEffect, useRef } from "react";
import InputColor from "react-input-color";
import { ModelContext } from "../Context/ModelProvider";

export default function Controls() {
  const {
    shadowModel,
    setShadowModel,
    handleChange,
    shadows,
    setShadows,
    layers,
    setLayers,
    setCurLayer,
    shadowModels,
    setShadowModels,
  } = useContext(ModelContext);

  useEffect(() => {
    console.log("shadowModel", shadowModel);
  }, [shadowModel]);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    const copyListItems = [...shadows];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setShadows(copyListItems);
  };

  return (
    <Card>
      <Card sectioned title="Box-Shadow CSS Generator">
        <RangeSlider
          label="Shift right"
          min="-50"
          max="50"
          value={shadowModel.x}
          onChange={(val) => {
            handleChange("x", val);
          }}
          output
        />
        <RangeSlider
          label="Shift down"
          min="-50"
          max="50"
          value={shadowModel.y}
          onChange={(val) => {
            handleChange("y", val);
          }}
          output
        />
        <RangeSlider
          label="Spread"
          value={shadowModel.spread}
          onChange={(val) => {
            handleChange("spread", val);
          }}
          output
        />
        <RangeSlider
          label="Blur"
          value={shadowModel.blur}
          onChange={(val) => {
            handleChange("blur", val);
          }}
          output
        />
        <RangeSlider
          label="Opacity"
          value={shadowModel.opacity}
          onChange={(val) => {
            handleChange("opacity", val);
          }}
          output
        />
        <Checkbox
          label="Inset"
          checked={shadowModel.inset}
          onChange={() => {
            handleChange("inset", !shadowModel.inset);
          }}
        ></Checkbox>
        <InputColor
          initialValue={shadowModel.color.hex || "#000"}
          onChange={(val) => {
            console.log("val", val);
            handleChange("color", val);
          }}
          placement="bottom"
        />
      </Card>
      <Card sectioned>
        <Button
          onClick={() => {
            setLayers([...layers, { index: layers.length }]);
            setCurLayer(layers.length);
            setShadowModels([...shadowModels, shadowModel]);
            setShadows([
              ...shadows,
              `${shadowModel.inset ? "inset" : ""} ${shadowModel.x}px ${
                shadowModel.y
              }px ${shadowModel.spread}px ${shadowModel.blur}px rgba(${
                shadowModel.color.r || 0
              },${shadowModel.color.b || 0},${shadowModel.color.g || 0},${
                shadowModel.opacity / 100
              }) `,
            ]);
          }}
        >
          Add Layer
        </Button>
        <ul>
          {layers.map((layer) => (
            <li
              style={{
                backgroundColor: "#ccc",
                padding: "8px",
                cursor: "move",
              }}
              onClick={() => {
                setShadowModel(shadowModels[layer.index]);
                console.log("layer", layers);
                console.log("shadowModels", shadowModels);
                setCurLayer(layer.index);
              }}
              key={layer.index}
              id={layer.index}
              draggable
              onDragStart={(e) => dragStart(e, layer.index)}
              onDragEnter={(e) => dragEnter(e, layer.index)}
              onDragEnd={drop}
              onDragOver={(e) => e.preventDefault()}
            >
              {shadows[layer.index]}
            </li>
          ))}
        </ul>
      </Card>
    </Card>
  );
}
