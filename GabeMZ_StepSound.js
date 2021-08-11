//============================================================================
// Gabe MZ - Step Sound
//----------------------------------------------------------------------------
// 23/10/20 | Version: 1.1.1 | Followers step sound bug fix
// 07/09/20 | Version: 1.1.0 | Included new sound control parameters
// 28/08/20 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This plugin is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.1.1] Allows characters to emit step sounds when walking.
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
 * @param walkingFrequency
 * @text Walking Frequency
 * @desc Set the steps sound frequency when walking.
 * @type number
 * @default 100
 * @min 0
 * @max 100
 * 
 * @param dashingFrequency
 * @text Dashing Frequency
 * @desc Set the steps sound frequency when dashing.
 * @type number
 * @default 90
 * @min 0
 * @max 100
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
 * @param variance
 * @text Files Variance
 * @desc Set the SE files variance
 * @type number
 * @min 1
 * @max 100
 * @default 1
 * 
 * @param volume
 * @text Volume
 * @desc Set the SE volume
 * @type number
 * @min 0
 * @max 100
 * @default 75
 * 
 * @param volumeVariance
 * @text Volume Variance
 * @desc Set the SE volume variance
 * @type number
 * @default 0
 * @min -100
 * @max 100
 * 
 * @param pitch
 * @text Pitch
 * @desc Set the SE pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * 
 * @param pitchVariance
 * @text Pitch Variance
 * @desc Set the SE pitch variance
 * @type number
 * @default 0
 * @min -150
 * @max 150
 * 
 * @param pan
 * @text Pan
 * @desc Set the SE pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @param panVariance
 * @text Pan Variance
 * @desc Set the SE pan variance
 * @type number
 * @default 0
 * @min -100
 * @max 100
 */

var Imported = Imported || {};
Imported.GMZ_StepSound = true;

var GabeMZ               = GabeMZ || {};
GabeMZ.StepSound         = GabeMZ.StepSound || {};
GabeMZ.StepSound.VERSION = [1, 1, 1];

