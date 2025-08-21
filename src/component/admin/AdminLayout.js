
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { authenticateAdmin } from '../../services/auth';
import Header from '../Header';
import Sidebar from '../Sidebar';
const AdminLayout = () => {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const validate = async () => {
            const valid = await authenticateAdmin(navigate);
            if (!valid) {
                navigate("/home");
            } else {
                setIsValid(true);
            }
        };
        validate();
    }, [navigate]);


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
    );
}

export default AdminLayout;