class Game {
  constructor() {
    this.container = document.getElementById("game-container");
    this.puntosElement = document.getElementById("puntos");
    this.hada = null;
    this.murcielago = [];
    this.puntuacion = 0;

    this.crearEscenario();
    this.agregarEventos();
  }

  crearEscenario() {
    this.hada = new Hada();
    this.container.appendChild(this.hada.element);

    for (let i = 0; i < 10; i++) {
      const murcielago = new Murcielago();
      this.murcielago.push(murcielago);
      this.container.appendChild(murcielago.element);
    }
  }

  agregarEventos() {
    window.addEventListener("keydown", (e) => this.hada.mover(e));
    this.checkColisiones();
  }

  checkColisiones() {
    setInterval(() => {
      this.murcielago.forEach((murcielago, index) => {
        if (this.hada.colisionaCon(murcielago)) {
          this.container.removeChild(murcielago.element);
          this.murcielago.splice(index, 1);
          this.actualizarPuntuacion(10);
        }
      });
    }, 100);
  }

  actualizarPuntuacion(puntos) {
    this.puntuacion += puntos;
    this.puntosElement.textContent = `Puntos: ${this.puntuacion}`;
  }
}

class Hada {
  constructor() {
    this.x = 50;
    this.y = 375; 
    this.width = 200;
    this.height = 200;
    this.velocidad = 10;
    this.saltando = false;

 

    this.element = document.createElement("img");
    this.element.src = "imagenes/hada.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.position = "absolute";
    this.element.classList.add("hada");

    this.actualizarPosicion(); 
  }

  mover(evento) {
    if (evento.key === "ArrowRight") {
      this.x += this.velocidad;
    } else if (evento.key === "ArrowLeft") {
      this.x -= this.velocidad;
    } else if (evento.key === "ArrowUp" && !this.saltando) {
      this.saltar();
    }

    this.actualizarPosicion();
  }

  saltar() {
    this.saltando = true;
    let alturaMaxima = this.y - 350;

    const salto = setInterval(() => {
      if (this.y > alturaMaxima) {
        this.y -= 20;
      } else {
        clearInterval(salto);
        this.caer();
      }
      this.actualizarPosicion();
    }, 20);
  }

  caer() {
    const gravedad = setInterval(() => {
      if (this.y < 370) {
        this.y += 10;
      } else {
        clearInterval(gravedad);
        this.saltando = false;
      }
      this.actualizarPosicion();
    }, 20);
  }

  actualizarPosicion() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  colisionaCon(objeto) {
    return (
      this.x < objeto.x + objeto.width &&
      this.x + this.width > objeto.x &&
      this.y < objeto.y + objeto.height &&
      this.y + this.height > objeto.y
    );
  }
}

class Murcielago {
  constructor() {
    this.x = Math.random() * 800 + 100; /* 500 */
    this.y = Math.random() * 180 + 100; /* 500 */
    this.width = 120;
    this.height = 120;
    this.transformado = false
    

    this.element = document.createElement("img");
    this.element.src = "imagenes/murcielago.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.position = "absolute";
    this.element.classList.add("murcielago");

    this.actualizarPosicion();
  }


  seleccionarColor() {
    const colores = [
      { nombre: "roja", src: "mariposa_roja.png", puntos: 5 },
      { nombre: "amarilla", src: "mariposa_amarilla.png", puntos: 10 },
      { nombre: "azul", src: "mariposa_azul.png", puntos: 15 },
      { nombre: "rosa", src: "mariposa_rosa.png", puntos: 20 }
    ];
    const indice = Math.floor(Math.random() * colores.length);
    return colores[indice];
  }

  transformar() {
    if (!this.transformado) {
      this.transformado = true;
      this.element.src = this.color.src;
      this.element.classList.add("transformacion");
      setTimeout(() => {
        this.element.classList.remove("transformacion");
      }, 400);
    }
  }

  actualizarPosicion() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}

const juego = new Game();