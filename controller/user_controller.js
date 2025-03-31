import List from '../models/list.js';
import mongoose from 'mongoose';

const add = async (req, res) => {
    try {
        const { userid, username } = req.body;

        let leaderboard = await List.findById(userid);

        if (leaderboard) {
            leaderboard.usernames.push(username);

            await leaderboard.save();

            return res.status(201).json({
                message: "Username added successfully!",
                success: true,
            });
        }

        const newLeaderboard = new List({
            userid: userid,
            usernames: [username],
        });

        await newLeaderboard.save();

        res.status(201).json({
            message: "List added successfully!",
            success: true,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", success: false });
    }
};

const remove = async (req, res) => {
    try {
        const { username, userid } = req.body;

        let leaderboard = await List.findById(userid);
        if (leaderboard) {

            leaderboard.usernames = leaderboard.usernames.filter(e => e !== username);

            await leaderboard.save();

            return res.status(201).json({
                message: "Username deleted successfully!",
                success: true,
            });
        }

        return res.status(404).json({
            message: "List not found!",
            success: false,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

const fetchusernames = async (req, res) => {
    try {
        const userid = req.query.userid;
        const leaderboard = await List.findOne({userid:userid});
        if (!leaderboard) {
            return res.status(404).json({
                message: "List not found!",
                success: false,
            });
        }
        return res.status(200).json({
            data: leaderboard.usernames,
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

export { add, remove, fetchusernames };
