import Navbar from "./Navbar";
import { Outlet } from "@tanstack/react-router"

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Outlet for nested routes */}
                <Outlet />
            </div>
        </div>
    )
}

export default RootLayout;