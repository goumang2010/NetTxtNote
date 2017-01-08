export {
db,
autoIncrement
} from './db';
import {models} from './models';
//��Ⲣ��ʼ�����ݿ�
//���������Ĳ�������

(async function inidb() {
     //��������ý����ʽ
    let mediaform: any = models.MediaForm;
    let mediaformdef = (await mediaform.model.$paginate({ filter: { code: 0 } })).data;
    mediaformdef = mediaformdef ? mediaformdef.list[0] : undefined;
    if (mediaformdef === undefined) {
        mediaformdef = (await mediaform.model.$create({
            name: 'test',
            width: 200,
            height: 300,
            code: 0,
            needToUpload: false
        }));

        mediaformdef = mediaformdef.data;
    }
     else{
        if (mediaformdef._status !== 1) {
            //�ָ�Ĭ��
            await mediaform.model.$update({
                id: mediaformdef._id,
                data: {
                    name: 'test',
                    width: 200,
                    height: 300,
                    needToUpload: false,
                    _status: 1
                }
            })
        }
    }
    //console.log('mediaformdef');
    //console.log(JSON.stringify(mediaformdef, null, 4));
    //��������ý����ʽ
    let media: any = models.Media;
    let mediadef = (await media.model.$paginate({ filter: { name: 'test'} })).data;
    mediadef = mediadef ? mediadef.list[0] : undefined;
    if (mediadef === undefined) {
        mediadef = (await media.model.$create({
            name: 'test',
            form: mediaformdef._id,
            path:'test'
        }));
        mediadef = mediadef.data;
    }
    else {
        if (mediadef._status !== 1) {
            //�ָ�Ĭ��
            await media.model.$update({
                id: mediadef._id,
                data: {
                    _status: 1
                }
            })
        }
    }
    //console.log('mediadef');
    //console.log(JSON.stringify(mediadef, null, 4));
    //���������û���
     let usergroup: any = models.UserGroup;
     let usergroupdef = (await usergroup.model.$paginate({ filter: { name: 'test' } })).data;
     usergroupdef = usergroupdef ? usergroupdef.list[0] : undefined;
     if (usergroupdef === undefined) {
         usergroupdef = (await usergroup.model.$create({
             name: 'test',
             code: 111111
         })).data
     }
     else {
         if (usergroupdef._status !== 1) {
             //�ָ�Ĭ��
             await usergroup.model.$update({
                 id: usergroupdef._id,
                 data: {
                     _status: 1
                 }
             })
         }
     };
     //console.log('usergroupdef');
     //console.log(JSON.stringify(usergroupdef, null, 4));
     //���������˻�
     let user: any = models.User;
     let userdef = (await user.model.$paginate({ filter: { name: 'test' } })).data;
     userdef = userdef ? userdef.list[0] : undefined;
     if (userdef === undefined) {
         userdef = (await user.model.$create({
             name: 'test',
             password: 'test',
             email_value: 'test@qq.com',
             phone_value: '11111111111',
             role: usergroupdef._id
             })).data
     }
     else {
         if (userdef._status !== 1) {
             //�ָ�Ĭ��
             await user.model.$update({
                 id: userdef._id,
                 data: {
                     _status: 1
                 }
             })
         }
     };
     //console.log('userdef');
     //console.log(JSON.stringify(userdef, null, 4));
    //��������Ŀ¼
    let cate: any = models.Category;
    let catedef = (await cate.model.$paginate({ filter: { name: 'test' } })).data;
    catedef = catedef ? catedef.list[0] : undefined;
    if (catedef === undefined) {
        catedef=(await cate.model.$create({
            name: 'test',
            user: userdef._id,
            cover: mediadef._id,
            description: '',
        }));
        catedef = catedef.data;
    }
    else {
        if (catedef._status !== 1) {
            //�ָ�Ĭ��
            await cate.model.$update({
                id: catedef._id,
                data: {
                    _status: 1
                }
            })
        }
    }

    //console.log('catedef');
    //console.log(JSON.stringify(catedef, null, 4));
    //�������Լ�¼
    let note: any = models.Note;
    let notedef = (await note.model.$paginate({ filter: { name: 'test' } })).data;
    notedef = notedef ? notedef.list[0] : undefined;
    if (notedef === undefined) {
        notedef=(await note.model.$create({
            name: 'test',
            category: catedef._id,
            media:[ mediadef._id],
            txt: 'test'
        })).data;
    }
    else {
        if (catedef._status !== 1) {
            //�ָ�Ĭ��
            await note.model.$update({
                id: notedef._id,
                data: {
                    name: 'test',
                    category: catedef._id,
                    media: [mediadef._id],
                    txt: 'test',
                    _status: 1
                }
            })
        }
    }
    //console.log('notedef');
    //console.log(JSON.stringify(notedef, null, 4));


})();
export {models}

