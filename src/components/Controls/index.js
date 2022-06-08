import { Button, Card, Checkbox, Icon, RangeSlider } from "@shopify/polaris";
import React, { useContext, useEffect, useRef } from "react";
import InputColor from "react-input-color";
import { ModelContext } from "../Context/ModelProvider";
import { DeleteMajor, EditMajor, SelectMinor } from "@shopify/polaris-icons";

export default function Controls() {
  const {
    shadowModel,
    setShadowModel,
    handleChange,
    shadows,
    setShadows,
    layers,
    setLayers,
    curLayer,
    setCurLayer,
    shadowModels,
    setShadowModels,
  } = useContext(ModelContext);

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
    const copyListShadows = [...shadows];
    const dragItemContent = copyListShadows[dragItem.current];
    copyListShadows.splice(
      dragItem.current,
      1,
      copyListShadows[dragOverItem.current]
    );
    copyListShadows.splice(dragOverItem.current, 1, dragItemContent);

    const copyListShadowModels = [...shadowModels];
    const dragItemModel = copyListShadowModels[dragItem.current];
    copyListShadowModels.splice(
      dragItem.current,
      1,
      copyListShadowModels[dragOverItem.current]
    );
    copyListShadowModels.splice(dragOverItem.current, 1, dragItemModel);
    dragItem.current = null;
    dragOverItem.current = null;
    setShadows(copyListShadows);
    setShadowModels(copyListShadowModels);
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
            setLayers([...layers, layers.length]);
            // setCurLayer(layers.length);
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
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {layers.map((layer) => (
            <li
              style={
                curLayer === layer
                  ? {
                      position: "relative",
                      backgroundColor: "#5c6ac4",
                      padding: "10px 10px 10px 30px",
                      cursor: "move",
                    }
                  : {
                      position: "relative",
                      padding: "10px 10px 10px 30px",
                      cursor: "move",
                    }
              }
              onClick={() => {
                setShadowModel(shadowModels[layer]);

                console.log("shadowModels", shadowModels);
                setCurLayer(layer);
              }}
              key={layer}
              id={layer}
              draggable
              onDragStart={(e) => dragStart(e, layer)}
              onDragEnter={(e) => dragEnter(e, layer)}
              onDragEnd={drop}
              onDragOver={(e) => e.preventDefault()}
            >
              <span style={{ position: "absolute", left: 5, top: 10 }}>
                <Icon source={SelectMinor} color="base" />
              </span>
              {shadows[layer]}
              <span style={{ position: "absolute", right: 30, top: 10 }}>
                <Icon source={EditMajor} color="base" />
              </span>
              <span
                key={layer}
                style={{ position: "absolute", right: 5, top: 10 }}
                onClick={(e) => {
                  if (layers.length === 1) {
                    return;
                  } else {
                    shadows.splice(layer, 1);
                    shadowModels.splice(layer, 1);

                    e.stopPropagation();
                    if (layer === layers.length - 1) {
                      console.log(
                        "shadowModels[layer - 1]",
                        shadowModels[layer - 1]
                      );
                      setCurLayer(layer - 1);
                      setShadowModel(shadowModels[layer - 1]);
                      setShadows(shadows);
                      console.log("shadows", shadows);
                      layers.splice(layers.length - 1, 1);
                      setLayers(layers);
                    } else {
                      layers.splice(layers.length - 1, 1);

                      setLayers(layers);
                      setCurLayer(layer);
                      setShadowModel(shadowModels[layer]);
                      setShadows(shadows);
                    }
                  }

                  // shadows.splice(layer, 1);
                  // shadowModels.splice(layer, 1);
                  // layers.splice(layers.length - 1, 1);
                  // console.log("layer", layer);

                  // console.log("first", shadowModels[layer - 1]);
                  // console.log("shadows", shadows);
                  // setShadowModels(shadowModels);
                  //
                }}
              >
                <Icon source={DeleteMajor} color="base" />
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </Card>
  );
}
