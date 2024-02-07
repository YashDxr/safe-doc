import Footer from "./components/Footer";
import Header from "./components/Header";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* <div className="flex-1 overflow-hidden"> */}
        <AllRoutes />
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default App;
