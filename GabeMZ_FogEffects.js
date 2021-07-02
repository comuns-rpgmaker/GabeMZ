//============================================================================
// Gabe MZ - Fog Effects
//----------------------------------------------------------------------------
// 29/06/21 | Version: 2.1.0 | Added opacity and tone control
// 14/01/21 | Version: 2.0.2 | PT-BR header typo fix
// 03/09/20 | Version: 2.0.1 | Scene return bug fix
// 02/09/20 | Version: 2.0.0 | Completely rewritten code
// 28/09/20 | Version> 1.1.0 | Redone fog effects layer system 
// 26/08/20 | Version: 1.0.1 | Cleaned code and help section improved
// 25/08/20 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This software is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc [v2.1.0] Allows to create and display fog effects on maps and battles.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 * 
 * @help Gabe MZ - Fog Effects
 *  - This plugin is released under the zlib License.
 * 
 * This plugin provides a option to create and display fog effects on maps 
 * and battles.
 * 
 * The first step are set the Fog Settings in this plugin parameters. After 
 * that, you can add a fog effect in the map inserting the specific tag in the 
 * Map Notes or using the provided Plugin Commands.
 * 
 * * The fog picture files need to place in img/fogs/
 * 
 * Plugin Commands:
 *   Set Fog Effect
 *       | This command allows to set and add a specific fog effect to a 
 *       | specific layer.
 * 
 *   Remove Fog Effect from Layer
 *       | This command allows to remove the fog effect from the specific 
 *       | layer.
 * 
 *   Set Fog Opacity
 *       | This command allows to control the opacity of the fog from 
 *       | the specified layer.
 *       
 *   Set Fog Tone
 *       | This command allows to control the tone of the fog from 
 *       | the specified layer.
 * 
 *   Clear Screen
 *       | This command clear all screen, removing all fog effects from 
 *       | all layers.
 * 
 *   Set Fog in Map
 *       | This command allows to set whether the fog effects will be 
 *       | displayed in the game maps.
 * 
 *   Set Fog in Battle
 *       | This command allows to set whether the fog effects will be 
 *       | displayed during battles.
 * 
 * Map Note Tag:
 *   <addFog layer: id>
 *       | This note tag add the fog effect from specific id to the
 *       | specific layer.
 * Usage Example:
 *   <addFog 1: 1> 
 *       | This tag adds the fog effects of ID 1 at layer 1.
 *   <addFog 4: 3> 
 *       | This tag adds the fog effects of ID 3 at layer 4.
 *   <addFog 2: 7> 
 *       | This tag adds the fog effects of ID 7 at layer 2.
 * 
 * For support and new plugins join our Discord server: 
 * https://discord.gg/GG85QRz
 * 
 * @param fogSettings
 * @text Fog Settings
 * @desc Set the Fog Setings to use in game maps
 * @type struct<fogSettingsStruct>[]
 * 
 * @param fogInMap
 * @text Fog in Map?
 * @desc Sets whether the fog effects will be displayed in the game maps by default.
 * @type boolean
 * @default true
 * 
 * @param fogInBattle
 * @text Fog in Battle?
 * @desc Sets whether the fog effects will be displayed during battles by default.
 * @type boolean
 * @default true
 * 
 * @param fogOptionsMenuCommand
 * @text Options Menu
 * @default ===============================================
 * 
 * @param commandEnabled
 * @text Options Command Enabled
 * @parent fogOptionsMenuCommand
 * @desc If true, show the fog control command in the options menu
 * @type boolean
 * @default true
 * 
 * @param commandName
 * @text Options Command Name
 * @parent fogOptionsMenuCommand
 * @desc Set the fog control command text
 * @type text
 * @default Fog Effects
 * 
 * @command setFogEffect
 * @text Set Fog Effect
 * @desc Set and add a fog effect to a specific layer
 * 
 * @arg settings
 * @text Set Fog Effect
 * @desc Set and add a fog effect to a specific layer
 * @type struct<setFogStruct>[]
 * 
 * @command removeFogEffectLayer
 * @text Remove Fog Effect from Layer
 * @desc Remove the fog effect from specified layer
 * 
 * @arg fogLayer
 * @text Fog Effect Layer
 * @desc Set the layer to which the fog effect will be removed
 * @type number[]
 * @min 1
 * 
 * @command clearScreen
 * @text Clear Screen
 * @desc Remove all fog effects from the screen
 * 
 * @command setFogOpacity
 * @text Set Fog Opacity
 * @desc Set the opacity of a specific fog layer
 * 
 * @arg layer
 * @text Layer
 * @desc Set the fog layer ID
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg opacity
 * @text Opacity
 * @desc Set the fog target opacity
 * @type number
 * @min 0
 * @default 255
 * 
 * @arg time
 * @text Time
 * @desc Set the fog opacity transition time
 * Instantly when 0
 * @min 0
 * @default 0
 * 
 * @command setFogTone
 * @text Set Fog Tone
 * @desc Set the tone of a specific fog layer
 * 
 * @arg layer
 * @text Layer
 * @desc Set the fog layer ID
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg tone
 * @text Tone
 * @desc Set the fog target tone
 * [Red, Green, Blue, Gray]
 * @type text
 * @default [0, 0, 0, 0]
 * 
 * @arg time
 * @text Time
 * @desc Set the fog tone transition time.
 * Instantly when 0
 * @min 0
 * @default 0
 * 
 * @command setFogInMap
 * @text Set Fog in Map.
 * @desc Sets whether the fog effects will be displayed in the game maps.
 * 
 * @arg fogInMap
 * @text Fog in Map?
 * @desc Sets whether the fog effects will be displayed in the game maps.
 * @type boolean
 * @default true
 * 
 * @command setFogInBattle
 * @text Set Fog in Battle
 * @desc Sets whether the fog effects will be displayed during battles.
 * 
 * @arg fogInBattle
 * @text Fog in Battle?
 * @desc Sets whether the fog effects will be displayed during battles.
 * @type boolean
 * @default true
 */

