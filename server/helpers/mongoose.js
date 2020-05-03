module.exports = {
    normalizeErrors : function(err) {
        const normalizeErrors={
            Errors:[]
        }
        for (const property in err) {
            ///console.log(`${property}: ${err[property]}`);
            if(err.hasOwnProperty(property)){
                normalizeErrors.Errors.push({title:property,detail:err[property].message})
            }
        }
        return normalizeErrors;   
    }
}