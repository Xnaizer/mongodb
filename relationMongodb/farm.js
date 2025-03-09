import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/relation').then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season : {
        type: String,
        enum: ['summer', 'winter']
    }
});

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})



const Farm = mongoose.model('Farm', farmSchema);

const Product = mongoose.model('Product', productSchema);

// Product.insertMany([
//     {name: 'apple', price: 10000, season: 'summer'},
//     {name: 'banana', price: 20000, season: 'summer'},
//     {name: 'orange', price: 30000, season: 'summer'},
//     {name: 'grape', price: 40000, season: 'summer'},
//     {name: 'kiwi', price: 50000, season: 'summer'},

// ]).then(result => console.log(result)).catch(err => console.log(err));

const makeFarm = async () => {
    const farm = new Farm({
        name: 'John Doe Farm',
        city: 'Anytown'
    })
    const apple = await Product.findOne({name: 'apple'});
    farm.product.push(apple);
    const res = await farm.save();
    console.log(res);
}

// makeFarm();


const addProduct = async (id) => {
    const farm = await Farm.findById(id);
    const kiwi = await Product.findOne({name: 'kiwi'});
    farm.product.push(kiwi);
    const res = await farm.save();
    console.log(res);
}

// addProduct('67cd339153a163cf789ee48a');


Farm.findOne({ name: 'John Doe Farm' }).populate('product', ['name', 'price']).then((farm) => {
    console.log(farm);

    for (const product of farm.product) {
        console.log(product.name);
    }
})