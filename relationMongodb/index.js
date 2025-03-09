const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/relation').then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));


const userSchema = new mongoose.Schema({
    name: String,
    addresses: [{
        _id: false,
        street: String,
        city: String,
        country: String
    }]
});

const User = mongoose.model('User', userSchema);

// const makeUser = async () => {
//     const user = new User({
//         name: 'John Doe',

//     })
//     user.addresses.push({
//         street: '123 Main St',
//         city: 'Anytown',
//         country: 'USA'
//     })
//     const res = await user.save();
//     console.log(res);
// }

// makeUser();


const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: '321 Main St',
        city: 'Anyone',
        country: 'USA'
    })
    const res = await user.save();
    console.log(res);
}

addAddress('67cd2248b278dae6a5f7ae7b')