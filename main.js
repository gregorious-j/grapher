

let offsetX = 400;
let offsetY = 400;
let mapFactor = 1;
var zoom, showSolutions, zoomReset, a, b, c, xydisplay;


function setup() {
    createCanvas(800, 800);
    
    
    background(255);
    frameRate(60);
    setupInputs1();
    setupInputs2();
    

}


function draw() {
    
    if (zoom.value() == 0) {
        zoom.value(1);
    }
    
    background(250);
    
    strokeWeight(1);
    fill('blue');
    textFont('Helvetica');
    textSize(20);
    stroke('blue');
    
    
    text('equation y = ' + a.value() + 'x' + '^2' + ' + ' +  b.value()  + 'x ' + '+ ' + c.value(), width-260, 30);
    //console.log(zoom.value());    
    if(graph2.checked() == true) {
        stroke('red');
        fill('red');
        text('equation y = ' + a2.value() + 'x' + '^2' + ' + ' +  b2.value()  + 'x ' + '+ ' + c2.value(), width-260, 55);
    }
    
    noFill();
    translate(offsetX, offsetY);
    drawGrid();
    drawGraphs();
    coolMouse();
    
    
    zoomP.html('Scale: ' + zoom.value());
    //zoomReset.mouseIsPressed(zoom.value(100));
    

    
}
function doubleClicked() {
    if (mouseX <= width && mouseY >= 0) {
    offsetX = ((400 - mouseX) + offsetX);
    offsetY = ((400 - mouseY) + offsetY);
    }
}

function drawGraphs() {
    
    stroke('blue');
    strokeWeight(2);
    beginShape();
    for (x = -width; x < width; x++) {
        noFill();
        vertex(x, Calc(x, a.value()/zoom.value(), b.value(), c.value()*zoom.value()));
        //console.log(Calc(x));
    }
    endShape();
    if (graph2.checked() == true) {
        stroke('red');
        beginShape();
        for (x = -width; x < width; x++) {
            noFill();
            vertex(x, Calc(x, a2.value()/zoom.value(), b2.value(), c2.value()*zoom.value()));
            
           
            //console.log(Calc(x));
        }
        endShape();
        var zeroY2 = Calc(0, a2.value()/zoom.value(), b2.value(), c2.value()*zoom.value());
            stroke(0, 255, 10);
            strokeWeight(5);
            point(0, zeroY2);
            strokeWeight(1);
            stroke(100);
            fill(100);
            text('y-int ' + roundNum(-zeroY2/zoom.value(), 3), 5, zeroY2-10);
            if (showSolutions.checked() == true) {
                var solution2X1 = QuadFormPos(a2.value()/zoom.value(), b2.value(), -c2.value()*zoom.value());
                //console.log(QuadFormPos(a.value(), b.value(), c.value()));
                strokeWeight(5);
                stroke(0);
                point(-solution2X1, 0);
                strokeWeight(1);
                stroke(100);
                fill(100);
                
                text('Solution: ' + roundNum(-solution2X1/zoom.value(), 3), -solution2X1-80, -10);
            
                var solution2X2 = QuadFormNeg(a2.value()/zoom.value(), b2.value(), -c2.value()*zoom.value());
                strokeWeight(5);
                stroke(255, 100, 0);
                point(-solution2X2, 0);
                strokeWeight(1);
                stroke(100);
                fill(100);
                //console.log(solution1X2);
                text('Solution: ' + roundNum(-solution2X2/zoom.value(), 3), -solution2X2-80, -10);
                }

    }
    var zeroY = Calc(0, a.value()/zoom.value(), b.value(), c.value()*zoom.value());
    
    strokeWeight(5);
    stroke(0, 255, 10);
    point(0, zeroY);
    strokeWeight(1);
    stroke(100);
    fill(100);
    
    text('y-int ' + roundNum(-zeroY/zoom.value(), 3), 5, zeroY-10);
    if (showSolutions.checked() == true) {
    var solution1X1 = QuadFormPos(a.value(), b.value(), c.value());
    //console.log(QuadFormPos(a.value(), b.value(), c.value()));
    strokeWeight(5);
    stroke(255, 0, 255);
    point(solution1X1*zoom.value(), 0);
    strokeWeight(1);
    staticDisplay(0, 255, 0, 255, 'Solution: (' + roundNum(solution1X1,2) + ', ' + '0)');

    var solution1X2 = QuadFormNeg(a.value(), b.value(), c.value());
    strokeWeight(5);
    stroke(255, 100, 0);
    point(solution1X2*zoom.value(), 0);
    strokeWeight(1);
    staticDisplay(-30, 255, 100, 0, 'Solution: (' + roundNum(solution1X2,2) + ', ' + '0)');
    }
}

function QuadFormPos(a, b, c) {
    return((-b + sqrt(b*b - 4*a*c))/(2*a));
    
}
function QuadFormNeg(a, b, c) {
    return((-b - sqrt(b*b - 4*a*c))/(2*a));
    
}

function staticDisplay(yoffset, r, g, b, textb) {
    fill(r, g, b);
    //console.log(solution1X2);
    ellipse(675-offsetX, 695-offsetY+yoffset, 15);
    rectMode(CENTER);
    rect(825-offsetX, 694.5-offsetY+yoffset, 300, 15);
    fill(0);
    stroke(0);
    text(textb, 675-offsetX, 700-offsetY+yoffset);
}


//Creates HTML Elements

function setupInputs1() {
    zoom = createSlider(0, 400, 20, 2);
    zoom.position(20,80);
    zoom.style('width', '200px');
    
    zoomP = createP('');
    zoomP.position(25, 85);
    
    zoomReset = createButton('Reset');
    zoomReset.position(230, 80);
    //zoomReset.mousePressed(resetZoom());

    showSolutions = createCheckbox('Show solutions', false);
    showSolutions.position(1180-200, 100);
    
    
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

    xydisplay = createCheckbox('Show coordinates next to pointer', false);
    xydisplay.position(1175-200, 440+400);
  
}

function setupInputs2() {

    graph2 = createCheckbox('Graph 2nd function', false);
    graph2.position(1175-200, 300);

        var off2 = 350;
        atext2 = createP('a:');
        atext2.position(1180-200, off2+25);
    
        btext2 = createP('b (slope if a=0):');
        btext2.position(1180-291, off2+5);
    
        ctext2 = createP('c:');
        ctext2.position(1180-200, off2-15);
    
        a2 = createInput('0', 'number');
        a2.position(1200-200, off2+40);
        a2.style('100px');
    
        b2 = createInput('0', 'number');
        b2.position(1200-200, off2+20);
    
        c2 = createInput('0', 'number');
        c2.position(1200-200, off2);
    
   


} 



function mouseWheel(event) {
    //console.log(event.delta);
    
    zoom.value(-event.delta/2 + zoom.value());

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
    var textX = roundNum((mouseX - offsetX)/zoom.value(), 1);
    var textY = roundNum((mouseY - offsetY)/zoom.value(), 1);

    fill(0);
    if (xydisplay.checked() == true) {
        strokeWeight(1);
        stroke(0);
        cursor(CROSS);
        translate(-offsetX, -offsetY);
        text('('+ textX + ', ' + -textY + ')', mouseX-80, mouseY-20);

    } else {
        cursor();
        translate(-offsetX, -offsetY);
        strokeWeight(1);
        stroke(0);
        text('('+ textX + ', ' + -textY + ')', 20, 80);
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
  

