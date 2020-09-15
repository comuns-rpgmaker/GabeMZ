//============================================================================
// Gabe MZ - Picture Spritesheet
//----------------------------------------------------------------------------
// 14/09/20 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This software is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc Allows to transform the pictures into a animated spritesheets.
 * @author Gabe (Gabriel Nascimento)
 * @url http://patreon.com/gabriel_nfd
 * 
 * @help Gabe MZ - Picture Spritesheet
 *  - This plugin is released under the zlib License.
 * 
 * This plugin allows to turn pictures into a animated spritesheets.
 * To use it just call the Plugin Commands.
 * 
 * Plugin Commands:
 *   Single Spritesheet
 *       | This command allows to set a single picture to turn a spritesheet.
 * 
 *   Multi Spritesheet
 *       | This command allows to set multiple pictures to turn a spritesheet
 *       | each with its own spritesheet settings.
 * 
 *   Range of Spritesheet
 *       | This command allows to set a range of pictures to turn a spritesheet
 *       | all with the same spritesheet settings.
 * 
 *   Erase Spritesheet
 *       | This command allows to erase the spritesheet settings from one or
 *       | more pictures.
 * 
 *   Erase Range of Spritesheet
 *       | This command allows to erase the spritesheet settings from a range
 *       | of pictures.
 * 
 * For support and new plugins join our Discord server: 
 * https://discord.gg/GG85QRz
 * 
 * @command setSingleSpritesheet
 * @text Single Spritesheet
 * @desc Set a single picture to spritesheet.
 * 
 * @arg spriteSheetSettings
 * @text Spritesheet Settings
 * @desc Set the spritesheet settings.
 * @type struct<spriteSheetSettings>
 * 
 * @command setMultiSpritesheet
 * @text Multi Spritesheet
 * @desc Set multi pictures to spritesheet.
 * 
 * @arg spriteSheetSettings
 * @text Spritesheet Settings
 * @desc Set the spritesheet settings.
 * @type struct<spriteSheetSettings>[]
 * 
 * @command setRangeSpritesheet
 * @text Range of Spritesheet
 * @desc Set a range of pictures to spritesheet.
 * 
 * @arg from
 * @text From
 * @desc The first picture ID.
 * @type number
 * @min 1
 * @max 100
 * 
 * @arg to
 * @text To
 * @desc The last picture ID.
 * @type number
 * @min 1
 * @max 100
 * 
 * @arg spriteSheetSettings
 * @text Spritesheet Settings
 * @desc Set the spritesheet settings.
 * @type struct<singleSpriteSheetSettings>
 * 
 * @command eraseSpritesheet
 * @text Erase Spritesheet
 * @desc Erase a spritesheet from picture.
 * 
 * @arg id
 * @text Picture ID
 * @desc The picture ID.
 * @type number[]
 * @min 1
 * @max 100
 * 
 * @command eraseRangeSpritesheet
 * @text Erase Range of Spritesheet
 * @desc Erase a spritesheet from a range of pictures.
 *
 * @arg from
 * @text From
 * @desc The first picture ID.
 * @type number
 * @min 1
 * @max 100
 * 
 * @arg to
 * @text To
 * @desc The last picture ID.
 * @type number
 * @min 1
 * @max 100
 */

/*~struct~spriteSheetSettings:
 * @param id
 * @text Picture ID
 * @desc The picture ID.
 * @type number
 * @min 1
 * @max 100
 * 
 * @param width
 * @text Width Frame
 * @desc The spritesheet horizontal frame count.
 * @type number
 * @min 1
 * 
 * @param height
 * @text Height Frame
 * @desc The spritesheet vertical frame count.
 * @type number
 * @min 1
 * 
 * @param speed
 * @text Speed
 * @desc The spritesheet frame speed.
 * @type number
 * @min 1
 * 
 * @param loop
 * @text Loop
 * @desc ON: The spritesheet will be looping.
 * OFF: The spritesheet will run only once.
 * @type boolean
 * 
 * @param type
 * @text Type
 * @desc Normal: The spritesheet will run normally.
 * InOut: The spritesheet will run in pingpong style.
 * @type select
 * @option Normal
 * @value 0
 * @option InOut
 * @value 1
 */

/*~struct~singleSpriteSheetSettings:
 * @param width
 * @text Width Frame
 * @desc The spritesheet horizontal frame count.
 * @type number
 * @min 1
 * 
 * @param height
 * @text Height Frame
 * @desc The spritesheet vertical frame count.
 * @type number
 * @min 1
 * 
 * @param speed
 * @text Speed
 * @desc The spritesheet frame speed.
 * @type number
 * @min 1
 * 
 * @param loop
 * @text Loop
 * @desc ON: The spritesheet will be looping.
 * OFF: The spritesheet will run only once.
 * @type boolean
 * 
 * @param type
 * @text Type
 * @desc Normal: The spritesheet will run normally.
 * InOut: The spritesheet will run in pingpong style.
 * @type select
 * @option Normal
 * @value 0
 * @option InOut
 * @value 1
 */

