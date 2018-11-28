var game = new Phaser.Game(530, 530, Phaser.CANVAS, 'shaker', {preload: preload, create: create, update: update, render: render}, true);


function preload() {
    game.load.spritesheet('ship', 'content/img/fin/christmas/copo1.png', 32, 32);
    game.load.image('ball1', 'content/img/fin/christmas/copo1.png');
    game.load.image('ball2', 'content/img/fin/christmas/copo2.png');
    game.load.image('ball3', 'content/img/fin/christmas/copo3.png');
    game.load.image('ball4', 'content/img/fin/christmas/copo4.png');
}
var ship;
var cursors;
var customBounds;

var gravity = 500;
function create() {

    game.stage.backgroundColor = 'rgba(255,0,0,0.0)';

    //  The bounds of our physics simulation
    var bounds = new Phaser.Rectangle(0, 0, 530, 530);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = gravity;
    game.physics.p2.restitution = 0.50;
    //  Some balls to collide with
    balls = game.add.physicsGroup(Phaser.Physics.P2JS);
    for (var i = 0; i < 250; i++)
    {
        var random = Math.floor((Math.random() * 4) + 1);
        
        var ball = balls.create(Math.floor((Math.random() * 500) + 1), Math.floor((Math.random() * 500) + 1), 'ball'+random);
        ball.body.setCircle(8);
    }
    ship = game.add.sprite(151, 149, 'ship');
    ship.scale.set(0.5);
    //  Create our physics body. A circle assigned the playerCollisionGroup
    game.physics.p2.enable(ship);
    ship.body.setCircle(7);
    //  Create a new custom sized bounds, within the world bounds
    customBounds = {left: null, right: null, top: null, bottom: null};
    createPreviewBounds(bounds.x, bounds.y, bounds.width, bounds.height);
    cursors = game.input.keyboard.createCursorKeys();


}

function createPreviewBounds(x, y, w, h) {

    var sim = game.physics.p2;

    //  If you want to use your own collision group then set it here and un-comment the lines below
    var mask = sim.boundsCollisionGroup.mask;

    customBounds.left = new p2.Body({mass: 0, position: [sim.pxmi(x), sim.pxmi(y)], angle: 1.5707963267948966});
    customBounds.left.addShape(new p2.Plane());
    // customBounds.left.shapes[0].collisionGroup = mask;

    customBounds.right = new p2.Body({mass: 0, position: [sim.pxmi(x + w), sim.pxmi(y)], angle: -1.5707963267948966});
    customBounds.right.addShape(new p2.Plane());
    // customBounds.right.shapes[0].collisionGroup = mask;

    customBounds.top = new p2.Body({mass: 0, position: [sim.pxmi(x), sim.pxmi(y)], angle: -3.141592653589793});
    customBounds.top.addShape(new p2.Plane());
    // customBounds.top.shapes[0].collisionGroup = mask;

    customBounds.bottom = new p2.Body({mass: 0, position: [sim.pxmi(x), sim.pxmi(y + h)]});
    customBounds.bottom.addShape(new p2.Plane());
    // customBounds.bottom.shapes[0].collisionGroup = mask;

    sim.world.addBody(customBounds.left);
    sim.world.addBody(customBounds.right);
    sim.world.addBody(customBounds.top);
    sim.world.addBody(customBounds.bottom);
    game.stage.backgroundColor = 'rgba(255,0,0,0.0)';
}


function update() {

    if (game.input.x > 265) {
        game.physics.p2.gravity.x = gravity;
    } else if (game.input.x < 265) {
        game.physics.p2.gravity.x = -gravity;
    } else {
        game.physics.p2.gravity.x = 0;
    }
    if (game.input.y > 265) {
        game.physics.p2.gravity.y = gravity;
    } else if (game.input.y < 265) {
        game.physics.p2.gravity.y = -gravity;
    } else {
        game.physics.p2.gravity.y = 0;
    }

}


function render() {
}
