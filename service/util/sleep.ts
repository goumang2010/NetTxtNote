
export default
    function(time){
        return new Promise(function(resolve, reject){
            setTimeout(resolve, time);
        });
    };
