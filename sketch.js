let nodes = [];
let num, r = 100;
let insertDistance, separationDistance;
let margin = 10, maxPoints;
let quadtree, boundary, capacity = 10;

function setup() {
  createCanvas(windowWidth-1, windowHeight-1).mousePressed(startAnimation);
  startAnimation();
}

function startAnimation() {
  r = ((width+height)/2)/8;
  nodes = [];
  rand = int(random(9, 13));
  //print("random:"+ rand)
  num = rand;
  insertDistance = int(random(rand, rand + 2));
  //print("insertDistance:" + insertDistance)
  separationDistance = insertDistance * 2;
  maxPoints = 1700;

  // Imposta il boundary in modo che sia uguale alla grandezza del canvas
  boundary = new Rect(0, 0, width, height);  // Adatta il boundary alle dimensioni del canvas
  quadtree = new QuadTree(boundary, capacity);

  // Posiziona i nodi al centro del canvas, puoi regolare la distanza con 'r'
  for (let i = 0; i < num; i++) {
    let angle = TWO_PI / num * i;
    let x = width / 2 + r * cos(angle);
    let y = height / 2 + r * sin(angle);
    nodes[i] = new Node(x, y);
  }
  loop();
}

function draw() {
  clear();
  quadtree.clearQuadtree();

  for (let i = 0; i < nodes.length; i++) {
    let p = new Point(nodes[i].position.x, nodes[i].position.y, nodes[i]);
    quadtree.insert(p);
  }

  for (let i = 0; i < nodes.length; i++) {
    let n1 = nodes[i].position;
    let n2 = nodes[(i + 1) % nodes.length].position;
    stroke(40); 
    strokeWeight(1.5);
    line(n1.x, n1.y, n2.x, n2.y);
  }

  for (let i = 0; i < nodes.length; i++) {
    let range = new Circle(nodes[i].position.x, nodes[i].position.y, separationDistance);
    let neighbors = [];
    quadtree.query(range, neighbors);
    nodes[i].update(nodes, neighbors);
  }

  if (nodes.length < maxPoints) {
    insert();
  } else {
    noLoop();
  }
}

function insert() {
  for (let i = 0; i < nodes.length; i++) {
    let n1 = nodes[i].position;
    let n2 = nodes[(i + 1) % nodes.length].position;
    let diff = p5.Vector.sub(n2, n1);
    if (diff.mag() > insertDistance) {
      diff.mult(0.5);
      let insertIndex = (i + 1) % nodes.length;
      nodes.splice(insertIndex, 0, new Node(n1.x + diff.x, n1.y + diff.y));
    }
  }
}


