'use strict';
/**
 * L-Systems generator
 * 
 * JavaScript AWS Lambda L-Systems 27/08/16
 * @author Jose Alberto Esquivel github.com/betoesquivel
 *
 * L-Systems library obtained from
   * JavaScript Canvas 04/03/09
   * @author Kevin Roast  kevtoast at yahoo.com
   * Updated: 16th July 2012
 */

var LSystems = require('./lsystems.js').LSystems;
var g_commands; 

const HEIGHT = 512;
const WIDTH = 512;

/**
 * Start handler
 */
function startHandler(params, callback)
{
  const paramsAndCallback = Object.assign({}, params, {'callback': (g_commands)=> () => callback(null, g_commands)});
  updateStatus( "Generating command string...", generateCmdString(paramsAndCallback) );
}

/**
 * L-Systems processing steps
 */
var generateCmdString = (params) => () => {
   try {
      var lsys = new LSystems.LSystemsProcessor();
      lsys.iterations = params.iterations;
      lsys.axiom = params.axiom;
      let rule = '';
      console.log(JSON.stringify(params));
      for (rule of params.rules) {
         if (rule && rule.length !== 0)
         {
            lsys.addRule(rule);
         }
      }
      g_commands = lsys.generate();
      updateStatus(`Commands:  ${ g_commands.length }. Calculating offsets...`, params.callback(g_commands) );
   } catch (e) {
      console.log("Error during LSystemsProcessor.generate()\n" + e);
   }
};

function updateStatus(msg, fn)
{
   console.log(msg);
   if (fn)
   {
      setTimeout(fn, 0);
   }
}

//var example;
//var params = {};

//example    = examples[1];
//params = {
  //iterations : example[0],
  //angle      : example[1],
  //constants  : example[2],
  //axiom      : example[3],
  //rules      : example.splice(4)
//}
// startHandler(params);

module.exports = {
  'handler': startHandler
}
