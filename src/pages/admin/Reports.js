import { useEffect, useState } from "react";
import "../../css/Admin.css";
import { dismissReport, getReports } from "../../services/admin";
import { deletePost } from "../../services/post";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // state for modal image

    const fetchReports = async () => {
        const res = await getReports();
        if (res.success) {
            setReports(res.data);
        }
    };
    useEffect(() => {
        fetchReports();
    }, []);
    const deleteSelectedPost = async (postId) => {
        const res = await deletePost(postId); 
        if (res.success) {
            setReports(reports.filter(r => r.userPostDTO?.id !== postId));
        }
    };
    
    const removeReport = async (reportId) => {
        const res = await dismissReport(reportId); 
        if (res.success) {
            setReports(reports.filter(r => r.id !== reportId));
        }
    };
    


    return (
        <div>
            <h2>Admin Dashboard</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Reported By</th>
                        <th>Content</th>
                        <th>Image</th>
                        <th>Posted By</th>
                        <th>Posted At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((r, index) => (
                        <tr key={index}>
                            <td>{r.reporterName}</td>
                            <td>{r.userPostDTO?.content}</td>
                            <td>{r.userPostDTO?.imageBase64 && (
                                <img
                                    className="report-image"
                                    src={`data:image/jpeg;base64,${r.userPostDTO.imageBase64}`}
                                    alt="Post"
                                    onClick={() => setSelectedImage(`data:image/jpeg;base64,${r.userPostDTO.imageBase64}`)}
                                />
                            )}
                            </td>
                            <td>{r.userPostDTO?.userName}</td>
                            <td>{new Date(r.createdAt).toLocaleString()}</td>
                            <td className="admin-table-options">
                                <button className="admin-table-button delete-option" onClick={() => deleteSelectedPost(r.userPostDTO?.id)}>Delete Post</button>
                                <button className="admin-table-button view-option" onClick={() => removeReport(r.id)}>Dismiss Report</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            {selectedImage && (
                <div className="image-modal" onClick={() => setSelectedImage(null)}>
                    <img src={selectedImage} alt="Full Size" className="modal-image" />
                </div>
            )}
        </div>
    );
};

export default Reports;
