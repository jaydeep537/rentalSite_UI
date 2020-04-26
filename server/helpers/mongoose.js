module.exports = {
    normalizeErrors : function(err) {
        const normalizeErrors = [];
        for (const property in err) {
            ///console.log(`${property}: ${err[property]}`);
            if(err.hasOwnProperty(property)){
                normalizeErrors.push({title:property,detail:err[property].message})
            }
        }
        return normalizeErrors;   
    }
}