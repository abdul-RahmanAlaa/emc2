import Register from "./page/Register";
import Login from "./page/LogIn";
import Home from "./page/Home";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="register" element={<Register />} />

        <Route path="login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="home" element={<Home />} />

          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
