//============================================================================
// Gabe MZ - Followers Interaction
//----------------------------------------------------------------------------
// 08/09/20 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This plugin is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.0] Allows to interact with followers, calling Common Events that can be freely configured.
 * @author Gabe (Gabriel Nascimento)
 * @url http://patreon.com/gabriel_nfd
 * @base GabeMZ_SmartFollowers
 * @orderAfter GabeMZ_SmartFollowers
 * 
 * @help Gabe MZ - Followers Interaction
 *  - This plugin is released under the zlib License.
 * 
 * To setup interactions with followers, just set in the plugin parameters the 
 * Common Event ID that each actor will call. After that edit the Common Events 
 * with your like. The Common Events that each actor calls can be changed 
 * throughout the game via Plugin Commands.
 * 
 * Plugin Commands:
 *   Change Common Event
 *       | This command allows to change the ID of the Common Event called when 
 *       | player interact with the defined actor.
 * 
 * For support and new plugins join our Discord server: 
 * https://discord.gg/GG85QRz
 * 
 * @param keyCode
 * @text Key Code
 * @desc Set the Key Code used to player turn to the direction when pressed.
 * @type number
 * @default 17
 * 
 * @param commonEventList
 * @text Common Event List
 * @desc Set the default Common Event called when player interact with the followers.
 * @type struct<commonEventStruct>[]
 * 
 * @command changeCommonEvent
 * @text Change Common Event
 * @desc Change the Common Event called when player interact with the followers.
 * 
 * @arg commonEventList
 * @text Common Event List
 * @desc Change the Common Event called when player interact with the followers.
 * @type struct<commonEventStruct>[]
 */

/*~struct~commonEventStruct:
 * @param actorId
 * @text Actor ID
 * @desc Set the Actor ID.
 * @type actor
 * 
 * @param commonEventId
 * @text Common Event ID
 * @desc Set the Common Event ID that will be called when the player interacts with the defined actor.
 * @type common_event
 */

var Imported = Imported || {};
Imported.GMZ_FollowersInteraction = true;

var GabeMZ                          = GabeMZ || {};
GabeMZ.FollowersInteraction         = GabeMZ.FollowersInteraction || {};
GabeMZ.FollowersInteraction.VERSION = [1, 0, 0];

if (!GabeMZ.SmartFollowers) throw new Error("Gabe MZ - Followers Interaction plugin needs the Gabe MZ - Smart Followers base.");

(() => {

    const pluginName = "GabeMZ_FollowersInteraction";
    GabeMZ.params = PluginManager.parameters(pluginName);
    GabeMZ.FollowersInteraction.keyCode = parseInt(GabeMZ.params.keyCode);
    GabeMZ.FollowersInteraction.defaultCommonEvents = JSON.parse(GabeMZ.params.commonEventList);
    GabeMZ.FollowersInteraction.commnEvents = {}
    GabeMZ.FollowersInteraction.defaultCommonEvents.forEach(arg => {
        arg = JSON.parse(arg);
        GabeMZ.FollowersInteraction.commnEvents[arg.actorId] = parseInt(arg.commonEventId);
    });

    Input.keyMapper[GabeMZ.FollowersInteraction.keyCode] = 'playerTurnDirection';

    //-----------------------------------------------------------------------------
    // PluginManager
    //
    // The static class that manages the plugins.

    PluginManager.registerCommand(pluginName, "changeCommonEvent", args => {
        const commonEventList = JSON.parse(args.commonEventList);
        commonEventList.forEach(arg => {
            arg = JSON.parse(arg);
            GabeMZ.FollowersInteraction.commnEvents[arg.actorId] = parseInt(arg.commonEventId);
            $gameActors.actor(arg.actorId).changeCommonEventId(arg.commonEventId);
        })
    });

    //-----------------------------------------------------------------------------
    // Game_Actor
    //
    // The game object class for an actor.

    const _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _Game_Actor_setup.call(this, actorId);
        this._commonEventId = GabeMZ.FollowersInteraction.commnEvents[actorId] ?
            GabeMZ.FollowersInteraction.commnEvents[actorId] : 0;
    };

    Game_Actor.prototype.commonEventId = function() {
        return this._commonEventId;
    }

    Game_Actor.prototype.changeCommonEventId = function(id) {
        this._commonEventId = id;
    }

    //-----------------------------------------------------------------------------
    // Game_Player
    //
    // The game object class for the player. It contains event starting
    // determinants and map scrolling functions.

    const _Game_Player_getInputDirection = Game_Player.prototype.getInputDirection;
    Game_Player.prototype.getInputDirection = function() {
        if (Input.isPressed("playerTurnDirection")) {
            this.setDirection(Input.dir4);
            return 0;
        } else {
            return _Game_Player_getInputDirection.call(this);
        }
    };

    const _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        _Game_Player_update.call(this, sceneActive);
        if (Input.isTriggered("ok")) this.updateFollowersInteraction();
    }

    Game_Player.prototype.updateFollowersInteraction = function() {
        const follower = this.checkFollowerTriggerFront(this.direction());
        if (!follower[0]) return;
        if (!follower[0].actor() || $gameMap.isEventRunning() || this.isMoving()) return;
        follower[0].turnTowardPlayer();
        $gameMap._interpreter.setup($dataCommonEvents[follower[0].actor().commonEventId()].list);
    }

    Game_Player.prototype.checkFollowerTriggerFront = function(d) {
        const x2 = $gameMap.roundXWithDirection(this._x, d);
        const y2 = $gameMap.roundYWithDirection(this._y, d);
        return this._followers.data().filter(follower => follower.pos(x2, y2));
    };

})();