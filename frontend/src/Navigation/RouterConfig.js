import { Routes, Route } from "react-router-dom";
import Form from "../Components/Form/Form";
import MainLayout from "../Layout/MainLayout";

import TableTax from "../Components/TableTax/TableTax";

const RouterConfig = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={"/"} element={<Form />} />
        <Route path={"/taxes"} element={<TableTax />} />
      </Route>
    </Routes>
  );
};

export default RouterConfig;
