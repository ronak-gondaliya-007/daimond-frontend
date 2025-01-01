import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import PublicRouter from "./routes/publicRouter";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Public Route  */}
        {publicRoutes.map(({ title, path, element: Element }) => (
          <Route key={title} path={path} element={<PublicRouter title={title} element={Element} />}>
          </Route>
        ))}
      </Routes>
    </Router>
  );
};

export default App;
