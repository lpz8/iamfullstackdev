import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home.jsx";
import ItemDetailPage from "./ItemDetailPage.jsx";
import InputCreate from "./components/InputCreate.jsx";
import { API_URL } from "./api";
import "./App.css";

const App = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const resData = await response.json();
      setData(Array.isArray(resData) ? resData : []);
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <Router>3+
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/create">Crear</Link>
        </nav>
      </div>

      {data === null ? (
        <div className="card">Cargando…</div>
      ) : (
        <Routes>
          <Route path="/" element={<Home data={data} onDeleted={fetchData} />} />
          <Route path="/create" element={<InputCreate onCreated={fetchData} />} />
          {data.map((item) => (
            <Route
              key={item.id || item._id}
              path={`/${item.id || item._id}`}
              element={<ItemDetailPage item={item} />}
            />
          ))}
        </Routes>
      )}
    </Router>
  );
};

export default App;