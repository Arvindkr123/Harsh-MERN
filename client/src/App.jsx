import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Headers from "./components/Headers";

const App = () => {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userProfile/:id" element={<Profile />} />
      </Routes>
    </>
  );
};
export default App;
