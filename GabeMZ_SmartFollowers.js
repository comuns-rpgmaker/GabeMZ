//============================================================================
// Gabe MZ - Smart Control
//----------------------------------------------------------------------------
// 27/08/20 | Version: 1.0.0
// This plugin is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc Changes the way followers behave for a more intelligent movement.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 * @orderBefore GabeMZ_FollowersControl
 * 
 * @help Gabe MZ - Smart Control
 *  - This plugin is released under the zlib License.
 *  - Thanks to Reisen for the original source.
 * 
 * This is a very simple plugin that changes the behavior of followers, so that
 * they move only when it is really necessary.
 *
 * In addition, it is possible to configure whether they look in the direction of
 * the next follower when they are standing.
 * 
 * Plugin Commands:
 *   Switch Turn Toward Next Follower
 *       | This command allows to change whether followers look in the direction
 *       | of the next follower or not.
 * 
 * For support and new plugins join our Discord server: 
 * https://discord.gg/GG85QRz
 * 
 * @param turnToward
 * @text Turn Toward Next Follower
 * @desc When ON, followers look in the direction of the next follower when standing still.
 * @type boolean
 * @default true
 * 
 * @command setTurnToward
 * @text Switch Turn Toward Next Follower
 * @desc Switch Turn Toward Next Follower Setting
 * 
 * @arg turnToward
 * @text Turn Toward Next Follower
 * @desc When ON, followers look in the direction of the next follower when standing still.
 * @type boolean
 * @default true
 */

/*:pt
 * @target MZ
 * @plugindesc Muda o comportamento dos seguidores para que se movam de maneira mais inteligente.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 * 
 * @help Gabe MZ - Smart Control
 *  - Esse plugin foi disponibilizado sob a licença zlib.
 *  - Agradecimento ao Reisen pelo código original.
 * 
 * Esse é um plugin bem simples que altera o comportamento dos seguidores, de modo que eles se
 * movam apenas quando é necessário.
 *
 * Em adição, é possível configurar se os seguidores olharão na direção do próximo seguidores
 * quando estiverem parados.
 * 
 * Comandos de Plugin:
 *   Switch Turn Toward Next Follower
 *       | Esse comando permite alterar se os seguidores olharão na direção do próximo seguidor
 *       | quando estiverem parados ou não.
 * 
 * Para suporte e acompanhar o lançamento de novos plugins nos acompanhe
 * através do nosso servidor do Discord:
 * https://discord.gg/GG85QRz
 * 
 * @param turnToward
 * @text Turn Toward Next Follower
 * @desc Quando ON, os seguidores olharão na direção do próximo seguidor quando parados.
 * @type boolean
 * @default true
 * 
 * @command setTurnToward
 * @text Switch Turn Toward Next Follower
 * @desc Alterne se os seguidores olharão na direção do próximo seguidor ou não.
 * 
 * @arg turnToward
 * @text Turn Toward Next Follower
 * @desc Quando ON, os seguidores olharão na direção do próximo seguidor quando parados.
 * @type boolean
 * @default true
 */

var GabeMZ                    = GabeMZ || {};
GabeMZ.SmartFollowers         = GabeMZ.SmartFollowers || {};
GabeMZ.SmartFollowers.VERSION = [0, 0, 1];

(() => {

    const pluginName = "GabeMZ_SmartFollowers";
    GabeMZ.params = PluginManager.parameters(pluginName);
    GabeMZ.SmartFollowers.turnToward = JSON.parse(GabeMZ.params.turnToward);

    //-----------------------------------------------------------------------------
    // PluginManager
    //
    // The static class that manages the plugins.

    PluginManager.registerCommand(pluginName, "setTurnToward", args => {
        GabeMZ.SmartFollowers.turnToward = JSON.parse(args.turnToward);
    });

    //-----------------------------------------------------------------------------
    // Game_CharacterBase
    //
    // The superclass of Game_Character. It handles basic information, such as
    // coordinates and images, shared by all characters.

    let _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        _Game_CharacterBase_initMembers.call(this);
        this._previousPosition = {x: 0, y: 0};
        this._isMovingStraight = true
    }

    let _Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
    Game_CharacterBase.prototype.moveStraight = function(d) {
        _Game_CharacterBase_moveStraight.call(this, d);
        this._isMovingStraight = true;
    };

    let _Game_CharacterBase_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
    Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
        _Game_CharacterBase_moveDiagonally.call(this, horz, vert);
        this._isMovingStraight = false;
    };

    Game_CharacterBase.prototype.previousPosition = function() {
        return this._previousPosition;
    }

    Game_CharacterBase.prototype.isMovingStraight = function() {
        return this._isMovingStraight;
    }
    
    //-----------------------------------------------------------------------------
    // Game_Player
    //
    // The game object class for the player. It contains event starting
    // determinants and map scrolling functions.

    Game_Player.prototype.moveStraight = function(d) {
        Game_Character.prototype.moveStraight.call(this, d);
        this._followers.updateMove();
    };
    
    Game_Player.prototype.moveDiagonally = function(horz, vert) {
        Game_Character.prototype.moveDiagonally.call(this, horz, vert);
        this._followers.updateMove();
    };

    //-----------------------------------------------------------------------------
    // Game_Follower
    //
    // The game object class for a follower. A follower is an allied character,
    // other than the front character, displayed in the party.

    Game_Follower.prototype.chaseCharacter = function(character) {
        const sx = this.deltaXFrom(character.x);
        const sy = this.deltaYFrom(character.y);
        const px = this.deltaXFrom(character.previousPosition().x);
        const py = this.deltaYFrom(character.previousPosition().y);
        const asx = Math.abs(sx);
        const asy = Math.abs(sy);
        this._previousPosition = {x: this.x, y: this.y};
        if (((asx > 1 && asy >= 1) || (asx >= 1 && asy > 1)) && character.isMovingStraight() 
            && this.canPassDiagonally(this.x, this.y, sx > 0 ? 4 : 6, sy > 0 ? 8 : 2)) {
            this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
        } else if (asx > 1 && asy > 1) {
            this.moveDiagonally(px > 0 ? 4 : 6, py > 0 ? 8 : 2);
        } else if (asx > 1 && this.canPass(this.x, this.y, sx > 0 ? 4 : 6)) {
            this.moveStraight(sx > 0 ? 4 : 6);
        } else if (asy > 1 && this.canPass(this.x, this.y, sy > 0 ? 8 : 2)) {
            this.moveStraight(sy > 0 ? 8 : 2);
        } else if (asx > 1 || asy > 1) {
            this.moveDiagonally(px > 0 ? 4 : 6, py > 0 ? 8 : 2);
        } else {
            if (GabeMZ.SmartFollowers.turnToward) this.turnTowardCharacter(character);
        }
        this.setMoveSpeed($gamePlayer.realMoveSpeed());
    };

    let _Game_Follower_update = Game_Follower.prototype.update;
    Game_Follower.prototype.update = function() {
        _Game_Follower_update.call(this);
        this.setThrough(false);
    }

    //-----------------------------------------------------------------------------
    // Game_Followers
    //
    // The wrapper class for a follower array.
    Game_Followers.prototype.updateMove = function() {
        for (let i = 0; i <= this._data.length - 1; i++) {
            const precedingCharacter = i > 0 ? this._data[i - 1] : $gamePlayer;
            this._data[i].chaseCharacter(precedingCharacter);
        }
    };

})();