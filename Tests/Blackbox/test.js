const { withdraw, resetUser, resetATM, print } = require("./helperFunctions");

//Test per transaction
const testPerTransaction = async () => {
    const testCases = [
        { value: -50, expected: false },
        { value: 45, expected: false },
        { value: 50, expected: true },
        { value: 55, expected: false },
        { value: 5000, expected: true },
        { value: 10000, expected: true },
        { value: 12000, expected: false },
    ];
    const fail = [];
   

//Test per day
const testPerDay = async () => {
    const testCases = [
        { value: 12000, expected: true },
        { value: 15000, expected: true },
        { value: 16000, expected: false },
    ];
    const fail = [];
    for (let test of testCases) {
        await resetUser();
        await resetATM();
        await withdraw(10000);
        const result = await withdraw(test.value - 10000);
        if (result != test.expected) fail.push(test);
    }
    return {
        n: testCases.length,
        fail,
    };
};

//Test for machine
const testForMachine = async () => {
    const testCases = [
        { value: 4500, expected: true },
        { value: 5000, expected: true },
        { value: 5500, expected: false },
    ];
    const fail = [];
    for (let test of testCases) {
        await resetUser();
        await resetATM(5000);
        const result = await withdraw(test.value);
        if (result != test.expected) fail.push(test);
    }
    return {
        n: testCases.length,
        fail,
    };
};

const runTest = async () => {
    let result;
    //Test per transaction
    result = await testPerTransaction();
    print("Test per transaction", result);

    //Test per day
    result = await testPerDay();
    print("Test per day", result);

    //Test for machine
    result = await testForMachine();
    print("Test for machine", result);
};

runTest();
