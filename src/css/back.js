import { useEffect, useState } from "react";
import "../../css/Admin.css";
import { dismissReport, getReports } from "../../services/admin";
import { deletePost } from "../../services/admin";

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
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };


    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="admin-title">Reports Dashboard</h1>
                <p className="admin-subtitle">Manage reported content and user violations</p>
                <div className="table-container">
                    {reports.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📋</div>
                            <h3 className="empty-state-title">No Reports Found</h3>
                            <p className="empty-state-description">
                                There are currently no reports to review. Check back later for new reports.
                            </p>
                        </div>
                    ) : (
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
                                {reports.map((report) => (
                                    <tr key={report.id}>
                                        <td>
                                            <div className="user-info">
                                                <div className="user-details">
                                                    <div className="user-name">{report.reporterName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content-preview">
                                                {report.userPostDTO?.content}
                                            </div>
                                        </td>
                                        <td>{report.userPostDTO?.imageBase64 ? (
                                            <img
                                                className="report-image"
                                                src={`data:image/jpeg;base64,${report.userPostDTO.imageBase64}`}
                                                alt="Post"
                                                onClick={() => setSelectedImage(`data:image/jpeg;base64,${report.userPostDTO.imageBase64}`)}
                                            />
                                        ) : (
                                            <span style={{ color: '#a0aec0', fontSize: '0.875rem' }}>No image</span>
                                        )}
                                        </td>
                                        <td><div className="user-info">

                                            <div className="user-details">
                                                <div className="user-name">{report.userPostDTO?.userName}</div>
                                            </div>
                                        </div>
                                        </td>
                                        <td><div className="date-display">
                                            {formatDate(report.createdAt)}
                                        </div></td>
                                        <td className="admin-table-options">
                                            <button className="admin-table-button delete-option" onClick={() => deleteSelectedPost(report.userPostDTO?.id)}>Delete Post</button>
                                            <button className="admin-table-button view-option" onClick={() => removeReport(report.id)}>Dismiss Report</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {selectedImage && (
                        <div className="image-modal" onClick={() => setSelectedImage(null)}>
                            <img src={selectedImage} alt="Full Size" className="modal-image" />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Reports;
