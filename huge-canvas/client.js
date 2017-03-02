var hidden_c = document.querySelector('.canvas .hidden')
var display_c = document.querySelector('.canvas .display')
var display_ctx = display_c.getContext('2d')
var hidden_ctx = hidden_c.getContext('2d')
var image = new Image()
image.src = './img/background.jpeg'
image.onload = function(){
    console.log('onload')
    hidden_ctx.drawImage(image,0,0)
    display_ctx.drawImage(image,0,0,image.width,image.height)
    // display_ctx.fillRect(0,0,100,100)
}


