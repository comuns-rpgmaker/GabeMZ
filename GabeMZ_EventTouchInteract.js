//============================================================================
// Gabe MZ - Event Touch Interact
//----------------------------------------------------------------------------
// 29/08/20 | Version: 1.0.3
// This plugin is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.3] Allows you to interact with events using touch even from a distance.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 * 
 * @help Gabe MZ - Event Touch Interact
 *  - This plugin is released under the zlib License.
 * 
 * This plugin allows you to interact with events using touch even 
 * from a distance.
 * 
 * To use just insert the specific tags to the event's notes field.
 * 
 * Event Note Tag:
 *   <distanceTrigger>
 *       | This is the main tag, when the event has it, it can be activated 
 *       | by touch even from a distance.
 *  
 *   <distanceSwitch: ID>
 *       | Allows to activate a Self Switch when the event is triggered 
 *       | from a distance by the touch. Replace the ID with the desired 
 *       | Self Switch. (A/B/C/D)
 * 
 *   <distanceValue: value>
 *       | Allows to define a minimum distance to which the player must be 
 *       | from the event to activate it with the touch. Replace the value 
 *       | with the de desired distance.
 * 
 * Plugin Commands:
 *   Set Event Touch Interact
 *       | This command allows you to define whether distance touch activation 
 *       | will be active or not.
 * 
 * For support and new plugins join our Discord server: 
 * https://discord.gg/GG85QRz
 * 
 * @command setEventTouchInteract
 * @text Set Event Touch Interact
 * @desc Defines whether a distance interaction when touching events will be enabled or not.
 * 
 * @arg enabled
 * @text Enable
 * @desc Defines whether a distance interaction when touching events will be enabled or not.
 * @type boolean
 * @default true
 */

var GabeMZ                        = GabeMZ || {};
GabeMZ.EventTouchInteract         = GabeMZ.EventTouchInteract || {};
GabeMZ.EventTouchInteract.VERSION = [1, 0, 3];

(() => {

    const pluginName = "GabeMZ_EventTouchInteract";
    GabeMZ.params = PluginManager.parameters(pluginName);
    GabeMZ.EventTouchInteract.enabled = true;

    //-----------------------------------------------------------------------------
    // PluginManager
    //
    // The static class that manages the plugins.

    PluginManager.registerCommand(pluginName, "setEventTouchInteract", args => {
        GabeMZ.EventTouchInteract.enabled = JSON.parse(args.enabled);
    });

    //-----------------------------------------------------------------------------
    // Game_Event
    //
    // The game object class for an event. It contains functionality for event page
    // switching and running parallel process events.

    let _Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        _Game_Event_initialize.call(this, mapId, eventId);
        // 
        this._distanceTrigger = /<distanceTrigger>/.test(this.event().note);
        this._distanceSwitch = this.event().note.match(/<distanceSwitch:\s*([A-D])>/);
        if (this._distanceSwitch) this._distanceSwitch = this._distanceSwitch[1];
        this._distanceValue = this.event().note.match(/<distanceValue:\s*(\d+)>/);
        if (this._distanceValue) parseInt(this._distanceValue = this._distanceValue[1]);
    };

    let _Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        _Game_Event_update.call(this);
        if (this._distanceTrigger && GabeMZ.EventTouchInteract.enabled && this.page()) this.checkEventTouchInteract();
    };

    Game_Event.prototype.checkEventTouchInteract = function() {
        const x = $gameTemp.destinationX();
        const y = $gameTemp.destinationY();
        if (this.x == x && this.y == y) {
            if (this._distanceValue && this._distanceValue < $gameMap.distance(this.x, this.y, $gamePlayer.x, $gamePlayer.y)) return;
            if (this._distanceSwitch) {
                const key = [this._mapId, this._eventId, this._distanceSwitch];
                $gameSelfSwitches.setValue(key, true);
            }
            this.start();
        }
    }

})();