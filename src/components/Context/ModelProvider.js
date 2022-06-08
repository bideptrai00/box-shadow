import React, { createContext, useEffect, useState } from "react";

export const ModelContext = createContext();
export default function ModelProvider({ children }) {
  const [shadowModel, setShadowModel] = useState({
    x: 0,
    y: 0,
    spread: 5,
    blur: 3,
    opacity: 20,
    inset: false,
    color: "#000",
  });
  const [shadowModels, setShadowModels] = useState([]);

  const [layers, setLayers] = useState([{ index: 0 }]);
  const [curLayer, setCurLayer] = useState(0);

  const [shadow, setShadow] = useState("");
  const [shadows, setShadows] = useState([]);

  useEffect(() => {
    const t = [...shadowModels];
    t[curLayer] = shadowModel;
    setShadowModels(t);
    console.log("shadowModels", shadowModels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shadowModel]);

  useEffect(() => {
    const t = [...shadows];
    t[curLayer] = `${shadowModel.inset ? "inset" : ""} ${shadowModel.x}px ${
      shadowModel.y
    }px ${shadowModel.spread}px ${shadowModel.blur}px rgba(${
      shadowModel.color.r || 0
    },${shadowModel.color.b || 0},${shadowModel.color.g || 0},${
      shadowModel.opacity / 100
    }) `;
    setShadows(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shadowModel]);

  useEffect(() => {
    setShadow(shadows.join(","));
  }, [shadows]);
  const handleChange = (select, value) => {
    setShadowModel({ ...shadowModel, [select]: value });
  };
  return (
    <ModelContext.Provider
      value={{
        shadowModel,
        setShadowModel,
        handleChange,
        shadow,
        setShadow,
        shadows,
        setShadows,
        layers,
        setLayers,
        setCurLayer,
        shadowModels,
        setShadowModels,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}
