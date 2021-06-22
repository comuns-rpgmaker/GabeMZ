//============================================================================
// Gabe MZ - Region Plus
//----------------------------------------------------------------------------
// 27/02/21 | Version: 1.0,1 | Multiple effects bug fix
// 18/09/20 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This software is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.1]  Adds improvements and new functions to the game regions.
 * @author Gabe (Gabriel Nascimento)
 * @url http://patreon.com/gabriel_nfd
 * 
 * @help Gabe MZ - Region Plus
 *  - This plugin is released under the zlib License.
 * 
 * This plugin adds improvements and new functions to the game regions.
 * 
 * Plugin Parameters:
 *   Only Player Region
 *       | Set a region that will be passable only for the player.
 * 
 *   Only Event Region
 *       | Set a region that will be passable only for the events.
 * 
 *   Passable Region
 *       | Set a region that will always be passable.
 * 
 *   Impassable Region
 *       | Set a region that will always be impassable.
 * 
 * Map Note Tag:
 *   <commonRegion regionId: commonEventId>
 *       | The defined region will trigger the common event of the defined 
 *       | id when the note is inserted in the notes field of the map.
 * Usage Example:
 *   <commonRegion 255: 1> 
 *       | When stepping on a tile whose region id is 255 this'll trigger the 
 *       | common event of id 1.
 * 
 * Plugin Commands:
 *   Set Region Passability
 *       | This command allows to manually set the passability of 
 *       | a specific region by id.
 * 
 * @param passageSettings
 * @text Passage Settings
 * @desc Set the passability regions settings
 * 
 * @param onlyPlayerRegion
 * @text Only Player Region
 * @type number
 * @default 40
 * @parent passageSettings
 * 
 * @param onlyEventRegion
 * @text Only Event Region
 * @type number
 * @default 41
 * @parent passageSettings
 * 
 * @param passableRegion
 * @text Passable Region
 * @type number
 * @default 42
 * @parent passageSettings
 * 
 * @param impassableRegion
 * @text Impassable Region
 * @type number
 * @default 43
 * @parent passageSettings
 * 
 * @command setRegionPassability
 * @text Set Region Passability
 * @desc Set the passability of the specified region.
 * 
 * @arg regionId
 * @text Region ID
 * @desc The region id.
 * @type number
 * @default 0
 * 
 * @arg passable
 * @text  Passable
 * @desc ON: The region is passable.
 * OFF: The region is impassable
 * @type boolean
 * @default true
 */

var Imported = Imported || {};
Imported.GMZ_RegionPlus = true;

var GabeMZ                = GabeMZ || {};
GabeMZ.RegionPlus         = GabeMZ.RegionPlus || {};
GabeMZ.RegionPlus.VERSION = [1, 0, 1];

(() => {

    const pluginName = "GabeMZ_RegionPlus";
    GabeMZ.params = PluginManager.parameters(pluginName);
    GabeMZ.RegionPlus.onlyPlayerRegion      = parseInt(GabeMZ.params.onlyPlayerRegion);
    GabeMZ.RegionPlus.onlyEventRegion       = parseInt(GabeMZ.params.onlyEventRegion);
    GabeMZ.RegionPlus.impassableRegion      = parseInt(GabeMZ.params.impassableRegion);
    GabeMZ.RegionPlus.passableRegion        = parseInt(GabeMZ.params.passableRegion);

    //-----------------------------------------------------------------------------
    // PluginManager
    //
    // The static class that manages the plugins.

    PluginManager.registerCommand(pluginName, "setRegionPassability", args => {
        const passable = JSON.parse(args.passable)
        const regionId = parseInt(args.regionId);
        if (passable) {
            $gameSystem.setPassableRegion(regionId);
        } else {
            $gameSystem.setImpassableRegion(regionId);
        }
    });

    //-----------------------------------------------------------------------------
    // Game_Actor
    //
    // The game object class for an actor.

    const _Game_Actor_checkFloorEffect = Game_Actor.prototype.checkFloorEffect;
    Game_Actor.prototype.checkFloorEffect = function() {
        _Game_Actor_checkFloorEffect.call(this);
        if (this.actorId() != $gameParty.leader().actorId()) return;
        const commonEventId = $gameMap.commonRegion($gamePlayer.regionId());
        if (commonEventId) {
            $gameTemp.reserveCommonEvent(commonEventId);
        }
    };


    //-----------------------------------------------------------------------------
    // Game_CharacterBase
    //
    // The superclass of Game_Character. It handles basic information, such as
    // coordinates and images, shared by all characters.

    const _Game_CharacterBase_canPass = Game_CharacterBase.prototype.canPass;
    Game_CharacterBase.prototype.canPass = function(x, y, d) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        const regionId = $gameMap.regionId(x2,y2);
        if ($gameSystem.isImpassableRegion(regionId)) return false;
        switch (regionId) {
            case GabeMZ.RegionPlus.impassableRegion:
                return false;
            case GabeMZ.RegionPlus.passableRegion:
                return true;
            default:
                return _Game_CharacterBase_canPass.call(this, x, y, d);
        }
    }

    //-----------------------------------------------------------------------------
    // Game_Event
    //
    // The game object class for an event. It contains functionality for event page
    // switching and running parallel process events.

    const _Game_Event_canPass = Game_Event.prototype.canPass;
    Game_Event.prototype.canPass = function(x, y, d) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        if (!$gameMap.isValid(x2, y2)) return false;
        if (this.isThrough()) return true;
        switch ($gameMap.regionId(x2,y2)) {
            case GabeMZ.RegionPlus.onlyPlayerRegion:
                return false;
            case GabeMZ.RegionPlus.onlyEventRegion:
                return true;
            default:
                return _Game_Event_canPass.call(this, x, y, d);
        }
    }


    //-----------------------------------------------------------------------------
    // Game_Player
    //
    // The game object class for the player. It contains event starting
    // determinants and map scrolling functions.

    const _Game_Player_canPass = Game_Player.prototype.canPass;
    Game_Player.prototype.canPass = function(x, y, d) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        if (!$gameMap.isValid(x2, y2)) return false;
        if (this.isThrough() || this.isDebugThrough()) return true;
        switch ($gameMap.regionId(x2,y2)) {
            case GabeMZ.RegionPlus.onlyEventRegion:
                return false;
            case GabeMZ.RegionPlus.onlyPlayerRegion:
                return true;
            default:
                return _Game_Player_canPass.call(this, x, y, d);
        }
    }

    //-----------------------------------------------------------------------------
    // Game_Map
    //
    // The game object class for a map. It contains scrolling and passage
    // determination functions.

    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_setup.call(this, mapId);
        this._commonRegions = [];
        let reg = /<commonRegion\s*(\d+):\s*(\d+)>/g;
        let match; 
        while (match = reg.exec($dataMap.note)) {
            this._commonRegions[parseInt(match[1])] = parseInt(match[2]);
        }
    };
    
    Game_Map.prototype.commonRegion = function(regionId) {
        return this._commonRegions[regionId];
    }

    //-----------------------------------------------------------------------------
    // Game_System
    //
    // The game object class for the system data.

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._impassableRegions = [];
    }

    Game_System.prototype.setImpassableRegion = function(regionId) {
        this._impassableRegions[regionId] = true;
    }

    Game_System.prototype.setPassableRegion = function(regionId) {
        this._impassableRegions[regionId] = false;
    }

    Game_System.prototype.isImpassableRegion = function(regionId) {
        return this._impassableRegions[regionId]
    }

})();