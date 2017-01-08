//Generate by preload script using shelljs;
import * as api_category from './api.category';
import * as api_media from './api.media';
import * as api_mediaform from './api.mediaform';
import * as api_note from './api.note';
import * as api_user from './api.user';
import * as api_usergroup from './api.usergroup';
let apis_arr= [
api_category.default,
api_media.default,
api_mediaform.default,
api_note.default,
api_user.default,
api_usergroup.default
];
let [category,media,mediaform,note,user,usergroup]=apis_arr;
let apis={category,media,mediaform,note,user,usergroup};
export { apis_arr,apis}

