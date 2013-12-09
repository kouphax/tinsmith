Pixi Renderer
=============

![pixi.js logo](http://www.goodboydigital.com/pixijs/logo_small.png)

#### JavaScript 2D Renderer ####

The aim of this project is to provide a fast lightweight 2D library that works
across all devices. The Pixi renderer allows everyone to enjoy the power of
hardware acceleration without prior knowledge of webGL. Also its fast.

If you’re interested in pixi.js then feel free to follow me on twitter
([@doormat23](https://twitter.com/doormat23)) and I will keep you posted!  And
of course check back on [our site](<http://www.goodboydigital.com/blog/>) as
any breakthroughs will be posted up there too!

### Demos ###

- [Run pixi run](<http://www.goodboydigital.com/runpixierun/>)

- [Fight for Everyone](<http://www.theleisuresociety.co.uk/fightforeveryone>)

- [Flash vs HTML](<http://flashvhtml.com>)

- [Bunny Demo](<http://www.goodboydigital.com/pixijs/bunnymark>)

- [Interaction Demo](<http://www.goodboydigital.com/pixijs/examples/6/>)

- [photonstorm Balls Demo](<http://gametest.mobi/pixi/balls/>)

- [photonstorm Morph Demo](<http://gametest.mobi/pixi/morph/>)

Thanks to [@photonstorm](https://twitter.com/photonstorm) for providing those
last 2 examples and allowing us to share the source code :)

### Docs ###

[Documentation can be found here](<http://www.goodboydigital.com/pixijs/docs/>)

### Resources ###

[Tutorials and other helpful bits](<https://github.com/GoodBoyDigital/pixi.js/wiki/Resources>)

### How to build ###

PixiJS is build with Grunt. If you don't already have this, go install Node and NPM then install the Grunt Command Line.

```
$> npm install -g grunt-cli
```

Then, in the folder where you have downloaded the source, install the build dependencies using npm:

```
$> npm install
```

Then build:

```
$> grunt
```

This will create a minified version at bin/pixi.js and a non-minified version at bin/pixi.dev.js.

It also copies the non-minified version to the examples. 

### Current features ###

- WebGL renderer (with automatic smart batching allowing for REALLY fast performance) 
- Canvas renderer (Fastest in town!)
- Full scene graph 
- Super easy to use API (similar to the flash display list API) 
- Support for texture atlases 
- Asset loader / sprite sheet loader 
- Auto-detect which renderer should be used
- Full Mouse and Multi-touch Interaction
- Text

### Coming soon ###

- Filters 
- Render Texture 
- BitmapFont text
- Multiline Text

### Coming later ###

- Awesome Post processing effects

### Usage ###

```javascript
	
	// You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
	var renderer = new PIXI.WebGLRenderer(800, 600); 

	document.body.appendChild(renderer.view);
	
	var stage = new PIXI.Stage;

	var bunnyTexture = PIXI.Texture.fromImage("bunny.png");
	var bunny = new PIXI.Sprite(bunnyTexture);
	
	bunny.position.x = 400;
	bunny.position.y = 300;
	
	bunny.scale.x = 2;
	bunny.scale.y = 2;
	
	stage.addChild(bunny);
	
	requestAnimationFrame(animate);
	
	function animate() {
		bunny.rotation += 0.01;
		
		renderer.render(stage);
		
		requestAnimationFrame(animate);
	}
```

This content is released under the (http://opensource.org/licenses/MIT) MIT License.
