const router = require('express').Router();
const Product = require('../models/product');


router.get('/', (req, res) => {
    Product.find({})
            .exec()
            .then(result => {
                if(result.length < 1) {
                    return  res.json({success: false, message: "No prodcut avilable"})
                }
                res.json({success: true, data: result})
            })
            .catch(err => {
                res.json({success: false, message: "mongo error"})
            })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Product.find({_id:id})
            .exec()
            .then(result => {
                if(result.length < 1) {
                    return  res.json({success: false, message: "No prodcut avilable"})
                }
                res.json({success: true, data: result})
            })
            .catch(err => {
                res.json({success: false, message: "mongo error"})
            })
})

router.post('/', (req, res) => {
    const product = new Product({
        name: "Flu Jeans",
        description: "Cheap and best Jeans for men",
        image: "https://5.imimg.com/data5/RM/LS/MY-50221607/flu-kids-jeans-500x500.jpg",
        price: 1200,
        mrp: 1900,
        craeted_at: Date.now().valueOf(),
        updated_at: Date.now().valueOf(),
    })

    product.save()
        .then((result) => {
            res.json({success: true, message:"Prodcut has been added"})
        })
        .catch((err) => {
            res.json({success: false, message: "Data not added"})
        })

})

module.exports = router;


