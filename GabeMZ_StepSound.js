//============================================================================
// Gabe MZ - Step Sound
//----------------------------------------------------------------------------
// 28/08/20 | Version: 1.0.0
// This plugin is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc Allows characters to emit step sounds when walking.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 * 
 * @help Gabe MZ - Step Sound
 *  - This plugin is released under the zlib License.
 * 
 * This plugin allows characters to emit step sounds when walking.
 * 
 * How to Setup a Step Sound:
 * 
 * The first step are set the Step Sound Settings in this plugin 
 * parameters. The definitions are simple, but pay attention to the 
 * base name of the SE file and it's variations number. The plugin 
 * runs the SEs randomly within the maximum number of variations.
 * Works as follows:
 *   | Base Name + Random value within the amount of variations
 * Examples:
 *   | Step Sound Setting: 
 *       | Base Name: Step_Dirt
 *       | Variance: 4
 *   | This setting may randomly call the following files:
 *       | Step_Dirt1
 *       | Step_Dirt2
 *       | Step_Dirt3
 *       | Step_Dirt4
 * 
 * After that, you can add a step sound setting in the tileset 
 * terrains or in the map regions.
 * 
 * In both cases the definition is made through the same note.
 * 
 * Tileset Note Tag:
 *   <stepSound terrainId: stepSoundId>
 *       | This note tag add the specific step sound to the
 *       | specific terrain.
 * Usage Example:
 *   <stepSound 5: 1> 
 *       | This tag adds the step sound of ID 1 at the tileset
 *       | terrain 5.
 * 
 * Map Note Tag:
 *   <stepSound regionId: stepSoundId>
 *       | This note tag add the specific step sound to the
 *       | specific map region.
 * Usage Example:
 *   <stepSound 3: 4> 
 *       | This tag adds the step sound of ID 4 at the map
 *       | region 3.
 * 
 * It is also possible to add step sounds to the events movement. To do 
 * this add the following note to them:
 * 
 * Event Note Tag:
 *   <stepSound>
 *       | Just by inserting this note in an event it will emit step sounds 
 *       | when moving.
 * 
  * Plugin Commands:
 *   Player Step Sound
 *       | This command allows to set if the player will emit step sounds
 *       | or not.
 * 
 *   Followers Step Sound
 *       | This command allows to set if the followers will emit step sounds
 *       | or not.
 * 
 *   Event Step Sound
 *       | This command allows to set if the event will emit step sounds
 *       | or not. When the id is 0 it will be applied to the current event. 
 *       | Else, the event of the defined ID.
 * 
 * For support and new plugins join our Discord server: 
 * https://discord.gg/GG85QRz
 * 
 * @param stepSoundSettings
 * @text Step Sound Settings
 * @desc Set the Step Sound Setings to use in the game.
 * @type struct<stepSoundsStruct>[]
 * 
 * @param playerStepSound
 * @text Player Step Sound
 * @desc Set if the player will emit steps sounds by default.
 * @type boolean
 * @default true
 * 
 * @param followersStepSound
 * @text Followers Step Sound
 * @desc Set if the followers will emit steps sounds by default.
 * @type boolean
 * @default true
 * 
 * @command playerStepSound
 * @text Player Step Sound
 * @desc Set if the player emit the step sound.
 * 
 * @arg playerStepSound
 * @text Player Step Sound
 * @desc Set if the player emit the step sound.
 * @type boolean
 * @default true
 * 
 * @command followersStepSound
 * @text Followers Step Sound
 * @desc Set if the followers emit the step sound.
 * 
 * @arg followersStepSound
 * @text Followers Step Sound
 * @desc Set if the followers emit the step sound.
 * @type boolean
 * @default true
 * 
 * @command eventStepSound
 * @text Event Step Sound
 * @desc Set if the event emit the step sound.
 * 
 * @arg eventId
 * @text Event ID
 * @desc Set the event ID. When 0 will be the current event.
 * @type number
 * @default 0
 * @min 0
 * 
 * @arg eventStepSound
 * @text Event Step Sound
 * @desc Set if the event emit the step sound.
 * @type boolean
 * @default true
 */ 

/*~struct~stepSoundsStruct:
 * @param baseName
 * @text Base Name
 * @desc Set the SE base filename
 * @type text
 * 
 * @param volume
 * @text Volume
 * @desc Set the SE volume
 * @type number
 * @min 0
 * @max 100
 * @default 75
 * 
 * @param pitch
 * @text Pitch
 * @desc Set the SE pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * 
 * @param pan
 * @text Pan
 * @desc Set the SE pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @param variance
 * @text Variance
 * @desc Set the SE variance
 * @type number
 * @min 1
 * @max 100
 * @default 1
 */

