'use strict';
let Option = {new:true}

class BaseDao {


    constructor(dbModel) {

        this.Model = dbModel
    }

    save(object){
        return this.Model.create(object)
    }

    find() {
        return this.Model.find()
    }

    findOne(query) {
        return this.Model.findOne(query)
    }

    updateMany(query,data){
       // console.log('updateMany',query,data)
        return this.Model.updateMany(query,data)
    }

    findByIdAndDelete(query){
        return this.Model.findByIdAndDelete(query,Option)
    }

    findByIdAndUpdate(query,data){
        return this.Model.findByIdAndUpdate({_id:query},{$set:data},Option)
    }

    Aggregate(query){
        return  this.Model.aggregate(query) 
    }
    
}

module.exports = BaseDao;