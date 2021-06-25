//============================================================================
// Gabe MZ - Smart Followers
//----------------------------------------------------------------------------
// 24/06/21 | Version: 1.1.1 | Ladders and event collision bug fix
// 22/06/21 | Version: 1.1.0 | Improved the followers general behavior
// 04/01/21 | Version: 1.0.2 | Diagonal movement issues bug fix
// 27/08/20 | Version: 1.0.1 | Followers gathering bux fix
// 27/08/20 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This plugin is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.1.1] Changes the way followers behave for a more intelligent movement.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 * @orderBefore GabeMZ_FollowersControl
 * 
 * @help Gabe MZ - Smart Followers
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
 * @param preventDiagonalClip
 * @text Prevent Diagonal Clip
 * @desc When ON, prevent follower diagonal movemnt clip.
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
 * @plugindesc [v1.1.1] Muda o comportamento dos seguidores para que se movam de maneira mais inteligente.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 * 
 * @help Gabe MZ - Smart Followers
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
 * @param preventDiagonalClip
 * @text Prevent Diagonal Clip
 * @desc Quando ON, previnirá que os seguidores façam movimentos diagonais que clipem nos tiles.
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

var Imported = Imported || {};
Imported.GMZ_SmartFollowers = true;

var GabeMZ                    = GabeMZ || {};
GabeMZ.SmartFollowers         = GabeMZ.SmartFollowers || {};
GabeMZ.SmartFollowers.VERSION = [1, 1, 1];

(() => {

    const pluginName = "GabeMZ_SmartFollowers";
    GabeMZ.params = PluginManager.parameters(pluginName);
    GabeMZ.SmartFollowers.turnToward = GabeMZ.params.turnToward == "true";
    GabeMZ.SmartFollowers.preventDiagonalClip = GabeMZ.params.preventDiagonalClip == "true";
    
    //-----------------------------------------------------------------------------
    // PluginManager
    //
    // The static class that manages the plugins.

    PluginManager.registerCommand(pluginName, "setTurnToward", args => {
        GabeMZ.SmartFollowers.turnToward = args.turnToward == "true";
    });

    //-----------------------------------------------------------------------------
    // Game_CharacterBase
    //
    // The superclass of Game_Character. It handles basic information, such as
    // coordinates and images, shared by all characters.

    const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        _Game_CharacterBase_initMembers.call(this);
        this._previousPosition = { x: 0, y: 0 };
        this._isMovingStraight = true
    }

    const _Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
    Game_CharacterBase.prototype.moveStraight = function(d) {
        _Game_CharacterBase_moveStraight.call(this, d);
        this._isMovingStraight = true;
    };

    const _Game_CharacterBase_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
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
        this._previousPosition = { x: this.x, y: this.y };
        Game_Character.prototype.moveStraight.call(this, d);
        this._followers.updateMove();
    };
    
    Game_Player.prototype.moveDiagonally = function(horz, vert) {
        this._previousPosition = { x: this.x, y: this.y };
        Game_Character.prototype.moveDiagonally.call(this, horz, vert);
        this._followers.updateMove();
    };

    //-----------------------------------------------------------------------------
    // Game_Follower
    //
    // The game object class for a follower. A follower is an allied character,
    // other than the front character, displayed in the party.

    const _Game_Follower_chaseCharacter = Game_Follower.prototype.chaseCharacter;
    Game_Follower.prototype.chaseCharacter = function(character) {
        if ($gamePlayer.areFollowersGathering()) {
            this.setThrough(true);
            _Game_Follower_chaseCharacter.call(this, character);
        } else {
            this._doChaseCharacter(character);
        }
    };

    Game_Follower.prototype._doChaseCharacter = function(character) {
        this.setThrough(false);
        this._previousPosition = { x: this.x, y: this.y };

        const sx = this.deltaXFrom(character.x);
        const sy = this.deltaYFrom(character.y);
        
        if (sx == 0 && sy == 0) {
            if (GabeMZ.SmartFollowers.turnToward) {
                this.turnTowardCharacter(character);
            }
        } else {
            const px = this.deltaXFrom(character.previousPosition().x);
            const py = this.deltaYFrom(character.previousPosition().y);

            this._chaseWithDelta(character, sx, sy, px, py);
        }

        this.setMoveSpeed($gamePlayer.realMoveSpeed());
    };

    Game_Follower.prototype._chaseWithDelta = function(character, sx, sy, px, py) {
        const asx = Math.abs(sx);
        const asy = Math.abs(sy);

        const dirX = sx > 0 ? 4 : 6;
        const dirY = sy > 0 ? 8 : 2;

        if (asx + asy > 2 && character.isMovingStraight()
            && this.canPassDiagonally(this.x, this.y, dirX, dirY)) {
            this.moveDiagonally(dirX, dirY);
        } else if (asx > 1 && asy > 1) {
            this.moveDiagonally(px > 0 ? 4 : 6, py > 0 ? 8 : 2);
        } else if (asx > 1 && this.canPass(this.x, this.y, dirX)) {
            this.moveStraight(dirX);
        } else if (asy > 1 && this.canPass(this.x, this.y, dirY)) {
            this.moveStraight(dirY);
        } else if (asx > 1 || asy > 1) {
            this.moveDiagonally(px > 0 ? 4 : 6, py > 0 ? 8 : 2);
        } else if (asx + asy > 1 && character.isMovingStraight()
            && !this.canPassDiagonally(this.x, this.y, dirX, dirY)
            && GabeMZ.SmartFollowers.preventDiagonalClip) {
                if (character.direction() == 2 || character.direction() == 8) {
                    this.moveStraight(dirX);
                } else {
                    this.moveStraight(dirY);
                }
        } else {
            if (GabeMZ.SmartFollowers.turnToward) this.turnTowardCharacter(character);
        }
    }

    const _Game_Follower_canPass = Game_Follower.prototype.canPass;
    Game_Follower.prototype.canPass = function(x, y, d, diagonal) {
        const canPass = _Game_Follower_canPass.call(this, ...arguments);;
        if (diagonal) {
            const x2 = $gameMap.roundXWithDirection(x, d);
            const y2 = $gameMap.roundYWithDirection(y, d);
            if (!canPass && this.isCollidedWithCharacters(x2, y2)) {
                return true;
            }
        }
        return canPass;
    };

    const _Game_Follower_canPassDiagonally = Game_Follower.prototype.canPassDiagonally;
    Game_Follower.prototype.canPassDiagonally = function(x, y, horz, vert) {
        if (!GabeMZ.SmartFollowers.preventDiagonalClip) return _Game_Follower_canPassDiagonally.call(this, ...arguments);
        const x2 = $gameMap.roundXWithDirection(x, horz);
        const y2 = $gameMap.roundYWithDirection(y, vert);
        return this.canPass(x, y, horz, true) && (this.canPass(x, y, vert, true) &&
            this.canPass(x, y2, horz, true) && this.canPass(x2, y, vert, true));
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