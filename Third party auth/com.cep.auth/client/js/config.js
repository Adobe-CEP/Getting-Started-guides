const CLIENT_ID = "YOUR_DROPBOX_CLIENT_ID";
const CLIENT_SECRET = "YOUR_DROPBOX_SECRET";

try {
        if (module) {
                module.exports = {
                        CLIENT_ID: CLIENT_ID,
                        CLIENT_SECRET: CLIENT_SECRET
                }
        }
}
catch (err) {}
