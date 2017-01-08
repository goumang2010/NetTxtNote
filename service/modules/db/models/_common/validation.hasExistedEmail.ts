
let
fn = function (modelName) {
    let
        fn = async function (v, cb) {
            //console.log('dd');
            //console.log(this);
        try {
            let res;
            if (this.model) {
            res = await this.model(modelName).findOne({
                'email.value' : v
                }, { _id: 1 });
            }
            return cb(!res);
        } catch (err) {
            
            return cb(null);
        }
    };

    return {
        path    : 'email.value',
        fn      : fn,
        message : '105'
    };
};

export default {
    name: '$hasExistedEmail',
    fn: fn
};

