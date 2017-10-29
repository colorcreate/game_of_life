$(document).ready(function(){
    var box_size = 20;
    var height = 700;
    var width=1500;

    //generate row
    var i=0;
    var remain_height = height;
    while (remain_height>0){
        $('#content').append('<div id="row-'+ i +'"></div>');
        remain_height-=box_size;
        i++;
    }
    
    //generate box in each row
    var h = $('[id|=row]').length;//height
    for (var i=0; i<h; i++){
        var remain_width = width;
        var j=0;
        while (remain_width>0){
            $('#row-'+i).append('<div id="box-'+ i +'_'+ j +'"></div>');
            remain_width-=box_size;
            j++;
        }
    }

    
})