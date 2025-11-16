import { createContext, useContext, useState } from "react";

enum MyThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

type MyThemeContextProps = {
  theme: MyThemeMode;
  onToggleTheme: () => void;
};

type BackgroundContextMode = {
  color: string;
  onChange: () => void;
};

const listColor = ["red", "white", "black", "green", "gray", "pink"];

const MyThemeContext = createContext<MyThemeContextProps | null>(null);

const MyBackgroundContext = createContext<BackgroundContextMode | null>(null);

const MyUseContext = (params: any) => {
  const [themeContext, setTheme] = useState<MyThemeMode>(MyThemeMode.LIGHT);
  const [background, setBackground] = useState<string>(listColor[0]);

  const _handleChangeTheme = () => {
    setTheme((prev) =>
      prev === MyThemeMode.LIGHT ? MyThemeMode.DARK : MyThemeMode.LIGHT
    );
  };
  const _handleChangeBackground = () => {
    console.log(Number.parseInt((Math.random() * listColor.length).toString()));
    setBackground((prev) => {
      return listColor[
        listColor.length %
          Number.parseInt((Math.random() * listColor.length).toString())
      ];
    });
  };

  return (
    <>
      <MyBackgroundContext.Provider
        value={{
          color: background,
          onChange: _handleChangeBackground,
        }}
      >
        <MyThemeContext.Provider
          value={{
            theme: themeContext,
            onToggleTheme: _handleChangeTheme,
          }}
        >
          <MyDemoThemeComponent />
        </MyThemeContext.Provider>
      </MyBackgroundContext.Provider>
    </>
  );
};

const MyDemoThemeComponent = (params: any) => {
  const ctx = useContext(MyThemeContext);
  const bg = useContext(MyBackgroundContext);
  if (!ctx || !bg) return null; // tránh null khi context chưa có Provider

  const { theme, onToggleTheme } = ctx;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor:
          theme === MyThemeMode.LIGHT
            ? "white"
            : theme === MyThemeMode.DARK
            ? "black"
            : "red",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div>
        <button onClick={onToggleTheme}> Change Theme Mode </button>
        <div
          style={{
            width: "400px",
            height: "400px",
            backgroundColor: bg?.color,
          }}
          onClick={bg?.onChange}
        ></div>
      </div>
    </div>
  );
};

export default MyUseContext;
