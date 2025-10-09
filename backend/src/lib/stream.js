import {StreamChat} from "stream-chat"
import "dotenv/config"

const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

if(!apiKey || !apiSecret) {
    console.error("Stream API Key or Seceret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertcreateStreamUser = async (userData) => {
    try{
        await streamClient.upsertUsers([userData]);
        return userData;
    }catch(error) {
        console.error("Error upserting Stream user:", error);
    }
}

//todo: do it later
// export const generateStreamToken = (userId) = {}