var GabeMZ                        = GabeMZ || {};
GabeMZ.PictureSpritesheet         = GabeMZ.PictureSpritesheet || {};
GabeMZ.PictureSpritesheet.VERSION = [1, 0, 0];

(() => {

    const pluginName = "GabeMZ_PictureSpritesheet";
    GabeMZ.PictureSpritesheet.spriteSheetInfo = [];
    
    //-----------------------------------------------------------------------------
    // PluginManager
    //
    // The static class that manages the plugins.

    PluginManager.registerCommand(pluginName, "setSingleSpritesheet", args => {
        const settings = JSON.parse(args.spriteSheetSettings);
        const id = parseInt(settings.id);
        const w = parseInt(settings.width);
        const h = parseInt(settings.height);
        const f = w * h - 1;
        const s = parseInt(settings.speed);
        const l = JSON.parse(settings.loop);
        const t = JSON.parse(settings.type);
        GabeMZ.PictureSpritesheet.spriteSheetInfo[id] = {id: id, w: w, h: h, f: f, s: s, l: l, t: t};
        if ($gameScreen.picture(id)) $gameScreen.picture(id).setSpriteSheet(w, h, f, s, l, t);
    });

    PluginManager.registerCommand(pluginName, "setMultiSpritesheet", args => {
        const settings = JSON.parse(args.spriteSheetSettings);
        settings.forEach(picture => {
            picture = JSON.parse(picture)
            const id = parseInt(picture.id);
            const w = parseInt(picture.width);
            const h = parseInt(picture.height);
            const f = w * h - 1;
            const s = parseInt(picture.speed);
            const l = JSON.parse(picture.loop);
            const t = JSON.parse(picture.type);
            GabeMZ.PictureSpritesheet.spriteSheetInfo[id] = {id: id, w: w, h: h, f: f, s: s, l: l, t: t};
            if ($gameScreen.picture(id)) $gameScreen.picture(id).setSpriteSheet(w, h, f, s, l, t);
        });
    });

    PluginManager.registerCommand(pluginName, "setRangeSpritesheet", args => {
        const settings = JSON.parse(args.spriteSheetSettings);
        let from = parseInt(args.from);
        const to = parseInt(args.to);
        for (; from <= to; from++) {
            const id = from;
            const w = parseInt(settings.width);
            const h = parseInt(settings.height);
            const f = w * h - 1;
            const s = parseInt(settings.speed);
            const l = JSON.parse(settings.loop);
            const t = JSON.parse(settings.type);
            GabeMZ.PictureSpritesheet.spriteSheetInfo[id] = {id: id, w: w, h: h, f: f, s: s, l: l, t: t};
            if ($gameScreen.picture(id)) $gameScreen.picture(id).setSpriteSheet(w, h, f, s, l, t);
        };
    });

    PluginManager.registerCommand(pluginName, "eraseSpritesheet", args => {
        const settings = JSON.parse(args.id);
        settings.forEach(id => {
            id = parseInt(id);
            GabeMZ.PictureSpritesheet.spriteSheetInfo[id] = null;
            if ($gameScreen.picture(id)) $gameScreen.picture(id).desetSpriteSheet();
        })
    });

    PluginManager.registerCommand(pluginName, "eraseRangeSpritesheet", args => {
        let from = parseInt(args.from);
        const to = parseInt(args.to);
        for (; from < to; from++) {
            const id = from;
            GabeMZ.PictureSpritesheet.spriteSheetInfo[id] = null;
            if ($gameScreen.picture(id)) $gameScreen.picture(id).desetSpriteSheet();
        }
    });

    //-----------------------------------------------------------------------------
    // Game_Screen
    //
    // The game object class for screen effect data, such as changes in color tone
    // and flashes.

    const _Game_Screen_showPicture = Game_Screen.prototype.showPicture;
    Game_Screen.prototype.showPicture = function(pictureId) {
        _Game_Screen_showPicture.call(this, ...arguments);
        const realPictureId = this.realPictureId(pictureId);
        if (GabeMZ.PictureSpritesheet.spriteSheetInfo[realPictureId]) {
            const w = GabeMZ.PictureSpritesheet.spriteSheetInfo[realPictureId].w;
            const h = GabeMZ.PictureSpritesheet.spriteSheetInfo[realPictureId].h;
            const f = GabeMZ.PictureSpritesheet.spriteSheetInfo[realPictureId].f;
            const s = GabeMZ.PictureSpritesheet.spriteSheetInfo[realPictureId].s;
            const l = GabeMZ.PictureSpritesheet.spriteSheetInfo[realPictureId].l;
            const t = GabeMZ.PictureSpritesheet.spriteSheetInfo[realPictureId].t;
            this._pictures[realPictureId].setSpriteSheet(w, h, f, s, l, t);
        }
    };

    const _Game_Screen_erasePicture = Game_Screen.prototype.erasePicture;
    Game_Screen.prototype.erasePicture = function(pictureId) {
        _Game_Screen_erasePicture.call(this, ...arguments);
        const realPictureId = this.realPictureId(pictureId);
        GabeMZ.PictureSpritesheet.spriteSheetInfo[realPictureId] = null;
    };

    //-----------------------------------------------------------------------------
    // Game_Picture
    //
    // The game object class for a picture.

    const _Game_Picture_initBasic = Game_Picture.prototype.initBasic;
    Game_Picture.prototype.initBasic = function() {
        _Game_Picture_initBasic.call(this);
        this._spriteSheet = {};
        this._isSpriteSheet = false;
        this._aniFrame = 0;
        this._aniCol = 0;
        this._aniRow = 0;
        this._timer = 0;
        this._isLooped = false;
        this._isReversal = false;
        this._isSpriteSheet = true;
    };

    Game_Picture.prototype.setSpriteSheet = function(w, h, f, s, l, t) {
        this._spriteSheet = {
            width: w,
            height: h,
            frames: f,
            speed: s,
            loop: l,
            type: t
        }
        this._aniFrame = 0;
        this._aniCol   = 0;
        this._aniRow   = 0;
        this._timer = 0;
        this._isLooped = false;
        this._isReversal = false;
        this._isSpriteSheet = true;
    };

    Game_Picture.prototype.desetSpriteSheet = function() {
        this._spriteSheet = {};
        this._isSpriteSheet = false;
    };

    Game_Picture.prototype.spriteSheet = function() {
        return this._spriteSheet;
    };

    Game_Picture.prototype.isSpriteSheet = function() {
        return this._isSpriteSheet;
    };

    const _Game_Picture_update = Game_Picture.prototype.update;
    Game_Picture.prototype.update = function() {
        _Game_Picture_update.call(this);
        this.updateSpriteSheet();
    };

    Game_Picture.prototype.updateSpriteSheet = function() {
        if (this._isSpriteSheet) {
            if (this._timer == 0) this.updateAnimFrame();
            this.updateTimer();
        }
    };

    Game_Picture.prototype.updateTimer = function() {
        if (this._isLooped) return
        if (this._timer < this._spriteSheet.speed) {
            this._timer++
        } else {
            this._timer = 0
        }
    };

    Game_Picture.prototype.updateAnimFrame = function() {
        if (this.currentCond()) {
            if (this._isReversal) {
                this._aniFrame--;
                this._aniCol--;
            } else {
                this._aniFrame++;
                this._aniCol++;
            }
        } else {
            if (this._spriteSheet.loop) {
                if (this._spriteSheet.type == 1 && !this._isReversal) {
                    this._aniFrame--;
                    this._aniCol--;
                    this._isReversal = true;
                } else {
                    this._aniFrame = 0;
                    this._aniCol = 0;
                    this._aniRow = 0;
                    this._isReversal = false;
                }
            } else {
                this._isLooped = true;
            }
        }
        if (this._isReversal) {
            if (this._aniCol < 0) {
                this._aniCol = this._spriteSheet.width - 1;
                this._aniRow--;
            }
        } else {
            if (this._aniCol == this._spriteSheet.width) {
                this._aniCol = 0;
                this._aniRow++;
            }
        }
    };

    Game_Picture.prototype.currentCond = function() {
        if (this._isReversal) {
            return this._aniFrame > 1;
        } else {
            return this._aniFrame < this._spriteSheet.frames;
        }
    }

    Game_Picture.prototype.currentFrameRect = function(w, h) {
        const width = Math.floor(w / this._spriteSheet.width);
        const height = Math.floor(h / this._spriteSheet.height);
        const x = width * this._aniCol;
        const y = height * this._aniRow;
        return new Rectangle(x, y, width, height);
    };

    //-----------------------------------------------------------------------------
    // Sprite_Picture
    //
    // The sprite for displaying a picture.

    const _Sprite_Picture_update = Sprite_Picture.prototype.update;
    Sprite_Picture.prototype.update = function() {
        _Sprite_Picture_update.call(this);
        const picture = this.picture();
        if (this.bitmap && picture.isSpriteSheet()) this.bitmap.addLoadListener(() => {
            this.texture.frame = (picture.currentFrameRect(this.bitmap.width, this.bitmap.height))
        });
    };

})();