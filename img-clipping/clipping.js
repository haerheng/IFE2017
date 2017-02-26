
var g_hidden_canvas
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

var c = document.querySelector('.img-clipping')
var ctx = c.getContext('2d')
var filepicker = document.querySelector('#file-picker')
filepicker.addEventListener('change',()=>{
    LoadImage(filepicker.files[0],ctx)
})


function display(src_c,dst_ctx,mapinfo){
    dst_ctx.save()
    dst_ctx.scale(mapinfo.scale.x,mapinfo.scale.y)
    dst_ctx.rotate(mapinfo.rotate.angle)
    dst_ctx.translate(mapinfo.translate.x,mapinfo.translate.y)
    dst_ctx.drawImage(src_c,0,0)
    dst_ctx.restore()
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
    }
}
