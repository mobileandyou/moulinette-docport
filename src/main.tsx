import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/home/Home.tsx";
import Logout from "./components/Logout.tsx";
import SingleLayout from "./components/single/SingleLayout.tsx";

import './i18n';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<App/>}>
                  <Route path={"/"} element={<Home/>}/>
                  <Route path={"/:id"} element={<SingleLayout/>}/>
                  <Route path={"/logout"} element={<Logout/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
