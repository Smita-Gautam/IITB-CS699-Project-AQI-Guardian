import { CityProvider } from "./context/CityProvider";
import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      {/* <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:id" element={<JobPage />} loader={jobLoader} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <CityProvider>
      <RouterProvider router={router} />
    </CityProvider>
  );
};

export default App;
