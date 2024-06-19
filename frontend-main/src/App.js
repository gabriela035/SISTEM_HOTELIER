import { ConfigProvider } from "antd";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import ScrollToTop from "react-scroll-to-top";

function App() {
 
  return (
    <div className="App" >
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#6d597a",
            borderRadius: 2,
            // Alias Token
            // colorBgContainer: "#f6ffed",
          },
        }}
      >
        <AppRouter />
        <ScrollToTop smooth />
      </ConfigProvider>
    </div>
  );
}

export default App;
