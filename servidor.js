const express = require('express')
const cors = require("cors");
const fs = require("node:fs");
const {google} = require('googleapis');

const app = express()

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))

const gd = JSON.parse(fs.readFileSync("google_drive.json", {encoding:"utf8"}));
const driveClient = createDriveClient(gd.clientId, gd.clientSecret, gd.redirectUri, gd.refreshToken);
console.log(driveClient);

function createDriveClient(clientId, clientSecret, redirectUri, refreshToken) {
    const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    client.setCredentials({ refresh_token: refreshToken });
    return google.drive({ version: 'v3', auth: client });
}

app.get('/', function (req, res) {
  res.redirect("/main/index.html");
})


app.listen(3000)