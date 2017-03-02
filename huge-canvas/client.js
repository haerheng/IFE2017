var hidden_c = document.querySelector('.canvas .hidden')
var display_c = document.querySelector('.canvas .display')
var display_ctx = display_c.getContext('2d')
var hidden_ctx = hidden_c.getContext('2d')
var image = new Image()
image.src = './img/background.jpeg'
image.onload = function(){
    console.log('onload')
    hidden_c.width = image.width * 3
    hidden_c.height = image.height * 3
    hidden_ctx.drawImage(image,0,0)
    hidden_ctx.drawImage(image,image.width,0)
    hidden_ctx.drawImage(image,image.width*2,0)
    hidden_ctx.drawImage(image,0,image.height)
    hidden_ctx.drawImage(image,image.width,image.height)
    hidden_ctx.drawImage(image,image.width*2,image.height)
    display_ctx.drawImage(image,0,0,image.width,image.height)
}


