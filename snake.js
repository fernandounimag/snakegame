const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const box = 32;

const ground = new Image();
ground.src = "img/ground.jpg";

const foodImg = new Image();
foodImg.src = "img/food.png";

// crear la snake

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// crear la comida

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// el puntaje

let score = 0;

// mover la culebra

let d;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {d = "LEFT";
    } else if (key == 38 && d != "DOWN") {d = "UP";
    } else if (key == 39 && d != "LEFT") {d = "RIGHT";
    } else if (key == 40 && d != "UP") {d = "DOWN";
    }
}

// funcion de choque

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Dibuja todo en el canvas

function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "Purple" : "#d108d1";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // guardamos la antigua posicion de la cabeza

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // que direccion toma

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // si la culebra come
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        // nosotros no removemos la cola
    } else {
        // quitamos la cola
        snake.pop();
    }

    // agregamos la nueva cabeza

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // cuando el juego termina

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
    }
    
    snake.unshift(newHead);
    ctx.fillStyle = "white";
    ctx.font = "45px helvetica";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// llama a la funcion de dibujo

let game = setInterval(draw, 150);