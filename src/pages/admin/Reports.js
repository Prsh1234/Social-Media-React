import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import "../../css/Admin.css";
import { dismissReport, getReports } from "../../services/admin";
import { deletePost } from "../../services/admin";
import { doGetComments } from "../../services/comment";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // state for modal image
    const [selectedReport, setSelectedReport] = useState(null);
    const [visiblePosts, setVisiblePosts] = useState({});
    const [comments, setComments] = useState({});

    const userId = localStorage.getItem("userId");

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

    const handleToggleComments = async (postId) => {
        if (!visiblePosts[postId]) {
            const result = await doGetComments(postId);
            if (result.success) {
                setComments((prev) => ({ ...prev, [postId]: result.data }));
            }
        }
        setVisiblePosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
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
                                            <button className="admin-table-button view-option" onClick={() => setSelectedReport(report)}>View Post</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                </div>
            </div>
            {selectedImage && (
                <div className="image-modal" onClick={() => setSelectedImage(null)}>
                    <img src={selectedImage} alt="Full Size" className="modal-image" />
                </div>
            )}
            {selectedReport && (
                <div className="image-modal">
                    <div className="modal-post">

                        <div className="post-container">
                            <div className="post-card">
                                <NavLink
                                    to={
                                        selectedReport.userPostDTO.posterId.toString() === userId
                                            ? "/profile/info"
                                            : `/friend/info/${selectedReport.userPostDTO?.posterId}`
                                    }
                                >
                                    <div className="profile-pic">
                                        <img
                                            src={
                                                selectedReport.userPostDTO?.profilePic
                                                    ? `data:image/jpeg;base64,${selectedReport.userPostDTO.profilePic}`
                                                    : "/assets/profile.jpg"
                                            }
                                            alt="Profile Pic"
                                        />
                                    </div>
                                </NavLink>

                                <div className="post-data-area">
                                    <h4>
                                        <NavLink
                                            to={
                                                selectedReport.userPostDTO.posterId.toString() === userId
                                                    ? "/profile/info"
                                                    : `/friend/info/${selectedReport.userPostDTO.posterId}`
                                            }
                                        >
                                            {selectedReport.userPostDTO?.userName}
                                        </NavLink>
                                        <div className="timestamp">
                                            {new Date(selectedReport.createdAt).toLocaleString()}
                                        </div>
                                    </h4>

                                    <p>{selectedReport.userPostDTO?.content}</p>

                                    {selectedReport.userPostDTO?.imageBase64 && (
                                        <div className="post-image">
                                            <img
                                                src={`data:image/jpeg;base64,${selectedReport.userPostDTO.imageBase64}`}
                                                alt="Post"
                                            />
                                        </div>
                                    )}

                                    <div className="post-actions">
                                        <button
                                            className="admin-table-button delete-option"
                                            onClick={() =>
                                                deleteSelectedPost(selectedReport.userPostDTO?.id)
                                            }
                                        >
                                            Delete Post
                                        </button>
                                        <button
                                            className="admin-table-button view-option"
                                            onClick={() => removeReport(selectedReport.id)}
                                        >
                                            Dismiss Report
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleToggleComments(selectedReport.userPostDTO.id)
                                            }
                                        >
                                            {visiblePosts[selectedReport.userPostDTO.id]
                                                ? "💬 Hide Comments"
                                                : "💬 Show Comments"}
                                        </button>
                                        <button
                                            className="close-modal-btn"
                                            onClick={() => setSelectedReport(null)}
                                        >
                                            ✖ Close
                                        </button>
                                    </div>


                                    {visiblePosts[selectedReport.userPostDTO.id] && (
                                        <div className="comments-section">
                                            {(comments[selectedReport.userPostDTO.id] || []).map((c) => (
                                                <div key={c.id} className="comment">
                                                    <div className="comment-avatar">
                                                        <NavLink
                                                            to={
                                                                c.userId === userId
                                                                    ? "/profile/info"
                                                                    : `/friend/info/${c.userId}`
                                                            }
                                                        >
                                                            <img
                                                                src={
                                                                    c.profilePic
                                                                        ? `data:image/jpeg;base64,${c.profilePic}`
                                                                        : "/assets/profile.jpg"
                                                                }
                                                                alt="Profile Pic"
                                                            />
                                                        </NavLink>
                                                    </div>
                                                    <div className="comment-content">
                                                        <strong>
                                                            <NavLink
                                                                to={
                                                                    c.userId === userId
                                                                        ? "/profile/info"
                                                                        : `/friend/info/${c.userId}`
                                                                }
                                                            >
                                                                {c.userName}:
                                                            </NavLink>
                                                        </strong>
                                                        <span>{c.content}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default Reports;
