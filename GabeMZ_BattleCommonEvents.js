//============================================================================
// Gabe MZ - Battle Common Events
//----------------------------------------------------------------------------
// 19/08/21 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This plugin is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.0] Allows the execution of common events with autorun or parallel 
 * trigger during battles.
 * @author Gabe (Gabriel Nascimento)
 * @url https://dromarch.itch.io/
 * 
 * @help Gabe MZ - Battle Common Events
 *  - This plugin is released under the zlib License.
 * 
 * This is a plug n' play plugin to allows the execution of common events with 
 * autorun or parallel trigger during the battles.
 */

var Imported = Imported || {};
Imported.GMZ_BattleCommonEvents = true;

var GabeMZ                        = GabeMZ || {};
GabeMZ.BattleCommonEvents         = GabeMZ.BattleCommonEvents || {};
GabeMZ.BattleCommonEvents.VERSION = [1, 0, 0];

(() => {

    //-----------------------------------------------------------------------------
    // BattleManager
    //
    // The static class that manages battle progress.

    const _BattleManager_update = BattleManager.update;
    BattleManager.update = function() {
        $gameTroop.updateCommonEvents();
        _BattleManager_update.call(this, ...arguments);
    };

    //-----------------------------------------------------------------------------
    // Game_Troop
    //
    // The game object class for a troop and the battle-related data.

    const _Game_Troop_initialize = Game_Troop.prototype.initialize;
    Game_Troop.prototype.initialize = function() {
        this.setupCommonEvents();
        this._needsRefresh = false;
        _Game_Troop_initialize.call(this, ...arguments);
    };

    Game_Troop.prototype.setupCommonEvents = function() {
        this._commonEvents = [];
        for (const commonEvent of this.parallelCommonEvents()) {
            this._commonEvents.push(new Game_CommonEvent(commonEvent.id));
        }
    };

    Game_Troop.prototype.requestRefresh = function() {
        this._needsRefresh = true;
    };

    Game_Troop.prototype.parallelCommonEvents = function() {
        return $dataCommonEvents.filter(
            commonEvent => commonEvent && commonEvent.trigger === 2
        );
    };

    Game_Troop.prototype.updateCommonEvents = function() {
        this.refreshIfNeeded();
        for (const commonEvent of this._commonEvents) {
            commonEvent.update();
        }
    };

    Game_Troop.prototype.refreshIfNeeded = function() {
        if (this._needsRefresh) {
            for (const commonEvent of this._commonEvents) {
                commonEvent.refresh();
            }
            this._needsRefresh = false;
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Map
    //
    // The game object class for a map. It contains scrolling and passage
    // determination functions.

    const _Game_Map_requestRefresh = Game_Map.prototype.requestRefresh;
    Game_Map.prototype.requestRefresh = function() {
        _Game_Map_requestRefresh.call(this, ...arguments);
        $gameTroop.requestRefresh();
    };

})();