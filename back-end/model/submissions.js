const mongoose = require("mongoose");

const submissionsSchema = new mongoose.Schema({
    title: String,
    url: String,
    filePath: String,
    date: {
        type: Date,
        default: Date.now
    }
});
const Submissions = mongoose.model("submissions", submissionsSchema);
module.exports = Submissions;