$(document).ready(function(){
    //init parameter
    var gui, control, params, m;
    var r = $('[id|=row]').length;//row
    var c = $('[id|=box]').length/r;//colomn
    var timer = 500;//0.5 second
    var isPaused = true;
    var initMatrix = function(){
        var m = new Array(r);//matriks m[i][j]
        for(var i=0; i<r; i++ ){
            m[i]= new Array(c);
        }
        for(var i=0; i<r; i++){
            for(var j=0; j<c; j++){
                m[i][j]=0;
            }
        }
        return m
    }
    //init active
    var initActive = function(form){
        if (form == 'Glider'){
            m[12][18]=1;
            m[13][19]=1;
            m[13][20]=1;
            m[14][18]=1;
            m[14][19]=1;
        }
        else if (form=='LWSS'){
            m[12][19]=1;
            m[12][20]=1;
            m[12][21]=1;
            m[12][22]=1;
            m[13][18]=1;
            m[13][22]=1;
            m[14][22]=1;
            m[15][18]=1;
            m[15][21]=1;
        }
        else if (form=='Pulsar'){
            m[8][18]=1;
            m[8][24]=1;

            m[9][18]=1;
            m[9][24]=1;

            m[10][18]=1;
            m[10][19]=1;
            m[10][23]=1;
            m[10][24]=1;

            m[12][14]=1;
            m[12][15]=1;
            m[12][16]=1;
            m[12][19]=1;
            m[12][20]=1;
            m[12][22]=1;
            m[12][23]=1;
            m[12][26]=1;
            m[12][27]=1;
            m[12][28]=1;

            m[13][16]=1;
            m[13][18]=1;
            m[13][20]=1;
            m[13][22]=1;
            m[13][24]=1;
            m[13][26]=1;

            m[14][18]=1;
            m[14][19]=1;
            m[14][23]=1;
            m[14][24]=1;

            m[16][18]=1;
            m[16][19]=1;
            m[16][23]=1;
            m[16][24]=1;

            m[17][16]=1;
            m[17][18]=1;
            m[17][20]=1;
            m[17][22]=1;
            m[17][24]=1;
            m[17][26]=1;

            m[18][14]=1;
            m[18][15]=1;
            m[18][16]=1;
            m[18][19]=1;
            m[18][20]=1;
            m[18][22]=1;
            m[18][23]=1;
            m[18][26]=1;
            m[18][27]=1;
            m[18][28]=1;

            m[20][18]=1;
            m[20][19]=1;
            m[20][23]=1;
            m[20][24]=1;

            m[21][18]=1;
            m[21][24]=1;

            m[22][18]=1;
            m[22][24]=1;
        }
        else if (form =='Pentadecathlon'){
            m[10][20]=1;
            m[11][20]=1;
            m[12][19]=1;
            m[12][21]=1;
            m[13][20]=1;
            m[14][20]=1;
            m[15][20]=1;
            m[16][20]=1;
            m[17][19]=1;
            m[17][21]=1;
            m[18][20]=1;
            m[19][20]=1;
        }
       
    }
    //generate initial game of life
    var generate_active = function(){
        for(var i=0; i<r; i++){
            for(var j=0; j<c; j++){
                if(m[i][j]==1){
                    $('#box-'+i+'_'+j).addClass('active');
                }
                else{
                    $('#box-'+i+'_'+j).removeClass('active');
                }
            }
        }
    }
    //check value box
    var value_box = function(i, j){     
        if (i>-1 && i<r && j>-1 && j<c){
            return m[i][j];
        }
        else{
            return 0
        }
    }
    //total neighbours
    var total_neighbours = function(i, j){
        var t = 0;
        t+=value_box(i-1,j-1);
        t+=value_box(i-1,j);
        t+=value_box(i-1,j+1);
        t+=value_box(i,j-1);
        t+=value_box(i,j+1);
        t+=value_box(i+1,j-1);
        t+=value_box(i+1,j);
        t+=value_box(i+1,j+1);
        return t
    }
    //t = total_neighbours, d=entri m[i,j]
    var generation_plus_one = function(t, d){
        if (d==1){
            if (t==2 || t==3){
                return 1
            }
            else {
                return 0
            }
        }
        else{
            if(t==3){
                return 1
            }
            else{
                return 0
            }
        }
    }
    //init game
    var initGame = function(params){
        m = initMatrix();
        initActive(params);
        generate_active();
    }
    //game_of_life
    var game_of_life = function(){

        if (!isPaused){
            var n = new Array(r);
            for(var i=0; i<r; i++ ){
                n[i]= new Array(c);
            }
            //generate array with input 0
            for(var i=0; i<r; i++){
                for(var j=0; j<c; j++){
                    n[i][j]=0;
                }
            }
            console.log("trigger");
            for(var i=0; i<r; i++){
                for(var j=0; j<c; j++){
                    var total = total_neighbours(i,j);
                    n[i][j] = generation_plus_one(total, m[i][j]);
                }
            }
            m=n;
            generate_active();
        };
        
        requestAnimationFrame(game_of_life, control.time*1000);
    }
    //loop animation
    var requestAnimationFrame = function(callback, time){
        return  window.setTimeout(callback, time);
    };


    //GUI
    control = {
        time: 0.5,
        play: false,
        form : ""
    };

    gui = new dat.GUI();
    gui.add(control, 'time', 0, 1).name('time');
    var play_pause = gui.add(control, 'play');
    play_pause.onChange(function(params){
        isPaused=!params;
    });
    var form = gui.add(control, 'form', [ 'Glider', 'LWSS', 'Pulsar', 'Pentadecathlon' ]);
    form.onChange(function(params){
        initGame(params);
    })
    gui.open();

    
    initGame();
    //loop
    game_of_life();
});