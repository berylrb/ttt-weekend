

/*-------------------------------- Constants --------------------------------*/


const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [2, 5, 8]
]



/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner,winningComboIdx




/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelector(".board")
const messageEl = document.querySelector("#message")
const resetBttn = document.querySelector('button')


/*----------------------------- Event Listeners -----------------------------*/

squareEls.addEventListener('click', handleClick)

resetBttn.addEventListener('click', resetBoard)


/*-------------------------------- Functions --------------------------------*/
init()

// initialize board --> set squares to null, set to player 1 turn, remove reset button, etc. 


function init() {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = null
  resetBttn.setAttribute('hidden', true)
  // document.getElementById('grass').classList.remove("sprite")
  document.getElementById('grass').innerHTML = '<img src="./assets/grass.png">'

  render()
}







// reset the board when reset button is pushed --> remove image elements from div children and initialize board


function resetBoard(evt) {
  let tempImgs = document.querySelectorAll('#temp')

  tempImgs.forEach(img => {
    img.remove()
  })
  location.reload() // unfortunately the only way to refresh the animation
  init()
}





function render(idx) {
  if (board.includes(1) || board.includes(-1)) {
    resetBttn.removeAttribute('hidden')
  }

  colorChange(idx)

  winnerMsg()
}





// change color of the div children on click and add the image to the child. possibly meaningless else statement at the end but yolo


function colorChange(idx) {
  let kids = squareEls.children

  for (i = 0; i < kids.length; i++) {

      if (board[i] === 1) {
        kids[i].style.backgroundColor = "#faae2b"
        kids[i].innerHTML = '<img id="temp" src="./assets/Untitled_Artwork.png">'

      } else if (board[i] === -1) {
        kids[i].style.backgroundColor = "#f06157"
        kids[i].innerHTML = '<img id="temp" src = "./assets/blue raindrop.png">'

      } else {
        kids[i].style.backgroundColor = "#f2f7f5"
    }
  }
}






// winner and game play messages --> change message content and color according to player turn and winner variable contents. Also starts confetti rain when someone wins.



function winnerMsg() {
  if (winner === null) {

    if (turn === 1) {
      messageEl.textContent = `Your turn, Player ${turn}!`
      messageEl.style.color = "#faae2b"

    } else if (turn === -1) {
      messageEl.textContent = `Your turn, Player 2!`
      messageEl.style.color = "#fa5246"
    }

  } else if (winner !== null && winner !== 'T') {
 
    if (winner === -1) {
      messageEl.textContent = 'Player 2 wins!'
      confetti.start(1500)
      document.getElementById('grass').innerHTML = '<img src="/assets/animated-flower.png"/>'
      if (window.matchMedia("(max-width: 768px)")){
        document.getElementById('grass').style.top = "-170px"
      } else {
      document.getElementById('grass').style.top = "-310px"
      document.getElementById('animationContainer').style.bottom = "500px"
      }
      

    }  else {
    messageEl.textContent = `Player ${winner} wins!`
    confetti.start(2500)
    document.getElementById('grass').innerHTML = '<img src="/assets/animated-flower.png"/>'
    if (window.matchMedia("(max-width: 768px)")){
      document.getElementById('grass').style.top = "-170px"
    } else {
    document.getElementById('grass').style.top = "-310px"
    document.getElementById('animationContainer').style.bottom = "500px"
    }
  } 

  } else if (winner === 'T') {

    messageEl.textContent = `Whoops! It's a tie  ¯|_(ツ)_|¯ `
    messageEl.style.color = "#475d5b"
}
}




// handles the click event 


function handleClick(evt) {
  let sqIdx = Number((evt.target.id).charAt(2))
  console.log(sqIdx, board)

  if (board[sqIdx] !== null) {
    messageEl.textContent = `Please choose an empty space <3`
    messageEl.style.color = "#00473e"
    return
  }

  if (winner !== null) {
    return
  }


  board[sqIdx] = turn
  turn = turn * -1


  getWinner()
  render(sqIdx)
}





function getWinner() {
  winningCombos.forEach((combo) => {
    let sum = []
    for (let i = 0; i < combo.length; i++) {
      sum.push(board[combo[i]])
      console.log(sum)
    }
    let sumReduce = Math.abs(sum.reduce((a, b) => a + b, 0))
    if (sumReduce === 3) {
      winner = sum[0]
      winningComboIdx = winningCombos.indexOf(combo)
  } 
  })
  if (winner === null && board.includes(null) === false) {
    winner = 'T'
  }

}


/*  problems to fix:





day / night mode depending on time



*/