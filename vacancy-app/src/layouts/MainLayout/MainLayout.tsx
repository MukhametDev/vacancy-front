import Header from "../../components/Header/Header.tsx";
import {Outlet} from "react-router";

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default MainLayout
