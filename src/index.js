const app = new PIXI.Application(
    {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x473939,
        resizeTo: window
    });

app.stage.filterArea = app.screen;

document.getElementById("app").appendChild(app.view);

// Audio
var ctx = new AudioContext();
var audio = document.querySelector('#audio');
var audioSrc = ctx.createMediaElementSource(audio);
var analyser = ctx.createAnalyser();
analyser.fftSize = 1024;
audio.play();
audio.loop = true;
audioSrc.connect(analyser);
audioSrc.connect(ctx.destination);
var fqData = new Uint8Array(analyser.frequencyBinCount);

// Determine the center of screen
var halfX = app.view.width / 2;
var halfY = app.view.height / 2;

// Container
const container = new PIXI.Container();
let containerScale = 0.7;
container.scale.set(containerScale, containerScale);
container.x = halfX;
container.y = halfY;
container.pivot.set(halfX, halfY);

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

app.stage.addChild(container);

// Add sprite to the stage
container.addChild(city);
container.addChild(cityLights1);
container.addChild(cityLights2);
container.addChild(cityLights3);
container.addChild(cityLights4);
container.addChild(backSpruces);
container.addChild(hills);
container.addChild(spruces);

// Filters
const blurFilter = new PIXI.filters.BlurFilter();
spruces.filters = [blurFilter]

const glitchFilter = new PIXI.filters.GlitchFilter();

const rainBlur = new PIXI.filters.BlurFilter();
rainBlur.blur = 0;

app.stage.filters = [glitchFilter]

// var raindropTexture = PIXI.Texture.from('assets/raindrops.png');

// var raindrops = new PIXI.Container();
// var count = 0;
// app.stage.addChild(raindrops);

// setInterval(() => {
//     // Raindrops Sprite
//     const raindrop = new PIXI.Sprite(raindropTexture);
//     raindrop.filters = [rainBlur]
//     raindrop.anchor.set(0.5);
//     raindrop.alpha = 0.5 + Math.random();
//     rainBlur.blur = Math.random() * 5;
//     raindrop.scale.set(Math.random() * 0.02, Math.random() * 0.02);
//     raindrop.x = Math.random() * app.screen.width;
//     raindrop.y = Math.random() * app.screen.height;
//     raindrops.addChild(raindrop);
//     count++;
// }, 1000 / 60);

function animate() {
    requestAnimationFrame(animate);
    analyser.getByteFrequencyData(fqData);

    cityLights1.alpha = fqData[46] * 0.01;
    cityLights2.alpha = fqData[193] * 0.01;
    cityLights3.alpha = fqData[235] * 0.1;
    cityLights4.alpha = fqData[46] * 0.1;

    blurFilter.blur = 3 - fqData[200] * 0.04;
    glitchFilter.offset = fqData[193] * 0.1;
    glitchFilter.seed = Math.random();
    glitchFilter.slices = fqData[235] * 0.3;

    container.scale.set(containerScale + fqData[193] * 0.0001, containerScale + fqData[193] * 0.0001);

}

function onWindowResize() {
    halfX = window.innerWidth / 2;
    halfY = window.innerHeight / 2;
    container.pivot.set(halfX, halfY);
}

animate();

window.addEventListener('resize', onWindowResize, false);