(() => {

    const pluginName = "GabeMZ_StepSound";
    const params = PluginManager.parameters(pluginName);

    GabeMZ.StepSound.stepSoundSettings = JSON.parse(params.stepSoundSettings)
    GabeMZ.StepSound.playerStepSound = JSON.parse(params.playerStepSound);
    GabeMZ.StepSound.followersStepSound = JSON.parse(params.followersStepSound);
    GabeMZ.StepSound.walkingFrequency = JSON.parse(params.walkingFrequency);
    GabeMZ.StepSound.dashingFrequency = JSON.parse(params.dashingFrequency);

    //-----------------------------------------------------------------------------
    // PluginManager
    //
    // The static class that manages the plugins.

    PluginManager.registerCommand(pluginName, "playerStepSound", args => {
        $gamePlayer.setStepSoundEmittance(JSON.parse(args.playerStepSound));
    });

    PluginManager.registerCommand(pluginName, "followersStepSound", args => {
        $gamePlayer.followers().setAllStepSoundEmittance(JSON.parse(args.followersStepSound));
    });

    PluginManager.registerCommand(pluginName, "eventStepSound", args => {
        let id = parseInt(args.eventId);
        let event = id == 0 ? $gameMap.currentEvent() : $gameMap.event(id)
        event.setStepSoundEmittance(JSON.parse(args.eventStepSound));
    });

    //-----------------------------------------------------------------------------
    // Game_CharacterBase
    //
    // The superclass of Game_Character. It handles basic information, such as
    // coordinates and images, shared by all characters.

    const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        _Game_CharacterBase_initMembers.call(this);
        this._stepSoundEmittance = false;
    };

    const _Game_CharacterBase_increaseSteps = Game_CharacterBase.prototype.increaseSteps;
    Game_CharacterBase.prototype.increaseSteps = function() {
        _Game_CharacterBase_increaseSteps.call(this)
        const frequency = this.isDashing() ? GabeMZ.StepSound.dashingFrequency : GabeMZ.StepSound.walkingFrequency;
        if ((Math.floor(Math.random() * 100)) > frequency) return;
        const settings = this.stepSound();
        if (this.stepSoundEmittance() && settings && this.isNearTheScreen()) {
            let variance = Math.floor(Math.random() * parseInt(settings.variance)) + 1;
            let name = parseInt(settings.variance) == 1 ? `${settings.baseName}` : `${settings.baseName + variance}`;
            let volume = parseInt(settings.volume) + (Math.floor(Math.random() * parseInt(settings.volumeVariance)));
            let pitch = parseInt(settings.pitch) + (Math.floor(Math.random() * parseInt(settings.pitchVariance)));
            let pan = parseInt(settings.pan) + (Math.floor(Math.random() * parseInt(settings.panVariance)));
            let se = {
                name: name,
                volume: volume,
                pitch: pitch,
                pan: pan
            }
            AudioManager.playSe(se);
        }
    };

    Game_CharacterBase.prototype.stepSound = function() {
        return $gameMap.stepSoundRegion(this.regionId()) || $gameMap.stepSoundTerrain(this.terrainTag());
    }

    Game_CharacterBase.prototype.setStepSoundEmittance = function(stepSoundEmittance) {
        this._stepSoundEmittance = stepSoundEmittance;
    }

    Game_CharacterBase.prototype.stepSoundEmittance = function() {
        return this._stepSoundEmittance;
    }

    //-----------------------------------------------------------------------------
    // Game_Player
    //
    // The game object class for the player. It contains event starting
    // determinants and map scrolling functions.

    const _Game_Player_initMembers = Game_Player.prototype.initMembers;
    Game_Player.prototype.initMembers = function() {
        _Game_Player_initMembers.call(this);
        this._stepSoundEmittance = GabeMZ.StepSound.playerStepSound;
    };

    //-----------------------------------------------------------------------------
    // Game_Follower
    //
    // The game object class for a follower. A follower is an allied character,
    // other than the front character, displayed in the party.

    const _Game_Follower_initMembers = Game_Follower.prototype.initMembers;
    Game_Follower.prototype.initMembers = function() {
        _Game_Follower_initMembers.call(this);
        this._stepSoundEmittance = GabeMZ.StepSound.followersStepSound;
    };

    const _Game_Follower_refresh = Game_Follower.prototype.refresh;
    Game_Follower.prototype.refresh = function() {
        _Game_Follower_refresh.call(this);
        this._stepSoundEmittance = this.isVisible() && GabeMZ.StepSound.followersStepSound;
    };

    //-----------------------------------------------------------------------------
    // Game_Followers
    //
    // The wrapper class for a follower array.

    Game_Followers.prototype.setAllStepSoundEmittance = function(stepSoundEmittance) {
        for (const follower of this._data) {
            follower.setStepSoundEmittance(stepSoundEmittance);
        }
    }

    //-----------------------------------------------------------------------------
    // Game_Event
    //
    // The game object class for an event. It contains functionality for event page
    // switching and running parallel process events.

    const _Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        _Game_Event_initialize.call(this, mapId, eventId);
        // 
        this._stepSoundEmittance = /<stepSound>/.test(this.event().note);
    };

    //-----------------------------------------------------------------------------
    // Game_Map
    //
    // The game object class for a map. It contains scrolling and passage
    // determination functions.

    const _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Game_Map_initialize.call(this);
        this._stepSoundTerrains = {};
        this._stepSoundRegions = {};
    };

    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_setup.call(this, mapId);
        this._stepSoundRegions = this.setMapStepSoundSettings($dataMap.note)
        this._stepSoundTerrains = this.setMapStepSoundSettings($dataTilesets[this._tilesetId].note)
    };

    Game_Map.prototype.setMapStepSoundSettings = function(note) {
        let result = {}
        let reg = /<stepSound\s*(\d+):\s*(\d+)>/g;
        let match;
        while (match = reg.exec(note)) {
            let setting = JSON.parse(GabeMZ.StepSound.stepSoundSettings[parseInt(match[2] - 1)]);
            result[match[1]] = setting;
        }
        return result;
    }

    Game_Map.prototype.stepSoundRegion = function(id) {
        return this._stepSoundRegions[id];
    }

    Game_Map.prototype.stepSoundTerrain = function(id) {
        return this._stepSoundTerrains[id];
    }

    Game_Map.prototype.currentEvent = function() {
        return this.event(this._interpreter.eventId());
    };

})();