/*~struct~setFogStruct:
 * @param fogID
 * @text Fog Effect ID
 * @desc  Set the fog effect ID
 * @type number
 * @min 1
 * 
 * @param fogLayer
 * @text Fog Effect Layer
 * @desc Set the layer to which the fog effect will be added
 * @type number
 * @min 1
 */

/*~struct~fogSettingsStruct:
 * @param fogFilename
 * @text Fog Filename
 * @desc Set the Fog Filename
 * @type file
 * @dir img/fogs/
 * 
 * @param fogOpacity
 * @text Fog Opacity
 * @desc Set the Fog Opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @param fogBlendMode
 * @text Fog Blend Mode
 * @desc Set the Fog Blend Mode
 * @type select
 * @option Normal
 * @value 0
 * @option Addition
 * @value 1
 * @option Subtract
 * @value 2
 * @default 0
 * 
 * @param fogMoveX
 * @text Fog Move X
 * @desc Set the Fog X Movement
 * @type number
 * @decimals 1
 * @min -50
 * @max 50
 * @default 0
 * 
 * @param fogMoveY
 * @text Fog Move Y
 * @desc Set the Fog Y Movement 
 * @type number
 * @decimals 1
 * @min -50
 * @max 50
 * @default 0
 */

var Imported = Imported || {};
Imported.GMZ_FogEffects = true;

var GabeMZ                = GabeMZ || {};
GabeMZ.FogEffects         = GabeMZ.FogEffects || {};
GabeMZ.FogEffects.VERSION = [2, 1, 0];

