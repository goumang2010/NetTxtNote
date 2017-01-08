
import * as _        from 'lodash';
import * as bcrypt   from 'bcrypt';
import * as mongoose from 'mongoose';

import errors   from '../../errors';


let
updateRecord = async function(id,data, model){
    let
    user,
    res;

    try {
        user = await model.$findById('id', id, [1]);
    } catch(err) {
        return Promise.reject(err);
    }

    try {
        res  = await bcrypt.compareSync(`|-:${data.oldpwd}:-|`, user.password);

        if(!res)
            return errors.error({
                code  : '104'
            });

        let
        _salt = bcrypt.genSaltSync(12),
        _pwd  = bcrypt.hashSync(`|-:${data.newpwd}:-|`, _salt);

        /** TODO 此处用以下方式更新 password 会提示:
            ValidationError: user validation failed

            user.password = _pwd;
            user = await user.save();
        */

        let
        update = await model.update({
            _id : user._id
        }, {
            $set : {
                password : _pwd
            }
        }).exec();

        return update.ok === 1 ? errors.success(true) : errors.error({
            code : '31'
        });
    } catch(err) {
        return Promise.reject(err);
    }

};

let
fn = async function(id,data){
    let
        model = this;
    try {
        let
        res = await updateRecord(id,data, model);

        return res;
    } catch(err) {
        return err;
    }
};

export default {
    name : '$resetPassword',
    fn   : fn
};
