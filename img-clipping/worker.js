onmessage = function(e) {
    var imgdata = e.data[0]//imgdata
    var pos = e.data[1]//pos
    var width = imgdata.width, height = imgdata.height, data = imgdata.data
    var color = _color(pos.x, pos.y)
    var g_arr0 = new Array(width * height), g_arr1 = new Array(width * height) 
    var newarr = recursion([pos.x,pos.y]) 
    var count = e.data[2]
    // newarr.forEach((e)=>{
    //     newarr = newarr.concat(recursion(e))
    // })
    for(var i = 0, p = 0; newarr[i];i++){
        newarr = newarr.concat(recursion(newarr[i]))
        if(i/newarr.length - p > 0.1){
            p = i/newarr.length
            console.log(p)
        }
    }
    g_arr1.forEach(
        (e,i)=>{
            imgdata.data[i] = 255
            imgdata.data[i+1] = 255
            imgdata.data[i+2] = 255
            imgdata.data[i+4] = 255
            // console.log(i)
        }
    )
    postMessage(imgdata)
    close()
    // g_hidden_canvas.getContext('2d').putImageData(imgdata,0,0)
    // display(g_hidden_canvas,ctx,mapinfo)
    // console.log(g_arr1)  
    return color
    function recursion(point){
        var new_arr        
        var near = _nearby(point[0], point[1])
        new_arr = []
        near.forEach((e,i)=>{
            var D = color_distance(color, _color(e[0],e[1]))
            var index = _(e[0],e[1])
            if(g_arr0[index] || g_arr1[index]){
                return
            }
            if(D > count){
                g_arr0[index] = 1
            }else{
                g_arr1[index] = 1
                new_arr.push(e)
            }
        })
        return new_arr;
        

    }
    function _nearby(x, y){
        var arr = [[x-1,y-1],[x-1,y],[x-1,y+1],[x,y-1],[x,y+1],[x+1,y-1],[x+1,y],[x+1,y+1]]
        var result = []
        arr.forEach((e,i)=>{
            if(e[0]>width || e[0]<0 || e[1]>height || e[1]<0)
                return            
            result.push([e[0],e[1]])
        })
        return result
    }
    function _color(x,y){
        if(x>width || y>height)
            return NaN
        var i = (y*width+x)*4
        return [data[i],data[i+1],data[i+2],data[i+3]]
    }
    function _(x,y){
        if(x>width || y>height)
            return NaN
        var i = (y*width+x)*4
        return i//[data[i],data[i+1],data[i+2],data[i+3]]
    }
}

function color_distance(rgb0,rgb1){
    return parseInt( Math.sqrt( 3*Math.pow(rgb0[0]-rgb1[0],2) +
            4*Math.pow(rgb0[1]-rgb1[1],2) +
            2*Math.pow(rgb0[2]-rgb1[2],2)))
}
