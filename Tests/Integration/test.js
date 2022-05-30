const axios = require("axios").default;
axios.defaults.baseURL = "http://localhost:3000";
withdraw = async (number, amount, passcode) => {
    const data = {
        _id: "6236774d1a42dbfef22613c6",
        passcode: passcode || 1234,
        amount,
    };
    let result;
    try {
        result = await axios.post(`/test/testWithdraw/${number}`, data);
    } catch (err) {
        result = err.response;
    }
    return result.data.success;
};

const test = async ()=>{
    console.log("Tests started")
    await withdraw(1,100, 2542);
    await withdraw(2,12000);
    await withdraw(3,5500);
    await withdraw(4,1000);
    console.log("Tests finished")
}
test();