const app = new PIXI.Application(
    {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x473939,
        resizeTo: window
    });

document.getElementById("app").appendChild(app.view);

// Audio
var ctx = new AudioContext();
var audio = document.querySelector('#audio');
var audioSrc = ctx.createMediaElementSource(audio);
var analyser = ctx.createAnalyser();
analyser.fftSize = 1024;

audioSrc.connect(analyser);
audioSrc.connect(ctx.destination);
var fqData = new Uint8Array(analyser.frequencyBinCount);


// Determine the center of screen
var halfX = app.screen.width / 2;
var halfY = app.screen.height / 2;

// Sprite Loading
// City Sprite
const city = PIXI.Sprite.from('assets/Moon-City-No-Lights.png');
city.anchor.set(0.5); // center the sprite's anchor point
city.x = halfX;
city.y = halfY;

// Spruces Sprite
const spruces = PIXI.Sprite.from('assets/Spruces.png');
spruces.anchor.set(0.5);
spruces.x = halfX;
spruces.y = halfY;

// City Ligths Sprite
const cityLights1 = PIXI.Sprite.from('assets/City-Lights[1].png');
cityLights1.anchor.set(0.5);
cityLights1.x = halfX;
cityLights1.y = halfY;

const cityLights2 = PIXI.Sprite.from('assets/City-Lights[2].png');
cityLights2.anchor.set(0.5);
cityLights2.x = halfX;
cityLights2.y = halfY;

const cityLights3 = PIXI.Sprite.from('assets/City-Lights[3].png');
cityLights3.anchor.set(0.5);
cityLights3.x = halfX;
cityLights3.y = halfY;

const cityLights4 = PIXI.Sprite.from('assets/City-Lights[4].png');
cityLights4.anchor.set(0.5);
cityLights4.x = halfX;
cityLights4.y = halfY;

// Back Spruces Sprite
const backSpruces = PIXI.Sprite.from('assets/Back-Spruces.png');
backSpruces.anchor.set(0.5);
backSpruces.x = halfX;
backSpruces.y = halfY;

// Hills Sprite
const hills = PIXI.Sprite.from('assets/Hills.png');
hills.anchor.set(0.5);
hills.x = halfX;
hills.y = halfY;

// Add sprite to the stage
app.stage.addChild(city);
app.stage.addChild(cityLights1);
app.stage.addChild(cityLights2);
app.stage.addChild(cityLights3);
app.stage.addChild(cityLights4);
app.stage.addChild(backSpruces);
app.stage.addChild(hills);
app.stage.addChild(spruces);

// Filters
const blurFilter = new PIXI.filters.BlurFilter();
spruces.filters = [blurFilter]

function animate() {
    requestAnimationFrame(animate);
    analyser.getByteFrequencyData(fqData);

    cityLights1.alpha = fqData[46] * 0.01;
    cityLights2.alpha = fqData[193] * 0.01;
    cityLights3.alpha = fqData[235] * 0.1;
    cityLights4.alpha = fqData[46] * 0.1;

    blurFilter.blur = 3 - fqData[200] * 0.04;

}

animate();
