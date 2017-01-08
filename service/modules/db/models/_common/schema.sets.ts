
let
schemaSetMap = {};

schemaSetMap['toJSON'] = {
    transform : function(doc, ret, options){
        // delete ret._id;
        delete ret.id;
        delete ret.__v;
    },
    virtuals : true
};

export default schemaSetMap;
