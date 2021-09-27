var transaction = require("../db/models").Transaction;
const { Op } = require("sequelize");

module.exports = {
   async listDesc(req, res){
       try {
           const allTrans = await transaction.findAll({
               order: [["createdAt", "DESC"]]
           });
           return res.status(200).send(allTrans);
       } catch (err){
           console.log(err.message);
           return res.status(400).send(err);
       }
   },
   async create(req, res){
       try {
           if(!req.body.concept || !req.body.amount || !req.body.date || !req.body.type || !req.body.category){
               res.status(400).send('Please complete all required fields');
           }
           const newTransaction = transaction.create(req.body);
           return res.status(201).send(newTransaction);
       } catch(err){
           console.log(err.message);
           return res.status(400).send(err);
       }
   },
   async update(req, res){
       try {
           const transToUpdate = await transaction.findByPk(req.params.id);
           if(transToUpdate){
               const updated = await transToUpdate.update(req.body);
               return res.status(200).send(updated);
           }
       } catch (err){
        console.log(err.message);
        return res.status(400).send(err);
       }
   },
   async listIncome(req, res){
       try {
           const inTrans = await transaction.findAll({
               where : {type: 'IN'}
           });
           return res.status(200).send(inTrans);

       } catch(err){
           console.log(err.message);
           return res.status(400).send(err);
       }
   },
   async listOutcome(req, res){
    try {
        const outTrans = await transaction.findAll({
            where : {type: 'OUT'}
        });
        return res.status(200).send(outTrans);

    } catch(err){
        console.log(err.message);
        return res.status(400).send(err);
    }
},
    async byCategory(req, res) {
        try {
            const outTrans = await transaction.findAll({
                where: {
                    [Op.and]: [
                      { type: req.query.type },
                      { category: req.query.category }
                    ]
                  }
            });
            return res.status(200).send(outTrans);
    
        } catch(err){
            console.log(err.message);
            return res.status(400).send(err);
        }
    },
    async destroy(req, res){
        try{
            const transToDestroy = await transaction.findByPk(req.params.id);
            if(transToDestroy){
                const deletedTrans = await transToDestroy.destroy();
                return res.status(204).send(deletedTrans);
            }
            return null;
        } catch(err){
            console.log(err.message);
            return res.status(400).send(err);
        }
    }
};