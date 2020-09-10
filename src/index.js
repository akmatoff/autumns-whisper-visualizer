function init() {
    const app = new PIXI.Application(
        {
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x171616
        });

    document.getElementById("app").appendChild(app.view);
}

init(); 
