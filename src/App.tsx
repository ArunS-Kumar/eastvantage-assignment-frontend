import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserCreate from "./components/UserCreate";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="container py-3">
        <header>
          <Header />
        </header>
        <main>
          <Router>
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/create" element={<UserCreate />} />
            </Routes>
          </Router>
        </main>
      </div>
    </>
  );
}

export default App;
