// initialize game state
let state = initState();

// canvas variables
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// score
let score = document.getElementById('score')

// map position values to canvas size
const x = col => Math.round(col * canvas.width / state.cols)
const y = row => Math.round(row * canvas.height / state.rows)

// draw canvas
const draw = () => {
    //draw main canvas
    ctx.fillStyle = 'rgb(26, 26, 26)' //dark grey
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // draw snake
    ctx.fillStyle = 'rgb(30, 255, 30)' // bright green
    state.snake.forEach(pos => ctx.fillRect(x(pos.x), y(pos.y), x(1), y(1)))

    // draw apple
    ctx.fillStyle = 'rgb(255, 20, 20)' //bright red
    ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1))

    // update score
    score.innerText = state.score;
    
    // draw crash
  if (state.snake.length == 0) {
    ctx.fillStyle = 'rgb(128,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}


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

//screen swipe variables
let xStart = null;
let yStart = null;
let xEnd = null;
let yEnd = null;

//screen swipe functions
const swipeHandler = () => {
    const xDiff = xStart - xEnd;
    const yDiff = yStart - yEnd;

    if(Math.abs(xDiff) > Math.abs(yDiff)){
        if(xDiff > 0){
            state = enqueue(state)(WEST);
        }else{
            state = enqueue(state)(EAST);
        }
    }else{
        if(yDiff > 0){
            state = enqueue(state)(NORTH);
        }else{
            state = enqueue(state)(SOUTH);
        }
    }
};

// eventlisteners
const eventListeners = ()=> {
    const body = window.document.body
    window.addEventListener('keydown', e => {
        switch(e.key) {
            case 'w' : case 'i': case 'ArrowUp': state = enqueue(state)(NORTH); break;
            case 'a': case 'j': case 'ArrowLeft': state = enqueue(state)(WEST); break;
            case 's': case 'k': case 'ArrowDown': state = enqueue(state)(SOUTH); break;
            case 'd': case 'l': case 'ArrowRight': state = enqueue(state)(EAST); break;
        }
    })

    body.addEventListener('touchstart', (e) => {
        xStart = e.changedTouches[0].screenX;
        yStart = e.changedTouches[0].screenY;
    }, false);

    body.addEventListener('touchend', (e) => {
        xEnd = e.changedTouches[0].screenX;
        yEnd = e.changedTouches[0].screenY;
        swipeHandler()
    }, false);
}

// listen for DOM loaded
window.addEventListener('DOMContentLoaded', () =>{
    eventListeners()
    // load initial canvas and animationframe
    draw();
    window.requestAnimationFrame(step(0));
})


