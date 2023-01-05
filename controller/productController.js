const injectionModel = require('../models/ProductSchema')
const mongoose=require('mongoose')
const addProductInjection = (req, res, next) => {

    console.log(req.file)
    //add to injection Section
    const inj = new injectionModel({
        _id : mongoose.Types.ObjectId(),
        name: req.body.name,
        image:req.file.path,
        price: req.body.price,
        Composition:req.body.Composition,
        effectiveMaterial: req.body.effectiveMaterial,
        alternative: req.body.alternative,
        indication: req.body.indication,
    })
    inj.save().then(
        data => {
            res.status(200).json({
                massage: "InJection is added",
                TheProduct:data
            })
            console.log(data)
        }

    ).catch(
        err => {
            res.status(404).json({
                massage: err
            })
        }
    )

}

const getinjectionNameOnly = (req, res, next) => {
    injectionModel.find().select('_id name').
        then(
            products => {
                const Response = {
                    products: products.map(products => {
                        return {
                          
                            name: products.name,
                            price: products.price,
                            Composition:req.body.Composition,
                            effectiveMaterial: products.effectiveMaterial,
                            alternative: products.alternative,
                            indication: products.indication,
                            _id:products._id,
                            url: {
                                type: 'GET',
                                url: 'localhost:3000/products/' + products._id
                            }
                        }
                    })
                }
                res.status(200).json({
                    products: Response
                })
            }
        ).catch(
            err => {
                res.status(404).json({
                    massage: err
                })
            }
        )

}

const getAllinjectionInfo = (req, res, next) => {
    injectionModel.find({_id:req.params.productID}).
        then(products => {
                res.status(200).json({
                    products: products
                })
            }
        ).catch(
            err => {
                res.status(404).json({
                    massage: err
                })
            }
        )

}

const deleteinjection = (req, res, next) => {
    injectionModel.findOneAndDelete({ _id: req.params.id }).then(
        product => {
            if (product) {
                res.status(200).json({
                    massage: "Product is deleted"
                })
            } else {
                res.status(404).json({
                    massage: "Product is Already Deleted.."
                })
            }

        }
    ).catch(
        err => {
            res.status(404).json({
                massage: err
            })
        }
    )

}

const updateinjection = (req, res, next) => {

    const NewProduct = {
    
        name: req.body.name,
        price: req.body.price,
        image:req.file.path,
        Composition:req.body.Composition,
        effectiveMaterial: req.body.effectiveMaterial,
        alternative: req.body.alternative,
        indication: req.body.indication,
        
    };

    injectionModel.findOneAndUpdate({ _id: req.params.id }, { $set: NewProduct }).then(
        product => {
            if (product) {
                res.status(202).json({
                    massage: "Product is Updated."
                })
            } else {
                res.status(404).json({
                    massage: "Product is not Found in database"
                })
            }
        }

    ).catch(
        err => {
            res.status(404).json({
                massage: err,
                m:"no"
            })
        }
    )

}

module.exports = {
    addProductInjection: addProductInjection,
    getinjectionNameOnly: getinjectionNameOnly,
    deleteinjection: deleteinjection,
    updateinjection: updateinjection,
    getAllinjectionInfo: getAllinjectionInfo
}