(() => {

    const pluginName = "GabeMZ_FogEffects";
    GabeMZ.params = PluginManager.parameters(pluginName);
    GabeMZ.FogEffects.fogSettings = JSON.parse(GabeMZ.params.fogSettings);
    GabeMZ.FogEffects.fogInMap    = GabeMZ.params.fogInMap == "true";
    GabeMZ.FogEffects.fogInBattle = GabeMZ.params.fogInBattle == "true";
    GabeMZ.FogEffects.commandEnabled = GabeMZ.params.commandEnabled == "true";
    GabeMZ.FogEffects.commandName   = GabeMZ.params.commandName;
    GabeMZ.FogEffects.fogList = [];
    GabeMZ.FogEffects.currentMap = 0;

    //-----------------------------------------------------------------------------
    // PluginManager
    //
    // The static class that manages the plugins.

    PluginManager.registerCommand(pluginName, "setFogEffect", args => {
        GabeMZ.FogEffects.tempFog = [];
        settings = JSON.parse(args.settings);
        settings.forEach( arg => {
            arg = JSON.parse(arg);
            GabeMZ.FogEffects.tempFog.push([parseInt(arg.fogID), parseInt(arg.fogLayer)]);
        });
        GabeMZ.FogEffects.needRefresh = true;
    });

    PluginManager.registerCommand(pluginName, "removeFogEffectLayer", args => {
        GabeMZ.FogEffects.tempFog = [];
        const layers = JSON.parse(args.fogLayer);
        layers.forEach(layer => {GabeMZ.FogEffects.tempFog.push([null, parseInt(layer)])});
        GabeMZ.FogEffects.needRefresh = true;
    });

    PluginManager.registerCommand(pluginName, "clearScreen", args => {
        GabeMZ.FogEffects.tempFog = {id: null, layer: null};
        GabeMZ.FogEffects.needRefresh = true;
    });

    PluginManager.registerCommand(pluginName, "setFogOpacity", args => {
        const layer = parseInt(args.layer);
        const opacity = parseInt(args.opacity);
        const time = parseInt(args.time);
        if (!GabeMZ.FogEffects.fogList[layer]) return;
        GabeMZ.FogEffects.fogList[layer].setOpacityTarget(opacity, time);
    });

    PluginManager.registerCommand(pluginName, "setFogTone", args => {
        const layer = parseInt(args.layer);
        const tone = JSON.parse(args.tone);
        const time = parseInt(args.time);
        if (!GabeMZ.FogEffects.fogList[layer]) return;
        GabeMZ.FogEffects.fogList[layer].setToneTarget(tone, time);
    });

    PluginManager.registerCommand(pluginName, "setFogInMap", args => {
        GabeMZ.FogEffects.fogInMap = JSON.parse(args.fogInMap);
        if (!GabeMZ.FogEffects.fogInMap) {
            GabeMZ.FogEffects.tempFog = {id: null, layer: null};
            GabeMZ.FogEffects.needRefresh = true;
        }
    });

    PluginManager.registerCommand(pluginName, "setFogInBattle", args => {
        GabeMZ.FogEffects.fogInBattle = JSON.parse(args.fogInBattle);
    });

    //-----------------------------------------------------------------------------
    // ImageManager
    //
    // The static class that loads images, creates bitmap objects and retains them.

    ImageManager.loadFogs = function(filename) {
        return this.loadBitmap("img/fogs/", filename);
    };

    //-----------------------------------------------------------------------------
    // Sprite_Fog
    //-----------------------------------------------------------------------------

    function Sprite_Fog() {
        this.initialize(...arguments);
    }

    Sprite_Fog.prototype = Object.create(TilingSprite.prototype);
    Sprite_Fog.prototype.constructor = Sprite_Fog;

    Sprite_Fog.prototype.initialize = function() {
        TilingSprite.prototype.initialize.call(this, ...arguments);
        this.initMembers();
    };

    Sprite_Fog.prototype.initMembers = function() {
        this.constX = 0;
        this.constY = 0;
        this._opacityTarget = 0;
        this._opacityTime = 0;
        this._tone = [0, 0, 0, 0];
        this._toneTarget = [0, 0, 0, 0];
        this._toneTime = 0;
    };

    Sprite_Fog.prototype.update = function() {
        TilingSprite.prototype.update.call(this);
        this._updateMovement();
        this._updateColorFilter();
        this._updateOpacity();
        this._updateTone();
    };

    Sprite_Fog.prototype._updateMovement = function() {
        this.constX += this.speedX;
        this.origin.x = ($gameMap.displayX() * $gameMap.tileWidth()) + this.constX - 96;
        this.constY += this.speedY;
        this.origin.y = ($gameMap.displayY() * $gameMap.tileHeight()) + this.constY - 96;
    }

    Sprite_Fog.prototype._updateColorFilter = function() {
        if (!this._colorFilter) this.createColorFilter();
        if (this._colorFilter.uniforms.colorTone.toString() != this._tone.toString()) {
            this._colorFilter.setColorTone(this._tone);
        }
    };

    Sprite_Fog.prototype._updateOpacity = function() {
        if (this._opacityTime > 0) {
            this.opacity += this._opacityTarget;
            this._opacityTime--;
        }
    };

    Sprite_Fog.prototype._updateTone = function() {
        if (this._toneTime > 0) {
            const d = this._toneTime;
            for (let i = 0; i < 4; i++) {
                this._tone[i] = (this._tone[i] * (d - 1) + this._toneTarget[i]) / d;
            }
            this._toneTime--;
        }
    };

    Sprite_Fog.prototype.createColorFilter = function() {
        this._colorFilter = new ColorFilter();
        if (!this.filters) {
            this.filters = [];
        }
        this.filters.push(this._colorFilter);
    };

    Sprite_Fog.prototype.setOpacityTarget = function(opacity, time) {
        this._opacityTime = time;
        this._opacityTarget = (opacity - this.opacity) / time;
        if (this._opacityTime === 0) {
            this.opacity = opacity;
        }
    };

    Sprite_Fog.prototype.setToneTarget = function(tone, time) {
        this._toneTime = time;
        this._toneTarget = tone.clone();
        if (this._toneTime === 0) {
            this._tone = this._toneTarget.clone();
        } 
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Fog
    //
    // The set of sprites of fogs used in map and battle.

    function Spriteset_Fog() {
        this.initialize(...arguments);
    }

    Spriteset_Fog.prototype = Object.create(Sprite.prototype);
    Spriteset_Fog.prototype.constructor = Spriteset_Fog;

    Spriteset_Fog.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.setFrame(0, 0, Graphics.width, Graphics.height);
        this.createFogList();  
    };

    Spriteset_Fog.prototype.createFogList = function() {
        if (GabeMZ.FogEffects.currentMap == $gameMap.mapId()) {
            GabeMZ.FogEffects.fogList.forEach( (fog, id) => {
                if (fog) this.createFog(fog.id, id, fog);
            });
        } else {
            GabeMZ.FogEffects.currentMap = $gameMap.mapId()
            this.clearList();
            const reg = /<addFog\s*(\d+):\s*(\d+)>/g;
            let match;
            while (match = reg.exec($dataMap.note)) {
                this.createFog(match[2], match[1]);
            }
        }
    };

    Spriteset_Fog.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (GabeMZ.FogEffects.needRefresh) this.refreshFogList();
    };

    Spriteset_Fog.prototype.createFog = function(id, layer, fog) {
        if (layer < 1) return;
        const fogSetting = JSON.parse(GabeMZ.FogEffects.fogSettings[id - 1]);
        const sprite = new Sprite_Fog(ImageManager.loadFogs(fogSetting.fogFilename));
        sprite.move(-96, -96, Graphics.width + 192, Graphics.height + 192);
        sprite.opacity = fog ? fog.opacity : parseInt(fogSetting.fogOpacity);
        sprite.blendMode = parseInt(fogSetting.fogBlendMode);
        sprite.origin.x = -96;
        sprite.origin.y = -96;
        sprite.speedX = -parseFloat(fogSetting.fogMoveX);
        sprite.speedY = -parseFloat(fogSetting.fogMoveY);
        sprite.id = id;
        sprite.z = layer;
        if (fog) {
            sprite.constX = fog.constX;
            sprite.constY = fog.constY;
            sprite._opacityTarget = fog._opacityTarget;
            sprite._opacityTime = fog._opacityTime;
            sprite._tone = fog._tone;
            sprite._toneTarget = fog._toneTarget;
            sprite._toneTime = fog._toneTime;
        }
        this.addChild(sprite); 
        this._sortChildren();
        GabeMZ.FogEffects.fogList[layer] = sprite;
    };

    Spriteset_Fog.prototype._sortChildren = function() {
        this.children.sort(this._compareChildOrder.bind(this));
    };
    
    Spriteset_Fog.prototype._compareChildOrder = function(a, b) {
        if (a.z !== b.z) {
            return a.z - b.z;
        } else if (a.y !== b.y) {
            return a.y - b.y;
        } else {
            return a.spriteId - b.spriteId;
        }
    };

    Spriteset_Fog.prototype.refreshFogList = function() {
        if (GabeMZ.FogEffects.tempFog.length > 0) {
            GabeMZ.FogEffects.tempFog.forEach(fog => {
                this.removeChild(GabeMZ.FogEffects.fogList[fog[1]]); 
                GabeMZ.FogEffects.fogList[fog[1]] = null;
                if (fog[0]) this.createFog(fog[0], fog[1]);
            });
        } else {
            this.clearList();
        }
        GabeMZ.FogEffects.needRefresh = false;
    };

    Spriteset_Fog.prototype.clearList = function() {
        GabeMZ.FogEffects.fogList.forEach(fog => {this.removeChild(fog)});
        GabeMZ.FogEffects.fogList = [];
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Base
    //
    // The superclass of Spriteset_Map and Spriteset_Battle.

    Spriteset_Base.prototype.createFogLayer = function() {
        if (!ConfigManager.fogEffects) return;
        this._fogLayer = new Spriteset_Fog();
        this._baseSprite.addChild(this._fogLayer);
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Map
    //
    // The set of sprites on the map screen.

    const _Spriteset_Map_createWeather = Spriteset_Map.prototype.createWeather;
    Spriteset_Map.prototype.createWeather = function() {
        if (GabeMZ.FogEffects.fogInMap) this.createFogLayer();
        _Spriteset_Map_createWeather.call(this);
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Battle
    //
    // The set of sprites on the battle screen.

    const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer = function() {
        _Spriteset_Battle_createLowerLayer.call(this);
        if (GabeMZ.FogEffects.fogInBattle) this.createFogLayer();
    };

    //-----------------------------------------------------------------------------
    // Window_Options
    //
    // The window for changing various settings on the options screen.

    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        if (GabeMZ.FogEffects.commandEnabled) this.addFogOptions();
    };

    Window_Options.prototype.addFogOptions = function() {
        this.addCommand(GabeMZ.FogEffects.commandName, "fogEffects");
    };

    //-----------------------------------------------------------------------------
    // ConfigManager
    //
    // The static class that manages the configuration data.

    ConfigManager.fogEffects = true;

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.fogEffects = this.fogEffects;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        this.fogEffects = this.readFlag(config, "fogEffects", true);
    };

})();