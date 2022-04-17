const noblox = require("noblox.js")
const config = require("./config.json")
let roleIdArray = [];

async function exileArrayOfUsers(array) {
    try {
        const users = await noblox.getPlayers(config.group, array, null, 0)
        users.forEach(async function (user, index) {
            await noblox.exile(config.group, user.userId)
            console.log(`Exiled ${user.username} [${user.userId}]`)
        }).then(
            console.log(`Exiled ${users.length} members`)
        );
        return exileArrayOfUsers(array)
    } catch { }
}
async function startApp() {
    const currentUser = await noblox.setCookie(config.cookie)
    const roles = await noblox.getRoles(config.group)
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)
    roles.forEach(async function (role, index) {
        roleIdArray[index] = role.id
    });
    exileArrayOfUsers(roleIdArray)
}

startApp()