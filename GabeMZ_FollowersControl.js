//============================================================================
// Gabe MZ - Followers Control
//----------------------------------------------------------------------------
// 20/04/21 | Version: 1.0.4 | Followers jump bug fix
// 26/08/20 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This plugin is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.4] Allows to control the followers via the event commands.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 * @orderAfter GabeMZ_SmartFollowers
 * 
 * @help Gabe MZ - Followers Control
 *  - This plugin is released under the zlib License.
 * 
 * To control the followers just use the Plugin Commands provided by this 
 * plugin. When ON it is possible to move followers through the Move 
 * Route. It is also possible display Ballon Icons and Animations on the 
 * specified followers.
 *
 * Plugin Commands:
 *   Switch Follower Control
 *       | This command toggles the effect of the script.
 *       | When ON, followers will no longer follow the player. When the event
 *       | command Move Route is called marked as the player, the follower of 
 *       | the given ID (provided via the other Plugin Command) will move.
 *       | When OFF, followers will follow the player again as they normally
 *       | do.
 * 
 *   Set Follower to Control
 *       | This command is used to define which of the followers will receive 
 *       | the Move Route commands (when it is marked as the player). When the 
 *       | ID is set to 0 the player will receive the commands, when 1 is the 
 *       | first follower and so on.
 * 
 * For support and new plugins join our Discord server: 
 * https://discord.gg/GG85QRz
 * 
 * @command switchFollowerControl
 * @text Switch Follower Control
 * @desc Turn ON or OFF the Follower Control.
 * 
 * @arg followerControl
 * @text Follower Control
 * @desc ON: Followers stop following the player and can receive commands. OFF: Followers follow the player.    
 * @type boolean
 * @default false
 * 
 * @command setFollowerControllID
 * @text Set Follower to Control
 * @desc Set a Follower by ID to control it the Move Route.
 * 
 * @arg followerID
 * @text Follower ID
 * @desc Set the ID of a Follower to move it a Move Route. When 0 the effects will be received by the player.
 * @type number
 * @default 0
 *
 */

/*:pt
 * @target MZ
 * @plugindesc Permite controlar os seguidores através do comando de evento Mover Evento.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 * 
 * @help Gabe MZ - Followers Control
 *  - Esse plugin foi disponibilizado sob a licença zlib.
 * 
 * Para controlar os seguidores basta usar os Comandos do Plugin fornecidos 
 * por este Plugin. Quando ON, é possível mover seguidores através do comando
 * Mover Evento. Também é possível exibir balões de expressão e animações no
 * seguidor especificado.
 *
 * Comandos de Plugin:
 *   Switch Follower Control
 *       | Esse comando alterna o efeito do plugin.
 *       | Quando ON, os seguidores não seguirão o jogador. Quando o comando de
 *       | evento Mover Evento for chamado assinalado para mover o jogador o 
 *       | seguidor do ID definido (provido pelo outro Comando de Plugin) irá 
 *       | se mover.
 *       | Quando OFF, os seguidores seguirão o jogador como normalmente fazem.
 * 
 *   Set Follower to Control
 *       | Esse comando é usado para definir o ID do seguidor que receberá os
 *       | comandos do comando de evento Mover Evento quando este estiver assinalado
 *       | para mover o jogador. Quando o ID definido for 0 o jogador irá se mover,
 *       | quando for 1 o primeiro seguidor irá se mover e assim por diante. 
 * 
 * Para suporte e acompanhar o lançamento de novos plugins nos acompanhe
 * através do nosso servidor do Discord:
 * https://discord.gg/GG85QRz
 * 
 * @command switchFollowerControl
 * @text Switch Follower Control
 * @desc Ative ou desative o controle dos seguidores.
 * 
 * @arg followerControl
 * @text Follower Control
 * @desc Ative ou desative o controle dos seguidores.
 * @type boolean
 * @default false
 * 
 * @command setFollowerControllID
 * @text Set Follower to Control
 * @desc Defina o ID de um seguidor para receber comandos. 
 * 
 * @arg followerID
 * @text Follower ID
 * @desc  Defina o ID de um seguidor para receber comandos. Quando for 0 o jogador receberá os comandos.
 * @type number
 * @default 0
 *
 */

var Imported = Imported || {};
Imported.GMZ_FollowersControl = true;

var GabeMZ                      = GabeMZ || {};
GabeMZ.FollowersControl         = GabeMZ.FollowersControl || {};
GabeMZ.FollowersControl.VERSION = [1, 0, 4];

(() => {

    const pluginName = "GabeMZ_FollowersControl";
    GabeMZ.params = PluginManager.parameters(pluginName);
    GabeMZ.FollowersControl.followerControl = false;
    GabeMZ.FollowersControl.followerID = 0;

    //-----------------------------------------------------------------------------
    // PluginManager
    //
    // The static class that manages the plugins.

    PluginManager.registerCommand(pluginName, "switchFollowerControl", args => {
        GabeMZ.FollowersControl.followerControl = JSON.parse(args.followerControl);
    });

    PluginManager.registerCommand(pluginName, "setFollowerControllID", args => {
        GabeMZ.FollowersControl.followerID = parseInt(args.followerID);
    });

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //
    // The interpreter for running event commands.

    let _Game_Interpreter_character = Game_Interpreter.prototype.character;
    Game_Interpreter.prototype.character = function(param) {
        if ($gameParty.inBattle()) {
            return null;
        } else if (param < 0 && GabeMZ.FollowersControl.followerControl &&
            GabeMZ.FollowersControl.followerID > 0) {
            return $gamePlayer.followers().follower(GabeMZ.FollowersControl.followerID - 1);
        } else {
            return _Game_Interpreter_character.call(this, param);
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Follower
    //
    // The game object class for a follower. A follower is an allied character,
    // other than the front character, displayed in the party.

    let _Game_Follower_update = Game_Follower.prototype.update;
    Game_Follower.prototype.update = function() {
        if (GabeMZ.FollowersControl.followerControl) {
            Game_Character.prototype.update.call(this);
        } else {
            _Game_Follower_update.call(this);
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Followers
    //
    // The wrapper class for a follower array.

    let _Game_Followers_updateMove = Game_Followers.prototype.updateMove;
    Game_Followers.prototype.updateMove = function() {
        if (!GabeMZ.FollowersControl.followerControl) _Game_Followers_updateMove.call(this);
    };

    let _Game_Followers_jumpAll = Game_Followers.prototype.jumpAll;
    Game_Followers.prototype.jumpAll = function() {
        if (!GabeMZ.FollowersControl.followerControl) _Game_Followers_jumpAll.call(this);
    };

})();