//=============================================================================
// ** NOTICE **
//-----------------------------------------------------------------------------
// The code below is generated by a compiler, and is not well suited for human
// reading. If you are interested on the source code, please take a look at
// the Github repository for this plugin!
//=============================================================================

!function(){"use strict";function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function e(e,n){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(e))||n&&e&&"number"==typeof e.length){r&&(e=r);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,p=!0,s=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var t=r.next();return p=t.done,t},e:function(t){s=!0,i=t},f:function(){try{p||null==r.return||r.return()}finally{if(s)throw i}}}}var n=n||{};n.StepSound=n.StepSound||{},n.StepSound.VERSION=[1,0,0],function(){var t="GabeMZ_StepSound";n.params=PluginManager.parameters(t),n.StepSound.stepSoundSettings=JSON.parse(n.params.stepSoundSettings),n.StepSound.playerStepSound=JSON.parse(n.params.playerStepSound),n.StepSound.followersStepSound=JSON.parse(n.params.followersStepSound),PluginManager.registerCommand(t,"playerStepSound",(function(t){$gamePlayer.setStepSoundEmittance(JSON.parse(t.playerStepSound))})),PluginManager.registerCommand(t,"followersStepSound",(function(t){$gamePlayer.followers().setAllStepSoundEmittance(JSON.parse(t.followersStepSound))})),PluginManager.registerCommand(t,"eventStepSound",(function(t){var e=parseInt(t.eventId);(0==e?$gameMap.currentEvent():$gameMap.event(e)).setStepSoundEmittance(JSON.parse(t.eventStepSound))}));var r=Game_CharacterBase.prototype.initMembers;Game_CharacterBase.prototype.initMembers=function(){r.call(this),this._stepSoundEmittance=!1};var a=Game_CharacterBase.prototype.increaseSteps;Game_CharacterBase.prototype.increaseSteps=function(){a.call(this);var t=this.stepSound();if(this.stepSoundEmittance()&&t&&this.isNearTheScreen()){var e=Math.floor(Math.random()*parseInt(t.variance))+1,n={name:"".concat(t.baseName+e),volume:parseInt(t.volume),pitch:parseInt(t.pitch),pan:parseInt(t.pan)};AudioManager.playSe(n)}},Game_CharacterBase.prototype.stepSound=function(){return $gameMap.stepSoundRegion(this.regionId())||$gameMap.stepSoundTerrain(this.terrainTag())},Game_CharacterBase.prototype.setStepSoundEmittance=function(t){this._stepSoundEmittance=t},Game_CharacterBase.prototype.stepSoundEmittance=function(){return this._stepSoundEmittance};var o=Game_Player.prototype.initMembers;Game_Player.prototype.initMembers=function(){o.call(this),this._stepSoundEmittance=n.StepSound.playerStepSound};var i=Game_Follower.prototype.initMembers;Game_Follower.prototype.initMembers=function(){i.call(this),this._stepSoundEmittance=n.StepSound.followersStepSound},Game_Followers.prototype.setAllStepSoundEmittance=function(t){var n,r=e(this._data);try{for(r.s();!(n=r.n()).done;){n.value.setStepSoundEmittance(t)}}catch(t){r.e(t)}finally{r.f()}};var p=Game_Event.prototype.initialize;Game_Event.prototype.initialize=function(t,e){p.call(this,t,e),this._stepSoundEmittance=/<stepSound>/.test(this.event().note)};var s=Game_Map.prototype.initialize;Game_Map.prototype.initialize=function(){s.call(this),this._stepSoundTerrains={},this._stepSoundRegions={}};var u=Game_Map.prototype.setup;Game_Map.prototype.setup=function(t){u.call(this,t),this._stepSoundRegions=this.setMapStepSoundSettings($dataMap.note),this._stepSoundTerrains=this.setMapStepSoundSettings($dataTilesets[this._tilesetId].note)},Game_Map.prototype.setMapStepSoundSettings=function(t){for(var e,r={},a=/<stepSound\s*(\d+):\s*(\d+)>/g;e=a.exec(t);){var o=JSON.parse(n.StepSound.stepSoundSettings[parseInt(e[2]-1)]);r[e[1]]=o}return r},Game_Map.prototype.stepSoundRegion=function(t){return this._stepSoundRegions[t]},Game_Map.prototype.stepSoundTerrain=function(t){return this._stepSoundTerrains[t]},Game_Map.prototype.currentEvent=function(){return this.event(this._interpreter.eventId())}}()}();