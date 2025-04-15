import {Route, Routes} from "react-router";
import Home from "./pages/Home/Home.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import AdminRoute from "./pages/AdminRoute/AdminRoute.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import Vacancy from "./pages/Vacancy/Vacancy.tsx";


function App() {

  return (
    <>
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />}/>
                <Route path="vacancy/:id" element={<Vacancy />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/admin" element={
                    <AdminRoute>
                        <Dashboard />
                    </AdminRoute>
                } />
            </Route>
        </Routes>
    </>
  )
}

export default App
