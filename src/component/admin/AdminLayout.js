
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { authenticateAdmin } from '../../services/auth';
import Header from '../Header';
import Sidebar from '../Sidebar';
const AdminLayout = () => {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validate = async () => {
            const valid = await authenticateAdmin(navigate);
            if (!valid) {
                navigate("/home");
            } else {
                setIsValid(true);
            }
            setLoading(false);
        };
        validate();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    if (!isValid) return null;
    return (
        <div className="home-container">
            <div className="home-header">
                <Header />
            </div>
            <div class="home-main-wrapper">
                <Sidebar />
                <div class="home-main-content">
                    <Outlet />
                </div>
            </div>
        </div>
        //     <div className="home-container">

        //     <div className="home-main-wrapper">
        //       <Sidebar />
        //       <div className="home-main-content">
        //         <Outlet />
        //       </div>
        //       <div className="home-right-sidebar">
        //         <Users />
        //       </div>
        //     </div>
        //   </div>      
    );
}

export default AdminLayout;