//============================================================================
// Gabe MZ - Equip Requirements
//----------------------------------------------------------------------------
// 08/09/20 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This software is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc Allows to add extra requirements to the equipments.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 * 
 * @help Gabe MZ - Equip Requirements
 *  - This plugin is released under the zlib License.
 * 
 * This plugin provides the possibility to add extra requirements to 
 * the equipments.
 * 
 * To use and apply the requirements to the desired equipment (weapons, 
 * armor or accessories), simply add the note tag of the desired function 
 * in the equipments notes box.
 *
 * Equipments Note Tag:
 *   <require level value>
 *       | Requires that actor has a level equal to or greater 
 *       | than the specified value.
 *   <require maxhp value>
 *       | Requires that actor has a maximum HP equal to or greater 
 *       | than the specified value.
 *   <require maxmp value>
 *       | Requires that actor has a maximum MP equal to or greater 
 *       | than the specified value.
 *   <require attack value>
 *       | Requires that actor has a attack equal to or greater 
 *       | than the specified value.
 *   <require defense value>
 *       | Requires that actor has a defense equal to or greater 
 *       | than the specified value.
 *   <require magicAttack value>
 *       | Requires that actor has a magic attack equal to or greater 
 *       | than the specified value.
 *   <require magicDefense value>
 *       | Requires that actor has a magic defense equal to or greater 
 *       | than the specified value.
 *   <require agility value>
 *       | Requires that actor has a agility equal to or greater 
 *       | than the specified value.
 *   <require luck value>
 *       | Requires that actor has a luck equal to or greater 
 *       | than the specified value.
 *   <require actorId id>
 *       | Requires that actor have the specified id.
 *   <require classId id>
 *       | Requires that actor have the specified class id.
 *   <require switch id>
 *       | Requires the switch of the specified id is ON,
 * 
 * Usage Examples:
 *   <require level 16>
 *       | Requires the actor has the level 16 or higher.
 *   <require maxhp 800>
 *       | Requires the actor has the 800 maximum HP or higher.
 *   <require maxmp 100>
 *       | Requires the actor has the 100 maximum MP or higher.
 *   <require classId 5>
 *       | Requires the actor has class of id 5.
 * 
 * For support and new plugins join our Discord server: 
 * https://discord.gg/GG85QRz
 * 
 * @param hideEquip
 * @text Hide Unavailable Equipment?
 * @desc Set whether the unavailable equipment should be hide when equippable by the actors.
 * @type boolean
 * @default false
 */

var GabeMZ                       = GabeMZ || {};
GabeMZ.EquipRequirements         = GabeMZ.EquipRequirements || {};
GabeMZ.EquipRequirements.VERSION = [1, 0, 0];

(() => {

    const pluginName = "GabeMZ_EquipRequirements";
    GabeMZ.params = PluginManager.parameters(pluginName);
    GabeMZ.EquipRequirements.hideEquip = JSON.parse(GabeMZ.params.hideEquip);

    //-----------------------------------------------------------------------------
    // Window_EquipItem
    //
    // The window for selecting an equipment item on the equipment screen.

    const _Window_EquipItem_isEnabled = Window_EquipItem.prototype.isEnabled;
    Window_EquipItem.prototype.isEnabled = function(item) {
        if (!item) return _Window_EquipItem_isEnabled.call(this, item);
        return this._actor.checkEquipRequiriments(this._actor, item) ? 
        _Window_EquipItem_isEnabled.call(this, item) : false;
    };

    //-----------------------------------------------------------------------------
    // Game_Actor
    //
    // The game object class for an actor.

    const _Game_Actor_calcEquipItemPerformance = Game_Actor.prototype.calcEquipItemPerformance;
    Game_Actor.prototype.calcEquipItemPerformance = function(item) {
        return this.checkEquipRequiriments(this, item) ? 
        _Game_Actor_calcEquipItemPerformance.call(this, item) : -2000;
    };

    const _Game_Actor_canEquip = Game_Actor.prototype.canEquip;
    Game_Actor.prototype.canEquip = function(item) {
        if (GabeMZ.EquipRequirements.hideEquip) {
            return this.checkEquipRequiriments(this, item) ? 
            _Game_Actor_canEquip.call(this, item) : false;
        }
        return _Game_Actor_canEquip.call(this, item);
    };

    Game_Actor.prototype.checkEquipRequiriments = function(actor, item) {
        let result = true;
        let reg = /<require\s+(\w+)\s+(\d+)>/g;
        let match;
        while (match = reg.exec(item.note)) {
            switch (match[1]) {
                case "level":
                    if (result) result = actor.level >= match[2];
                    break;
                case "maxhp":
                    if (result) result = actor.paramBase(0) >= match[2];
                    break;
                case "maxmp":
                    if (result) result = actor.paramBase(1) >= match[2];
                    break;
                case "attack":
                    if (result) result = actor.paramBase(2) >= match[2];
                    break;
                case "defense":
                    if (result) result = actor.paramBase(3) >= match[2];
                    break;
                case "magicAttack":
                    if (result) result = actor.paramBase(4) >= match[2];
                    break;
                case "magicDefense":
                    if (result) result = actor.paramBase(5) >= match[2];
                    break;
                case "agility":
                    if (result) result = actor.paramBase(6) >= match[2];
                    break;
                case "luck":
                    if (result) result = actor.paramBase(7) >= match[2];
                    break;
                case "actorId":
                    if (result) result = actor._actorId == match[2];
                    break;
                case "classId":
                    if (result) result = actor.classId == match[2];
                    break;
                case "switch":
                    if (result) result = $gameSwitches.value(match[2]);
                    break;
            }
        }
        return result;
    }

})();