var displayBox = [500,10,50,50]
var colorBandage = [420,0,25,400]
var rangeBox = [0,0,400,400]
var g_color = [255,255,255,255]
var g_hsl = [0,0,0]
var range = [255,255,255,255]
var g_bandage_complete = false
var g_range_complete = false
//文本控件初始化
var t = document.querySelector('.color-picker .text')
var rgb = t.querySelectorAll('.rgb>input')
var hsl = t.querySelectorAll('.hsl>input')
var css = t.querySelector('.css>input')
t.querySelectorAll('input').forEach((e)=>{
    e.addEventListener('change',(e)=>{
        console.log(e.target.className)
        var value = e.target.value
        switch(e.target.className){
            case 'r':
                g_color[0] = value
                // updateText(g_color)
                break
            case 'g':
                g_color[1] = value
                // updateText(g_color)
                break
            case 'b':
                g_color[2] = value
                // updateText(g_color)
                break
            case 'h':
                g_hsl[0] = value
                g_color = hslToRgb(g_hsl)
                
                break
            case 's':
                g_hsl[1] = value
                g_color = hslToRgb(g_hsl)
                break
            case 'l':
                g_hsl[2] = value
                g_color = hslToRgb(g_hsl)
                break
            case 'c':
                //g_color = rgb
                break
            default:
                break
        }
        updateText(g_color)
        updateColor(g_color)
    })
})
init()
updateText(g_color)
function init(){    
    var c = document.querySelector('.color-picker .color');
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
    updateColor = (()=>{
        var ctx00 = ctx
        return function(rgba){
            drawDisplayBox(ctx00,rgba)
        }
    })()
    c.addEventListener('mousemove',function(e){
        var pos = getMousePosition(e)    
        var color
        if(inRange(colorBandage,pos,0)){
            color = ctx.getImageData(pos.x,pos.y,1,1).data
            drawDisplayBox(ctx,color)
            updateText(color)
            if(g_bandage_complete){
                return
            }
            drawRangeBox(ctx,color)
            drawLine(ctx,pos)
        }else if(inRange(rangeBox,pos,2)){
            if(g_range_complete)
                return
            color = ctx.getImageData(pos.x,pos.y,1,1).data
            drawDisplayBox(ctx,color)
            updateText(color)
        }else{
            
        }
    })
    c.addEventListener('click',function(e){
        var pos = getMousePosition(e)
        var color = ctx.getImageData(pos.x,pos.y,1,1).data
        if(inRange(colorBandage,pos,0)){
            g_color = color
            g_bandage_complete = true
            drawRangeBox(ctx,color)
            drawLine(ctx,pos)
        }else if(inRange(rangeBox,pos,2)){
            g_color = color
            g_range_complete = true
            drawDisplayBox(ctx,color)
            drawPoint(ctx,pos)
            console.log(color)
        }
        updateText(color)

    })

    drawRangeBox(ctx,[255,255,255,255])
    drawDisplayBox(ctx,[255,255,255,255])
}

var updateColor
function updateText(rgba){    
    rgb.forEach((e,i)=>{e.value = rgba[i]})
    g_hsl = rgbToHsl(rgba)
    hsl.forEach((e,i)=>{e.value = g_hsl[i].toFixed(2)})
    css.value = '#'+rgba[0].toString(16)+rgba[1].toString(16)+rgba[2].toString(16)
}
function drawLine(ctx,pos){
    ctx.save()
    ctx.beginPath() 
    ctx.clearRect(446,0,10,400)  
    ctx.clearRect(409,0,10,400) 
    ctx.rect(447,pos.y-2,8,1)
    ctx.rect(410,pos.y-2,8,1)
    ctx.strokeStyle="#000"
    ctx.lineWidth=1
    ctx.stroke()
    ctx.closePath()
    ctx.restore()    
}
function drawPoint(ctx,pos){
    ctx.save()
    ctx.beginPath()
    ctx.arc(pos.x,pos.y,10,0,2*Math.PI,0)
    ctx.stroke()
    // ctx.strokeStyle = 'rgba(0,0,0,0)'
    // ctx.stroke()
    ctx.closePath()
    ctx.restore()
}
function drawRangeBox(ctx,rgba){
    ctx.save()
    ctx.beginPath()
    var m_linearGradient0 = ctx.createLinearGradient(30,30,30,360);    
    m_linearGradient0.addColorStop(0,'#FFFFFF')
    m_linearGradient0.addColorStop(1,'rgba('+rgba.join(',')+')')
    ctx.rect.apply(ctx,rangeBox)
    ctx.strokeStyle="#cccccc"
    ctx.lineWidth=2
    ctx.stroke()
    ctx.fillStyle = m_linearGradient0
    ctx.fill()
    var m_linearGradient1 = ctx.createLinearGradient(30,30,390,30)
    m_linearGradient1.addColorStop(0,'rgba(0,0,0,0)')
    m_linearGradient1.addColorStop(1,'rgba(0,0,0,1)')
    ctx.fillStyle = m_linearGradient1
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
}
function inRange(range,pos,stroke){
    if(pos.x>=range[0] + range[2] - stroke*2 || pos.x < range[0]+stroke || pos.y > range[1] + range[3] - stroke*2 || pos.y < range[1] + stroke)
        return false
    return true
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
function rgbToHsl(rgba){
    var r = rgba[0]/255, g = rgba[1]/255, b = rgba[2]/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}
function hslToRgb(hsl){
    var r, g, b;
    var h = hsl[0], s = hsl[1], l = hsl[2]
    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function hexToRgb(hex){
    
}