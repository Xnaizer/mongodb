// Koneksi ke MongoDB



const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movie_db').then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: Number,
    tags: [String],
    size: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true,
        maxLength: 200

    },
    condition:{
        type: String,
        enum: ['baru', 'bekas'],
        default: 'baru'
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Stock must be greater than 0']
    },
    availability: {
        online: Boolean,
        offline: Boolean
    }
});

productSchema.methods.outStock = function() {
    this.stock = 0;
    this.condition = 'bekas';
    this.availability.online = false;
    this.availability.offline = false;
    return this.save();
}

productSchema.statics.closeStore = function() {
    return this.updateMany({}, {
        stock: 0,
        condition: 'bekas',
        availability: {
            online: false,
            offline: false
        }
    })
}



const Product = mongoose.model('Product', productSchema);

const changeStock = async (id) => {
    const foundProduct = await Product.findById(id);
    await foundProduct.outStock();
    console.log(foundProduct);
    console.log("berhasil diubah");
    
}

changeStock('67cabf2fec40829e5c60a105');

const tshirt = new Product({
    name: 'T-Shirt',
    price: 10000,
    stock: 10,
    tags: ['fashion', 'summer']
});

tshirt.save().then(() => console.log('Product saved')).catch(err => console.log(err));


Product.findOneAndUpdate({ name: 'T-Shirt'}, {
    "name": "Kemeja Flanel",
    "price": 50000,
    "stock": 10,
    "tags": ["fashion", "summer"],
    "size": ["S", "M", "L"],
    "description": "Kemeja flanel dengan desain yang elegan dan klasik, terbuat dari bahan katun berkualitas tinggi.",
    "condition": "baru",
    "stock": 10,
    "availability": {
        "online": true,
        "offline": true
    }
},{new: true, runValidators: true}).then(result => console.log(result)).catch(err => console.log(err.errors.stock.properties.message)); 


Product.closeStore().then(() => console.log('Store closed')).catch(err => console.log(err));