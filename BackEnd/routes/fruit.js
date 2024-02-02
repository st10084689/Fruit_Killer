const express = require('express');
const router = express.Router();
const Fruit = require('../models/fruit');
const checkauth = require('../check-auth')



router.get('', async (req, res) => {
    try {
        const fruits = await Fruit.find();
        res.json({ fruits });
    } catch (error) {
        console.error('Error fetching fruits:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('', checkauth, (req, res) =>{
    const fruit = new Fruit (
        {
            id: req.body.id,
            name:req.body.name
        }
    )
    fruit.save();
    res.status(201).json({
        message: 'Fruit Created',
        fruit:fruit
    })
})

router.delete('/:id',checkauth, (req,res)=>
{
    Fruit.deleteOne({_id: req.params.id})
    .then((result)=>
    {
        res.status(200).json({message: "Fruit Deleted"});
    });
})

module.exports = router