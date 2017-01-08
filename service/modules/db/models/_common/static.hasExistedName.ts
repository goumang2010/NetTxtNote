
/** 暂未使用, 可用于添加用户时检测用户名是否存在
*/
let
fn = async function(v:string){
    let
    res = await this.findOne({
        'name' : v
    }, { _id : 1 });

    return res;
};

export default {
    name : '$hasExistedName',
    fn   : fn
};
