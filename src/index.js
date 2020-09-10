function init() {
    const app = new PIXI.Application(
        {
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x473939
        });

    document.getElementById("app").appendChild(app.view);

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
    const cityLights = PIXI.Sprite.from('assets/City-Lights.png');
    cityLights.anchor.set(0.5);
    cityLights.x = halfX;
    cityLights.y = halfY;

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
    app.stage.addChild(cityLights);
    app.stage.addChild(backSpruces);
    app.stage.addChild(hills);
    app.stage.addChild(spruces);

}

init(); 
