const axios = require("axios").default;
axios.defaults.baseURL = "http://localhost:3000";
withdraw = async (amount) => {
    const data = {
        _id: "6236774d1a42dbfef22613c6",
        passcode: 1234,
        amount,
    };
    let result;
    try {
        result = await axios.post("/test/testWithdraw", data);
    } catch (err) {
        result = err.response;
    }
    return result.data.success;
};

const test = async ()=>{
    console.log("Tests started")
    await withdraw(1000);
    await withdraw(12000);
    console.log("Tests finished")
}
test();