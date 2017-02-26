
var g_hidden_canvas
var g_loaded = false
var mapinfo ={
    scale:{
        x:1,
        y:1
    },
    rotate:{
        angle:0
    },
    translate:{
        x:0,
        y:0
    }
}
var oldpos ={
    x:0,
    y:0
}
document.querySelectorAll('.img-clipping>button').forEach((e)=>{
    e.addEventListener('click',displayChange)
})
var c = document.querySelector('.img-clipping .display')
var ctx = c.getContext('2d')
var filepicker = document.querySelector('#file-picker')
filepicker.addEventListener('change',()=>{
    LoadImage(filepicker.files[0],ctx)
})
var old_color = [0,0,0,0]
c.addEventListener('mousemove',(e)=>{
    if(!g_loaded){
        return
    }
    var pos = getMousePosition(e)
    var src_pos = {
        x:Math.ceil((pos.x)/mapinfo.scale.x - mapinfo.translate.x),
        y:Math.ceil((pos.y)/mapinfo.scale.y - mapinfo.translate.y)
    }
    var temp = g_hidden_canvas.getContext('2d')
    var color = temp.getImageData(src_pos.x,src_pos.y,1,1)
    display(g_hidden_canvas,ctx,mapinfo)
    
    console.log(color_distance(old_color,color.data))
    old_color = color.data
    // var xxx = c.getContext('2d')
    // xxx.fillStyle = 'rgba('+color.data.join(',')+')'
    // xxx.clearRect(oldpos.x,oldpos.y,20,20)
    // xxx.fillRect(pos.x,pos.y,20,20)
    // oldpos={
    //     x:pos.x,
    //     y:pos.y
    // }
    // console.log(color)
    // console.log(src_pos)
    // console.log(mapinfo.translate)

})


function display(src_c,dst_ctx,mapinfo){
    // console.log(mapinfo)
    dst_ctx.save()
    dst_ctx.clearRect(0,0,800,800)
    dst_ctx.scale(mapinfo.scale.x,mapinfo.scale.y)
    dst_ctx.rotate(mapinfo.rotate.angle)
    dst_ctx.translate(mapinfo.translate.x,mapinfo.translate.y)
    dst_ctx.drawImage(src_c,0,0)
    dst_ctx.restore()
}
function displayChange(event){
    switch(event.target.className){
        case 'zoomin':
            mapinfo.scale.x = mapinfo.scale.y *= 1.1
            break
        case 'zoomout':
            mapinfo.scale.x = mapinfo.scale.y *= 0.9
            break
        case 'left':
            mapinfo.translate.x += 10
            break
        case 'right':
            mapinfo.translate.x -= 10
            break
        case 'up':
            mapinfo.translate.y -= 10
            break
        case 'down':
            mapinfo.translate.y += 10
            break
        case 'rotate':
            break
        default:
            break
    }
    ctx.clearRect(0,0,800,800)
    display(g_hidden_canvas,ctx,mapinfo)
}
/*
LoadImage(img_file,ctx)
将input（file）中读取到的文件加载至canvas
*/
function LoadImage(img_file,ctx){
    var img = new Image()
    // window.img = img
    var reader = new FileReader()
    reader.readAsDataURL(img_file)
    reader.onload = function(){
        img.src = reader.result
    }
    img.onload = function(){
        var _c = document.querySelector('#hidden-canvas')
        _c.height = img.height
        _c.width = img.width
        g_hidden_canvas = _c
        var _ctx = _c.getContext('2d')
        _ctx.drawImage(img,0,0,img.width,img.height)        
        mapinfo.scale.x = mapinfo.scale.y = 400.0/Math.max(img.width,img.height)
        ctx.clearRect(0,0,400,400)
        display(_c,ctx,mapinfo) 
        g_loaded = true       
    }
}
function getMousePosition(e){
    var x, y
    if (e.layerX || e.layerX == 0) {
        x = e.layerX
        y = e.layerY
    } else if (e.offsetX || e.offsetX == 0) {
        x = e.offsetX
        y = e.offsetY
    }
    return {x:x,y:y}
}
function color_distance(rgb0,rgb1){
    return parseInt( Math.sqrt( 3*Math.pow(rgb0[0]-rgb1[0],2) +
            4*Math.pow(rgb0[1]-rgb1[1],2) +
            2*Math.pow(rgb0[2]-rgb1[2],2)))
}
function color_distance11(rgb0,rgb1){
    var sum = 0, sum0 = 0, sum1 = 0
    var i = 0
    for(i = 0; i < 3; i++)
    {
        var e = rgb0[i]
        // console.log(e+' '+rgb1[i])
        if(i>2)
            return
        sum += (e * rgb1[i])
        sum0 += (e*e)
        sum1 += (rgb1[i]*rgb1[i])
    }
    // console.log([sum,sum0,sum1].join(' '))
    var theta = Math.acos(sum/(sum0*sum1==0?1:sum0*sum1))*510/Math.PI
    // console.log(theta+' theta')
    var max = Math.max(vector(rgb0)[3],vector(rgb1)[3])
    var min = Math.min(vector(rgb0)[3],vector(rgb1)[3])
    if(max == min){
        max = 1
        min = 1
    }
    if(min == 0)
        min = 1
    var top = Math.abs(max/min) - 1
    // console.log(top+" top")
    var D = Math.pow(2,top) * theta
    return D
    function vector(rgb){
        var u = (rgb[0]+rgb[1]+rgb[2])/3
        return [rgb[0] - u, rgb[1] - u, rgb[2] - u, u]
    }
}