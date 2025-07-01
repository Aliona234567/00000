import { Header } from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
export function Layout() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            
            <div style={{ flex: 1 }}>
                <Outlet />
            </div>

            <Footer />
        </div>
    );
}

