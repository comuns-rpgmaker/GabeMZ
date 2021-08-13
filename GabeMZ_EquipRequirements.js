//============================================================================
// Gabe MZ - Equip Requirements
//----------------------------------------------------------------------------
// 13/08/21 | Version: 1.0.2 | Class ID note tag bug fix
// 11/08/21 | Version: 1.0.1 | Added some new equipment note tags
// 08/09/20 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This software is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.2] Allows to add extra requirements to the equipments.
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
 *   <require skill id>
 *       | Requires that actor have learned the specified skill id.
 *   <require switch id>
 *       | Requires the switch of the specified id is ON.
 *   <require var variableId value>
 *       | Requires the variable of the specified id is equal 
 *       | to or greater than the specified value.
 *   <require cparam cparamId value>
 *       | Requires that actor has the specified custom parameter 
 *       | equal to or greater than the specified value. NOTE: Only 
 *       | compatible if using the plugin Gabe MZ  - Custom Parameters.
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
GabeMZ.EquipRequirements.VERSION = [1, 0, 2];

(() => {

    const pluginName = "GabeMZ_EquipRequirements";
    const params = PluginManager.parameters(pluginName);

    GabeMZ.EquipRequirements.hideEquip = JSON.parse(params.hideEquip);

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
        let reg = /<require\s+([\w\s]*?)>/g; 
        let match;
        while (match = reg.exec(item.note)) {
            match = match[1].split(/\s/);
            switch (match[0]) {
                case "level":
                    if (result) result = actor.level >= match[1];
                    break;
                case "maxhp":
                    if (result) result = actor.paramBase(0) >= match[1];
                    break;
                case "maxmp":
                    if (result) result = actor.paramBase(1) >= match[1];
                    break;
                case "attack":
                    if (result) result = actor.atk >= match[1];
                    break;
                case "defense":
                    if (result) result = actor.def >= match[1];
                    break;
                case "magicAttack":
                    if (result) result = actor.mat >= match[1];
                    break;
                case "magicDefense":
                    if (result) result = actor.mdf >= match[1];
                    break;
                case "agility":
                    if (result) result = actor.agi >= match[1];
                    break;
                case "luck":
                    if (result) result = actor.luk >= match[1];
                    break;
                case "actorId":
                    if (result) result = actor.actorId() == match[1];
                    break;
                case "classId":
                    if (result) result = actor.isClass($dataClasses[match[1]]);
                    break;
                case "skill":
                    if (result) result = actor.isLearnedSkill(parseInt(match[1]));
                    break;
                case "switch":
                    if (result) result = $gameSwitches.value(match[1]);
                    break;
                case "var":
                    if (result) result = $gameVariables.value(match[1]) >= match[2];
                    break;
                case "cparam": {
                    if (Imported.GMZ_CustomParameters) {
                        if (result) result = this.cparam(match[1]) >= match[2];
                    }
                    break;
                }
            }
        }
        return result;
    };

    const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        _Game_Actor_changeEquip.call(this, slotId, item);
        this.releaseUnequippableItems(true);
    };

})();