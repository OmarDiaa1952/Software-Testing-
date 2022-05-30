const User = require("../model/user");
const ATM = require("../model/atm");
const Trans = require("../model/trans");

exports.getBalance = async (req, res, next) => {
    const _id = req.params._id;
    const user = await User.findById(_id);
    if (user) res.json({ name: user.name, balance: user.balance });
    else res.status(400).json({ msg: "User not found" });
};
exports.withdraw = async (req, res, next) => {
    const { _id, passcode, amount } = req.body;
    const date = new Date().toISOString().substring(0, 10);
    const user = await User.findById(_id);
    try {
        if (user) {
            if (user.passcode != passcode) throw new Error("Wrong passcode");
            if (user.balance - amount < 100)
                throw new Error("You can't have less than 100$ in account");
            else if (amount < 50)
                throw new Error("Can't withdraw less than 50$");
            else if (amount % 50 != 0)
                throw new Error("Amount of withdraw must be a multiple of 50");
            else if (amount > 10000)
                throw new Error("You can't withdraw over 10,000$ at a time");
            else {
                const atm = await ATM.findOne({}).exec();
                const balances = atm.balance;
                
                


                const atmBalance = Object.entries(balances).reduce(
                    (total, [key, value]) => total + value * +key.substring(1),
                    0
                );

                if (amount > atmBalance)
                    throw new Error("Insufficient fund in the machine");

                const trans = await Trans.find({ by: _id, date, action: 0 });
                let withdrawnToday = 0;
                trans.forEach((t) => (withdrawnToday += t.amount));
                if (withdrawnToday > 15000)
                    throw new Error("Can't withdraw more than 15,000$ per day");
                const oldBalance = user.balance;
                user.balance -= amount;
                const newTrans = new Trans({
                    by: _id,
                    amount,
                    date,
                    action: 0,
                });
                Promise.all([newTrans.save(), user.save()]).then((result) =>
                    res.json({
                        success: true,
                        amount,
                        oldBalance,
                        balance: user.balance,
                    })
                );
            }
        } else throw new Error("User not found");
    } catch (error) {
        next(error);
    }
};

exports.deposit = async (req, res, next) => {
    const { _id, amount } = req.body;
    const user = await User.findById(_id);
    if (user) {
        user.balance += amount;
        const newTrans = new Trans({ _id, amount, date, action: 1 });
        Promise.all([newTrans.save(), user.save()]).then((result) =>
            res.json({ amount, balance: user.balance })
        );
    } else res.status(400).json({ msg: "User not found" });
};

exports.setBalance = async (req, res, next) => {
    const { _id, amount } = req.body;
    const user = await User.findById(_id);
    if (user) {
        user.balance = amount;
        await user.save();
        res.json({ balance: user.balance });
    } else res.status(400).json({ msg: "User not found" });
};

exports.newUser = async (req, res, next) => {
    const { name, balance, passcode } = req.body;
    if (balance > 500) {
        const user = new User({ name, balance, passcode });
        await user.save();
        res.json({ name, balance: balance });
    } else res.status(400).json({ msg: "You need 500$ to open account" });
};

exports.resetATM = async (req, res, next) => {
    const atm = await ATM.findOne({});
    const amount = req.params.amount;
    atm.balance = {
        x50: 0,
        x100: 0,
        x200: amount / 200,
    };
    atm.save();
    res.json({ msg: "Reset" });
};

exports.resetTrans = async (req, res, next) => {
    await Trans.deleteMany({});
    res.json({ msg: "Reset" });
};
