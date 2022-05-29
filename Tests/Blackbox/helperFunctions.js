const axios = require("axios").default;
axios.defaults.baseURL = "http://localhost:3000";
exports.withdraw = async (amount) => {
    const data = {
        _id: "6236774d1a42dbfef22613c6",
        passcode: 1234,
        amount,
    };
    let result;
    try {
        result = await axios.post("/atm/withdraw", data);
    } catch (err) {
        result = err.response;
    }
    return result.data.success;
};

exports.resetBalance = () => {
    const data = {
        _id: "6236774d1a42dbfef22613c6",
        passcode: 1234,
        amount: 100000,
    };
    return axios.post("/atm/set", data);
};

exports.resetUser = () =>
    this.resetBalance().then((res) => axios.get("/atm/resetTrans"));

exports.resetATM = (amount = 12000) =>
    this.resetBalance().then((res) => axios.get("/atm/resetATM/" + amount));

exports.print = (title, result) => {
    const { n, fail } = result;
    const success = Math.round(((n - fail.length) / n) * 10000) / 100;
    const c = success < 50 ? "red" : success < 100 ? "yellow" : "green";

    console.log(color(title, "magenta"));
    console.log(
        color("\nTests passed = ", "cyan") +
            color(`${n - fail.length} / ${n}`, c)
    );
    let successBar = color("█".repeat(parseInt((success * 20) / 100)), c);
    successBar += color(
        "█".repeat(20 - parseInt((success * 20) / 100)),
        "grey"
    );
    console.log(successBar + "\t" + color(`${success}%`, c));
    fail.forEach((test) => {
        let result = color("Failed at value : ", "red");
        result += color(`${color(test.value, "yellow")}\n\t`);
        result += `${color("Expected : ", "cyan")} ${color(
            test.expected,
            "green"
        )}\n\t`;
        result += `${color("Result : ", "cyan")} ${color(
            !test.expected,
            "red"
        )}\n\t`;
        console.log(result);
    });

    console.log(`${".".repeat(100)}\n\n`);
};

color = (str, color = "default") => {
    colors = {
        red: 31,
        green: 32,
        yellow: 33,
        blue: 34,
        magenta: 35,
        cyan: 36,
        white: 37,
        grey: 90,
        brightRed: 91,
        brightGreen: 92,
        brightYellow: 93,
        brightBlue: 94,
        brightMagenta: 95,
        brightCyan: 96,
        default: 0,
        black: 90,
    };
    if (!colors[color]) color = "default";
    return `\u001b[${colors[color]}m${str}\u001b[0m`;
};

exports.stubPassed = (title)=>{
    const str = `${color("Passed","green")} ${color(title,"brightMagenta")} ${color("stub","green")}`;
    console.log(str);   
}
exports.stubFailed = (title)=>{
    const str = `${color("Failed","red")} ${color(title,"brightMagenta")} ${color("stub","red")}`;
    console.log(str);   
}
