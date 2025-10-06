import { createContext, useContext, useState } from "react";

type MyThemeContextProps = {
  theme: MyThemeMode,
  onToggleTheme: () => void;
};

enum MyThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

const MyThemeContext = createContext<MyThemeContextProps | null>(null);

const MyContextExample = (params: any) => {
  const [theme, setChangeThemeMode] = useState<MyThemeMode>(MyThemeMode.LIGHT);

  const _handleChangeTheme = () => {
    setChangeThemeMode((prev) =>
      prev === MyThemeMode.LIGHT ? MyThemeMode.DARK : MyThemeMode.LIGHT
    );
  };
  return (
    <MyThemeContext.Provider
      value={{ theme: theme, onToggleTheme: _handleChangeTheme }}
    >
      <MySmallFakeComponent />
    </MyThemeContext.Provider>
  );
};

const MySmallFakeComponent = (params: any) => {
  const ctx = useContext(MyThemeContext);
  if (!ctx) return null; // tránh null khi context chưa có Provider

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
      </div>
    </div>
  );
};

export default MyContextExample;
