# First+Third Test

## Setup

Getting your environment up and running is easy. There are just a few dependencies.

* [Node.js](http://nodejs.org/) which includes NPM
* [Grunt](http://gruntjs.com)

Once the dependencies are installed just clone the repo. In your terminal navigate to the project's root directory and run `npm install`.

After all the `node modules` are downloaded runing `grunt serve` will build the site and launch the site in a browser tab for you. There is no need to create a local server. `grunt serve` also starts a watch task. Any modification to sass, javascript, or assemble (hbs) files will cause the site to get rebuilt, and your browser tab will reload.

## Notes

Because of just wanting to spend a couple of hours on the page I approached it as if it was a prototype. The idea was just to give you a look at how I structure my code and my style. The page isn't 100% but this is what I could do in 2 hours. Even though it's built as a prototype it would be really easy to turn it into production code. It would just be a matter of separating some code out and fixing some responsive issues.

It turns out I had already used up my Sketch trial so I could view the Sketch file you sent me. I just used the PNG and guessed at the font and sizes. I think I got really close. The font looked like Helvetica to me.

I used assemble for the HTML. The idea behind that is if the code was for production using assemble allows me to build static HTML pages in piecemeal. This makes it easier for an engineer to integrate it since the modules are already separated rather in whole pages.

The gruntfile is one I wrote for another project. It builds the dev files as minified files to mimic the size the production would see. Source maps are used to allow debugging. There is a Babel task so javascript can be written ES6.

Tabs switch as expected. I used a carousel to switch the tabs. I use an array to reverse the order of the tabs so that the arrow and tab slide in the same direction. So clicking on Tab 4 is really showing the first item in the carousel.

I included a eslint and scss-lint config files to make sure standards are met.

I'd be great to get on a call so I can go over my methodologies to the site structure and code formats. 
