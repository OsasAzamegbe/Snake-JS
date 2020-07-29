// functions
const dropLast = list => list.slice(0, list.length - 1)
const enqueue = state => move => validMove(move)(state) ? Object.assign(
    {},
    state,
    { moves: state.moves.concat([move]) }
) : state
const genRandPos = state => ({x: rand(state.cols), y: rand(state.rows)})
const mod = x => y => ((x % y) + y) % y // modulus to handle -ve no.s
const pointsEqual = p1 => p2 => p1.x == p2.x && p1.y == p2.y
const rand = max => Math.floor(Math.random() * max) // returns random no. btw 0, 1, ..., max - 1
const validMove = move => state => state.moves[0].x + move.x != 0 
const willEat = state => pointsEqual(nextHead(state))(state.apple)
const willCrash = state => state.snake.find(pointsEqual(nextHead(state)))


// directions
const NORTH = {x: 0, y: -1}
const SOUTH = {x: 0, y: 1}
const EAST = {x: 1, y: 0}
const WEST = {x: -1, y: 0}

// compute next values
const nextApple = state => willEat(state) ? genRandPos(state) : state.apple

const nextHead = state => state.snake.length === 0 ? {x: state.cols - 2, y: 6} : {
    x: mod(state.snake[0].x + state.moves[0].x)(state.cols),
    y: mod(state.snake[0].y + state.moves[0].y)(state.rows)
}

const nextMoves = state => state.moves.length > 1 ? state.moves.slice(1) : state.moves

const nextScore = state => willEat(state) ? (state.score >= 300 ? state.score + 50 : 
    (state.score >= 50 ? state.score + 15 : state.score + 5)) : state.score

const nextSnake = state => willEat(state) ? [nextHead(state)].concat(state.snake) : 
[nextHead(state)].concat(dropLast(state.snake))

// Initial state of game
const initState = () => ({
    rows: 15,
    cols: 20, // row-col ratio 3:4
    moves: [WEST],
    score: 0,
    snake: [],
    apple: {x: 6, y: 6},
})

// compute next game state
const nextState = state => willCrash(state) ? initState() : ({
    rows: state.rows,
    cols: state.cols,
    moves: nextMoves(state),
    score: nextScore(state),
    snake: nextSnake(state),
    apple: nextApple(state)
})

module.exports = { NORTH, EAST, WEST, SOUTH, initState, nextState, enqueue }