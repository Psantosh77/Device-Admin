import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import Admins from "../models/AdminModel.js";
 
export const refreshToken = async(req, res) => {
    
    try {

        const url = req.url;
        const query = req.query;
        console.log(query.refreshToken); // Output: 'apple'
        const refreshToken = query.refreshToken ;
        // console.log("Refreshing token: ",req.cookies.refreshToken)
        if(!refreshToken) return res.sendStatus(401);
        const user = await Admins.findAll({ 
            where:{
                token: refreshToken
            }
        });

        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '1h'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}