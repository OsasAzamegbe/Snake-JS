// initialize game state
let state = initState()

// canvas variables
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// map position values to canvas size
const x = col => Math.round(col * canvas.width / state.cols)
const y = row => Math.round(row * canvas.height / state.rows)

// draw canvas
const draw = () => {
    //draw main canvas
    ctx.fillStyle = 'rgb(34, 29, 29)' // grey
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // draw snake
    ctx.fillStyle = 'rgb(0, 128, 0)' // green
    state.snake.map(pos => ctx.fillRect(x(pos.x), y(pos.y), x(1), y(1)))

    // draw apple
    ctx.fillStyle = 'rgb(255,0,0)' //red
    ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1))

    
    // draw crash
  if (state.snake.length == 0) {
    ctx.fillStyle = 'rgb(128,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

// const draw = () => {
//     // clear
//     ctx.fillStyle = '#232323'
//     ctx.fillRect(0, 0, canvas.width, canvas.height)
  
//     // draw snake
//     ctx.fillStyle = 'rgb(0,200,50)'
//     state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)))
  
//     // draw apples
//     ctx.fillStyle = 'rgb(255,50,0)'
//     ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1))
  
//     // add crash
//     if (state.snake.length == 0) {
//       ctx.fillStyle = 'rgb(255,0,0)'
//       ctx.fillRect(0, 0, canvas.width, canvas.height)
//     }
//   }

// update canvas every 100 ms
const step = t1 => t2 => {
    if (t2 - t1 > 100) {
        state = nextState(state)
        draw()
        window.requestAnimationFrame(step(t2))
    } else {
        window.requestAnimationFrame(step(t1))
    }   

}

// eventlisteners
// const eventListeners = ()=> {
window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'w' : case 'i': case 'ArrowUp': state = enqueue(state)(NORTH); break;
        case 'a': case 'j': case 'ArrowLeft': state = enqueue(state)(WEST); break;
        case 's': case 'k': case 'ArrowDown': state = enqueue(state)(SOUTH); break;
        case 'd': case 'l': case 'ArrowRight': state = enqueue(state)(EAST); break;
    }
})
// }

// // listen for DOM loaded
// window.addEventListener('DOMContentLoaded', () =>{
//     eventListeners()
// })

// load initial canvas and animationframe
draw();
window.requestAnimationFrame(step(0));