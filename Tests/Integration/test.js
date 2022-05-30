const axios = require("axios").default;
axios.defaults.baseURL = "http://localhost:3000";
withdraw = async (number, amount, passcode, id) => {
    const data = {
        _id: id || "6236774d1a42dbfef22613c6",
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
    //Test #1
    await withdraw(1,100, 1234,"badID");
    //Test #2
    await withdraw(2,100, 2542);
    //Test #3
    await withdraw(3,12000);
    //Test #4
    await withdraw(4,5500);
    //Test #5
    await withdraw(5,1000);
}
test();