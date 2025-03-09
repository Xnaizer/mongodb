import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/relation').then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));


const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);


// const makeTweet = async () => {
//     const user = new User({
//         name: 'John Doe',
//         age: 30
//     })

//     const tweet = new Tweet({
//         text: 'Hello, world! 2',
//         likes: 0,
//         user: user._id
//     })
//     tweet.user = user;
//     // user.save();
//     tweet.save();
// }
const makeTweet = async () => {
    const user = await User.findOne({
        name: 'John Doe'
    })

    const tweet = new Tweet({
        text: 'Hello, world! 3',
        likes: 0,
        user: user._id
    })
    tweet.user = user;
    // user.save();
    tweet.save();
}


// makeTweet();

const showTweet = async () => {
    const tweets = await Tweet.findById('67cd4884a18d87b21b23981e').populate('user');
    console.log(tweets);
}

showTweet();