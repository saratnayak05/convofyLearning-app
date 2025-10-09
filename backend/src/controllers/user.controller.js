import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";


export async function getRecommendedUsers(req,res){
    try {
        const currentUserId = req.user.id;
        const currentUSer = req.user;

        const recommendedUsers = await User.find({
          $and: [
            {_id: {$ne: currentUserId}}, //exclude current user
            {_id: {$nin: currentUSer.friends}}, //exclude current user's friends
            {isOnboarded: true}
          ]
        })
        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.error("Error in getRecommendUsers controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getMyFriends(req,res){
    try {
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends", "fullName profilePic nativeLanguage, learningLanguage");

        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error in getMyFriends controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function sendFriendRequest(req, res) {
    try {
        const myId =req.user.id;
        const { id:recipientId } = req.params

        //prevent sedning req t yourself
        if( myId === recipientId) {
            return res.status(400).json({ message: "You can't send friend request to yourself" });
        }

        const recipient = await User.findById(recipientId)
        if(!recipient){
            return res.status(404).json({ message: "Recipient not found" });
        }
       
        if(recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user" });
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId },
            ]
        })

        if(existingRequest){
            res.status(400).json({ message: "A friend request already exists between you and this user" });
        }

        const FriendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        res.status(201).json(FriendRequest);
    } catch (error) {
        console.error("Error in sendFriendRequest controller", error.message);
        res.status(500),json({ message: "Internal Server Error" });
    }
}