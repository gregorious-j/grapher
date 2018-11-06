

let Tx = 400;
let Ty = 400;
let mapFactor = 1;
var zoom, a, b, c, xydisplay;



function setup() {
    createCanvas(800, 800);
    
    
    background(255);
    frameRate(60);
    setupInputs1();
    setupInputs2();
    

}


function draw() {
    
    background(255);
    strokeWeight(1);
    fill(0);
    textFont('Helvetica');
    textSize(20);
    stroke('blue');
    
    
    text('equation y = ' + a.value() + 'x' + '^2' + ' + ' +  b.value()  + 'x ' + '+ ' + c.value(), width-250, 30);
    //console.log(zoom.value());    
    
    noFill();
    translate(Tx, Ty);
    drawGrid();
    drawGraphs();
    coolMouse();

    
}

function drawGraphs() {
    stroke(0);
    strokeWeight(2);
    beginShape();
    for (x = -width; x < width; x++) {
        noFill();
        vertex(x, Calc(x, a.value()/zoom.value(), b.value(), c.value()*zoom.value()));
        //console.log(Calc(x));
    }
    endShape();
    if (graph2.checked() == true) {
        beginShape();
        for (x = -width; x < width; x++) {
            noFill();
            vertex(x, Calc(x, a2.value()/zoom.value(), b2.value(), c2.value()*zoom.value()));
            //console.log(Calc(x));
        }
        endShape();
    }
}


//Creates HTML Elements

function setupInputs1() {
    zoom = createSlider(1, 100, 2);
    zoom.position(20,80);
    zoom.style('width', '200px');
    
    var off = 200;

    atext = createP('a:');
    atext.position(1180-200, 385-off);

    btext = createP('b (slope if a=0):');
    btext.position(1180-291, 365-off);

    ctext = createP('c:');
    ctext.position(1180-200, 345-off);

    a = createInput('0', 'number');
    a.position(1200-200, 400-off);
    a.style('100px');

    b = createInput('0', 'number');
    b.position(1200-200, 380-off);

    c = createInput('0', 'number');
    c.position(1200-200, 360-off);


    //mode = createCheckbox('Quadratic', false);
    //mode.position(1200, 420);

    xydisplay = createCheckbox('Show coordinates next to pointer', true);
    xydisplay.position(1175-200, 440+400);
  
}

function setupInputs2() {

    var off2 = 350;
    atext2 = createP('a:');
    atext2.position(1180-200, off2+40);

    btext2 = createP('b (slope if a=0):');
    btext2.position(1180-291, off2+20);

    ctext2 = createP('c:');
    ctext2.position(1180-200, off2);

    a2 = createInput('0', 'number');
    a2.position(1200-200, off2+40);
    a2.style('100px');

    b2 = createInput('0', 'number');
    b2.position(1200-200, off2+20);

    c2 = createInput('0', 'number');
    c2.position(1200-200, off2);

    graph2 = createCheckbox('Graph 2nd function', false);
    graph2.position(1175-200, 440+100);


} 

//Calculates equation

function Calc(x, av, bv, cv) {
   // av = a.value()/zoom.value();
   // bv = b.value();
   // cv = c.value()*zoom.value();
    
    return(-(av*x*x) - bv*x - cv);
        
}

//Cross and (x, y) coordinate

function coolMouse() {
    var textX = roundNum((mouseX - Tx)/zoom.value(), 1);
    var textY = roundNum((mouseY - Ty)/zoom.value(), 1);

    fill('red');
    if (xydisplay.checked() == true) {
        strokeWeight(1);
        stroke('red');
        cursor(CROSS);
        translate(-Tx, -Ty);
        text('('+ textX + ', ' + -textY + ')', mouseX-80, mouseY-20);

    } else {
        cursor();
        translate(-Tx, -Ty);
        strokeWeight(1);
        stroke('red');
        text('('+ textX + ', ' + -textY + ')', 20, 40);
    }
    
    //if (mouseIsClicked) {
    //point(mouseX, mouseY);
    //}

}






//Draws the grid






function drawGrid() {
    fill(0);
  
    textSize(15);
    for (var x=-width; x < width; x+=100) {
        stroke('grey');
        line(x, -height, x, height);
        strokeWeight(.5);
		text(roundNum(x/zoom.value(), 2), x+1, 12);
	}
	for (var y=-height; y < height; y+=100) {
        stroke('grey');
        line(-width, y, width, y);
        strokeWeight(.5);
		text(roundNum(-y/zoom.value(), 2), 1, y+12);
    }
    strokeWeight(6);
  	stroke('blue');
    point(0,0);
   
}

function roundNum(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }
  

