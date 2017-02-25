var displayBox = [500,10,50,50]
var colorBandage = [450,10,25,400]
var rangeBox = [0,0,400,400]
var g_color = [255,255,255,255]
var range = [255,255,255,255]
var g_bandage_complete = false
var g_range_complete = false
obj = {num:0}
init()
function init(){
    var c = document.getElementById('color-picker');
    var ctx = c.getContext('2d');
    var linearGradient = ctx.createLinearGradient(0,0,0,380);    
    linearGradient.addColorStop(1.0/6*0,'#FF0000')
    linearGradient.addColorStop(1.0/6*1,'#FFFF00')
    linearGradient.addColorStop(1.0/6*2,'#00FF00')
    linearGradient.addColorStop(1.0/6*3,'#00FFFF')
    linearGradient.addColorStop(1.0/6*4,'#0000FF')
    linearGradient.addColorStop(1.0/6*5,'#FF00FF')
    linearGradient.addColorStop(1.0/6*6,'#FF0000')
    ctx.fillStyle = linearGradient;
    ctx.fillRect.apply(ctx,colorBandage)

    c.addEventListener('mousemove',function(e){
        var pos = getMousePosition(e)    
        var color
        if(inRange(colorBandage,pos,0)){
            // console.log(pos)
            color = ctx.getImageData(pos.x,pos.y,1,1).data
            drawDisplayBox(ctx,color)
            if(g_bandage_complete){
                return
            }
            drawRangeBox(ctx,color)
        }else if(inRange(rangeBox,pos,2)){
            // console.log(pos)
            if(g_range_complete)
                return
            color = ctx.getImageData(pos.x,pos.y,1,1).data
            drawDisplayBox(ctx,color)
        }else{
            g_bandage_complete = false
            g_range_complete = false
        }
    })
    c.addEventListener('click',function(e){
        var pos = getMousePosition(e)
        var color = ctx.getImageData(pos.x,pos.y,1,1).data
        if(inRange(colorBandage,pos,0)){
            g_color = color
            g_bandage_complete = true
        }else if(inRange(rangeBox,pos,2)){
            g_color = color
            g_range_complete = true
            console.log(color)
        }
    })
    drawRangeBox(ctx,[255,255,255,255])
    drawDisplayBox(ctx,[255,255,255,255],obj)
}
function drawRangeBox(ctx,rgba){
    // console.log(rgba)
    ctx.save()
    ctx.beginPath()
    var m_linearGradient = ctx.createLinearGradient(30,30,360,360);    
    m_linearGradient.addColorStop(0,'#FFFFFF')
    m_linearGradient.addColorStop(0.5,'rgba('+rgba.join(',')+')')
    m_linearGradient.addColorStop(1,'#000000')
    
    ctx.rect.apply(ctx,rangeBox)
    ctx.strokeStyle="#cccccc"
    ctx.lineWidth=2
    ctx.stroke()
    ctx.fillStyle = m_linearGradient//'rgba('+rgba.join(',')+')'
    ctx.fill()
    ctx.closePath()
    ctx.restore()    
}
function drawDisplayBox(ctx,rgba){
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle="#cccccc"
    ctx.lineWidth=2
    ctx.strokeRect.apply(ctx,displayBox)
    ctx.rect.apply(ctx,displayBox)    
    ctx.fillStyle = 'rgba('+rgba.join(',')+')'
    ctx.fill()
    ctx.closePath()
    ctx.restore()    
    obj.num++
}
function inRange(range,pos,stroke){
    // console.log(range)
    if(pos.x>=range[0] + range[2] - stroke*2 || pos.x < range[0]+stroke || pos.y > range[1] + range[3] - stroke*2 || pos.y < range[1] + stroke)
        return false
    return true
}
function getMousePosition(e){
  var x, y
  if (e.layerX || e.layerX == 0) {
    x = e.layerX
    y = e.layerY
  } else if (e.offsetX || e.offsetX == 0) { // Opera
    x = e.offsetX
    y = e.offsetY
  }
  return {x:x,y:y}
}