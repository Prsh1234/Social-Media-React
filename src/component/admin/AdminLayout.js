
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
    return(
        <div className="container">
            <Header />
            <div class="row main-wrapper">
                <Sidebar />
                <div class="col main-body">
                    <Outlet />
                </div>
            </div>
        </div>        
    );
}

export default AdminLayout;