import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/home/Home.tsx";
import Single from "./components/single/Single.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<App/>}>
                  <Route path={"/"} element={<Home/>}/>
                  <Route path={"/:id"} element={<Single/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
