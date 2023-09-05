import google from '@googleapis/drive';
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();


const oauth2Client = new google.auth.OAuth2(
    process.env.YOUR_CLIENT_ID,
    process.env.YOUR_CLIENT_SECRET,
    process.env.YOUR_REDIRECT_URL
  );
// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/drive',
];


export const driveconnect = async(req, res)=>{
    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
      
        // If you only need one scope you can pass it as a string
        scope: scopes
      });
    res.redirect(url);
}



export const redirectToken = async(req, res)=>{
    try {
        // Extract the 'code' query parameter from the incoming request URL
        const { code } = req.query;
    
        // Exchange the authorization code for access tokens
        const { tokens } = await oauth2Client.getToken(code);
    
        // Set the access tokens in the OAuth2 client
        oauth2Client.setCredentials(tokens);
    
        // Handle tokens (e.g., store them in your database or use them as needed)
        if (tokens.refresh_token) {
          // Store the refresh_token in your database for future use
          console.log('Refresh Token:', tokens.refresh_token);
        }
        console.log('Access Token:', tokens.access_token);
        const user = await User.findOne({email:process.env.User_mail_demo});
        if (user) {
            user.refresh_token = tokens.refresh_token;
            user.access_token = tokens.access_token;
            await user.save();
            console.log('Refresh Token and Access Token stored in the database for the user.');
        } else {
            console.log('User not found for storing tokens.');
        }
        // You can now make authorized API requests using oauth2Client
        
        // Redirect or respond as needed after successfully obtaining tokens
        res.send('Tokens obtained successfully!');

      } catch (error) {
        console.error('Error obtaining tokens:', error);
        res.status(500).send('Error obtaining tokens');
      }
}

export const Revoke_drive_access = async(req, res)=>{
    try {
        const user = await User.findOne({email:process.env.User_mail_demo});

        user.access_token = null;
        user.refresh_token = null;

        // Save the updated user record
        await user.save();
        res.send('Tokens Revoke successfully!');

      } catch (error) {
        console.error('Error Tokens Revoke:', error);
        res.status(500).send('Error Tokens Revoke');
      }
}

export const content = async (req, res) => {
    try {
      const user = await User.findOne({ email: process.env.User_mail_demo });
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Retrieve the refresh token and access token from the user's record
      const refreshToken = user.refresh_token;
      const accessToken = user.access_token;
  
      // Now you can use the refreshToken and accessToken as needed
      if (!refreshToken && !accessToken) {
        return res.status(404).send('To view drive content first connect your drive');
      }
  
      // Set the credentials in the OAuth2 client
      oauth2Client.setCredentials({ refresh_token: refreshToken });
  
      // Get the list of files in the user's Drive
      const drive = google.drive({
        version: 'v3',
        auth: oauth2Client,
      });
  
      const filesResponse = await drive.files.list({
        spaces: 'drive',
        fields: 'nextPageToken, files(id, name, mimeType)',
      });
  
      const files = filesResponse.data.files; // Retrieve the files from the response

      if (!files || files.length === 0) {
        return res.status(404).send('No files found in Drive');
      }

      const fileList = files.map((file) => ({
        name: file.name,
        contentType: file.mimeType,
        size: file.size , // File size in bytes
        storage_usage: file.quotaBytesUsed , // Storage usage in bytes
        total_storage: file.quotaTotal , // Total drive storage in bytes
        risk_counter: Math.floor(Math.random() * 101), // Random number between 0 and 100
      }));

      // Set the headers
      res.header('Content-Type', 'application/json');

      // Send the response along with the list of files
      res.json({ message: 'Content loaded successfully!', files: fileList });

  
      // Send the response
      res.send('Content loaded successfully!');
    } catch (error) {
      console.error('Error During the content loading:', error);
      res.status(500).send('Error During the content loading');
    }
  };
  