import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getFriends} from "../../services/friend";



const FriendofFriend = () => {
    const [friendList, setFriendList] = useState([]);
    const { friendId } = useParams(); 
    const fetchFriends = async (friendId) => {
        const result = await getFriends(friendId);

        if (result.success) {
            setFriendList(result.data);
            console.log(result.data);
        } else {
            console.error("Error loading friends:", result.error);
        }
    }

    useEffect(() => {
        fetchFriends(friendId);
    }, [friendId]);

    return (
        <div>
            <div className="request-list">
                {friendList.map((friend) => (
                    <div key={friend.id} className="request-list-card">
                        <div className="profile-pic">
                            <img
                                src={
                                    friend.profilePic
                                        ? `data:image/jpeg;base64,${friend.profilePic}`
                                        : "/assets/profile.jpg"
                                }
                                alt={"Profile Pic"}

                            />                    </div>
                        <div className="user-list-name-area">
                            <h4>{friend.userName}</h4>
                        </div>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default FriendofFriend;