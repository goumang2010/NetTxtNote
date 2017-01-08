
/** 暂未使用, 可用于添加用户时检测 Email 是否存在
*/
let fn = async function(v:string){
    let  res = await this.findOne({
        'email.value' : v
    }, { _id : 1 });

    return res;
};

export default {
    name : '$hasExistedEmail',
    fn   : fn
};
