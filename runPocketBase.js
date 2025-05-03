const {exec} = require("child_process")
const os = require("os")

const binary = os.platform() === "win32" ? "pocketbase.exe" : "./pocketbase";

exec(`${binary} serve`, (error, stdout, stderr) => {
    if (error) {
        console.error(`執行錯誤: ${error.message}`);
    }
    if (stderr) {
        console.error(`錯誤輸出: ${stderr}`);
    }
    console.log(stdout);
});