//============================================================================
// Gabe MZ - Message Plus
//----------------------------------------------------------------------------
// 27/09/20 | Version: 1.0.1 | Compatibility path with VisuMZ_1_MessageCore
// 26/09/20 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This software is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.1] Improved message system.
 * @author Gabe (Gabriel Nascimento)
 * @url http://patreon.com/gabriel_nfd
 * @orderAfter VisuMZ_1_MessageCore
 * 
 * @help Gabe MZ - Message Plus
 *  - This plugin is released under the zlib License.
 * 
 * This plugin adds significant improvements to the default RPG Maker
 * message system. Due to all the complexity of the plugin and for a
 * better explanation of each command and function, the plugin's
 * documentation was written directly in my page. You can read at:
 * - https://comuns-rpgmaker.github.io/GabeMZ/Plugins/GMZ_MessagePlus
 * 
 * For support and new plugins join our Discord server: 
 * https://discord.gg/GG85QRz
 * 
 * @param defaultSettings
 * @text Message Default Settings
 * @default ===============================================
 * 
 * @param defaultXPos
 * @parent defaultSettings
 * @text X Pos
 * @desc Set the default X coordinate of the Message Window.
 * @type text
 * @default (Graphics.width - Graphics.boxWidth) / 2
 * 
 * @param defaultYPos
 * @parent defaultSettings
 * @text Y Pos
 * @desc Set the default Y coordinate of the Message Window.
 * @type text
 * @default Graphics.boxHeight - this.height
 * 
 * @param defaultWidth
 * @parent defaultSettings
 * @text Window Width
 * @desc Set the default width of the Message Window.
 * @type text
 * @default Graphics.boxWidth
 * 
 * @param defaultHeight
 * @parent defaultSettings
 * @text Window Height
 * @desc Set the default height of the Message Window.
 * @type text
 * @default this.fittingHeight(4)
 * 
 * @param defaultPadding
 * @parent defaultSettings
 * @text Window Padding
 * @desc Set the default padding of the Message Window.
 * @type number
 * @default 12
 * @min 0
 * 
 * @param pauseSignSettings
 * @text Pause Sign Settings
 * @default ===============================================
 * 
 * @param defaultPauseSignXPos
 * @parent pauseSignSettings
 * @text X Pos
 * @desc Set the default X coordinate of the Pause Sign.
 * @type text
 * @default this._width / 2
 * 
 * @param defaultPauseSignYPos
 * @parent pauseSignSettings
 * @text Y Pos
 * @desc Set the default Y coordinate of the Pause Sign.
 * @type text
 * @default this._height
 * 
 * @param defaultPauseSignVisible
 * @parent pauseSignSettings
 * @text Visible
 * @desc Set if the Pause Sign is visible by default.
 * @type boolean
 * @default true
 * 
 * @param balloonModeSettings
 * @text Balloon Mode Settings
 * @default ===============================================
 * 
 * @param balloonPopFilename
 * @parent balloonModeSettings
 * @text Balloon Pop Filename
 * @desc Set the default Balloon Mode pop image filename.
 * @type file
 * @dir img/system/
 * @default MessagePop
 * 
 * @param balloonPopOffset
 * @parent balloonModeSettings
 * @text Balloon Pop Offset
 * @desc Set the default Balloon Mode pop vertical offset.
 * @type number
 * @default 4
 * @min -9999
 * 
 * @param nameBoxDefaultSettings
 * @text Name Box Default Settings
 * @default ===============================================
 * 
 * @param nameBoxDefaultXOffset
 * @parent nameBoxDefaultSettings
 * @text X Offset
 * @desc Set the default X offset of the name box window.
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param nameBoxDefaultYOffset
 * @parent nameBoxDefaultSettings
 * @text Y Offset
 * @desc Set the default Y offset of the name box window.
 * @type number
 * @default 0
 * @min -9999
 * 
 * @param nameBoxDefaultPadding
 * @parent nameBoxDefaultSettings
 * @text Window Padding
 * @desc Set the default padding of the name box window.
 * @type number
 * @default 12
 * @min 0
 * 
 * @param choiceListDefaultSettings
 * @text Choice List Default Settings
 * @default ===============================================
 * 
 * @param choiceListDefaultXOffset
 * @parent choiceListDefaultSettings
 * @text X Offset
 * @desc Set the default X offset of the choice list window.
 * @type text
 * @default 0
 * 
 * @param choiceListDefaultYOffset
 * @parent choiceListDefaultSettings
 * @text Y Offset
 * @desc Set the default Y offset of the choice list window.
 * @type text
 * @default 0
 * 
 * @param choiceListDefaultPadding
 * @parent choiceListDefaultSettings
 * @text Window Padding
 * @desc Set the default padding of the choice list window.
 * @type number
 * @default 12
 * @min 0
 * 
 * @param sfxSettings
 * @text Message SFX Settings
 * @default ===============================================
 * 
 * @param sfxList
 * @parent sfxSettings
 * @text SFX List
 * @desc Set a list of SFX settings to be used.
 * @type struct<sfxListStruct>[]
 * @default ["{\"filename\":\"Cursor1\",\"frequency\":\"2\",\"volume\":\"25\",\"pitch\":\"100\",\"pan\":\"0\"}","{\"filename\":\"Cursor2\",\"frequency\":\"2\",\"volume\":\"25\",\"pitch\":\"100\",\"pan\":\"0\"}"]
 * 
 * @param defaultSFXId
 * @parent sfxSettings
 * @text Default SFX ID
 * @desc Set the default SFX ID.
 * @type number
 * @min 1
 * @default 1
 * 
 * @param otherSettings
 * @text Other Settings
 * @default ===============================================
 * 
 * @param colorPicker
 * @parent otherSettings
 * @text Color Picker
 * @desc Set real colors to be used by the \clr[id] command.
 * @type text[]
 * @default ["#0398fc","rgba(119, 209, 92, 255)","rgba(150, 40, 27, 1)","rgba(0, 0, 0, 100)",""]

 * 
 * @command messageWindowSettingsEasy
 * @text Window Settings (Easy)
 * @desc Easy configuration mode, to set the parameters of the Message Window quickly and efficiently.
 * 
 * @arg windowXPos
 * @text Window Horizontal Pos
 * @desc Changes the horizontal position of the Message Window.
 * @type select
 * @option Default
 * @value Default
 * @option Left
 * @value Left
 * @option Center
 * @value Center
 * @option Right
 * @value Right
 * @option Unchange
 * @value Unchange
 * @default Unchange
 * 
 * @arg windowYPos
 * @text Window Vertical Pos
 * @desc Changes the vertical position of the Message Window.
 * @type select
 * @option Default
 * @value Default
 * @option Upper
 * @value Upper
 * @option Center
 * @value Center
 * @option Bottom
 * @value Bottom
 * @option Unchange
 * @value Unchange
 * @default Unchange
 * 
 * @arg windowWidth
 * @text Window Width
 * @desc Changes the width of the Message Window.
 * @type select
 * @option Default
 * @value Default
 * @option Auto
 * @value Auto
 * @option Full
 * @value Full
 * @option Unchange
 * @value Unchange
 * @default Unchange
 * 
 * @arg windowHeight
 * @text Window Height
 * @desc Changes the height of the Message Window.
 * @type select
 * @option Default
 * @value Default
 * @option Auto
 * @value Auto
 * @option Full
 * @value Full
 * @option Unchange
 * @value Unchange
 * @default Unchange
 * 
 * @arg windowPadding
 * @text Window Padding
 * @desc Changes the padding of the Message Window.
 * @type number
 * @default 12
 * 
 * @command messageWindowSettingsAdvanced
 * @text Window Settings (Advanced)
 * @desc Advanced configuration mode, allows full control of the Message Window, but requires a certain level of knowledge.
 * 
 * @arg windowXPos
 * @text Window X Pos
 * @desc Changes the X position of the Message Window.
 * @type text 
 * @default Unchange
 * 
 * @arg windowYPos
 * @text Window Y Pos
 * @desc Changes the Y position of the Message Window.
 * @type text 
 * @default Unchange
 * 
 * @arg windowWidth
 * @text Window Width
 * @desc Changes the width of the Message Window.
 * @type text
 * @default Unchange
 * 
 * @arg windowHeight
 * @text Window Height
 * @desc Changes the height of the Message Window.
 * @type text
 * @default Unchange
 * 
 * @arg windowPadding
 * @text Window Padding
 * @desc Changes the padding of the Message Window.
 * @type number
 * @default 12
 * 
 * @command pauseSignSettings
 * @text Pause Sign Settings
 * @desc Configure the Message Window Pause Sign settings.
 * 
 * @arg pauseSignXPos
 * @text Pause Sign X Pos
 * @desc Changes the X position of the Pause Sign.
 * @type text
 * 
 * @arg pauseSignYPos
 * @text Pause Sign Y Pos
 * @desc Changes the Y position of the Pause Sign.
 * @type text
 * 
 * @arg pauseSignVisible
 * @text Pause Sign Visibility
 * @desc Changes the visibility of the Pause Sign.
 * @type select
 * @option Activate
 * @value Activate
 * @option Deactivate
 * @value Deactivate
 * @option Unchange
 * @value Unchange
 * @default Unchange
 * 
 * @command nameBoxWindowSettings
 * @text Name Box Settings
 * @desc Configure the Name Box window settings.
 * 
 * @arg nameBoxXOffset
 * @text Name Box X Offset
 * @desc Changes the X offset of the Name Box window.
 * @type number 
 * @default 0
 * @min -9999
 * 
 * @arg nameBoxYOffset
 * @text Name Box Y Offset
 * @desc Changes the Y offset of the Name Box window.
 * @type number 
 * @default 0
 * @min -9999
 * 
 * @arg nameBoxPadding
 * @text Name Box Padding
 * @desc Changes the padding of the Name Box window.
 * @type number
 * @default 12
 * @min 0
 * 
 * @command choiceListWindowSettings
 * @text Choice List Settings
 * @desc Configure the Choice List window settings.
 * 
 * @arg choiceListXOffset
 * @text Choice List X Offset
 * @desc Changes the X offset of the Choice List window.
 * @type number 
 * @default 0
 * @min -9999
 * 
 * @arg choiceListYOffset
 * @text Choice List Y Offset
 * @desc Changes the Y offset of the Choice List window.
 * @type number 
 * @default 0
 * @min -9999
 * 
 * @arg choiceListPadding
 * @text Choice List Padding
 * @desc Changes the padding of the Choice List window.
 * @type number
 * @default 12
 * @min 0
 * 
 * @command messageWindowSettingsReset
 * @text Reset Message Window Settings
 * @desc Reset all Message Window settings to their default settings.
 * 
 * @command pauseSignSettingsReset
 * @text Reset Pause Sign Settings
 * @desc Reset all Pause Sign settings to their default settings.
 * 
 * @command nameBoxWindowSettingsReset
 * @text Reset Name Box Window Settings
 * @desc Reset all Name Box settings to their default settings.
 * 
 * @command choiceListWindowSettingsReset
 * @text Reset Choice List Window Settings
 * @desc Reset all Choice List settings to their default settings.
 * 
 * @command balloonModeSettings
 * @text Balloon Mode Settings
 * @desc Configure the Balloon Mode message settings.
 * 
 * @arg balloonMode
 * @text Balloon Mode
 * @desc Activate or deactivate the Balloon Mode message.
 * @type select
 * @option Activate
 * @value Activate
 * @option Deactivate
 * @value Deactivate
 * @option Unchange
 * @value Unchange
 * @default Unchange
 * 
 * @arg pop
 * @text Balloon Pop
 * @desc Activate or deactivate the balloon pop arrow visibility.
 * @type select
 * @option Activate
 * @value Activate
 * @option Deactivate
 * @value Deactivate
 * @option Unchange
 * @value Unchange
 * @default Unchange
 * 
 * @command sfxSettings
 * @text Message SFX Settings
 * @desc Configure the message text SFX settings.
 * 
 * @arg sfxId
 * @text SFX ID
 * @desc Set the current ID of the text SFX.
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg sfxState
 * @text SFX State
 * @desc Set the current state of the text SFX.
 * @type select
 * @option Activate
 * @value Activate
 * @option Deactivate
 * @value Deactivate
 * @option Unchange
 * @value Unchange
 * @default Unchange
 * 
 * @command inputShowFast
 * @text Input Show Fast
 * @desc Activate or deactivate the Input Show Fast.
 * 
 * @arg state
 * @text State
 * @desc Activate or deactivate the Input Show Fast.
 * @type boolean
 * @default true
 * 
 * @command customMessage
 * @text Custom Message
 * @desc Write a Custom Message.
 * 
 * @arg message
 * @text Message
 * @desc Message
 * @type note
 */

/*~struct~sfxListStruct:
 * @param filename
 * @text SE Filename
 * @desc Set the SE filename.
 * @type file
 * @dir audio/se/
 * 
 * @param frequency
 * @text Frequency
 * @desc Set the SE frequency.
 * @type number
 * @min 1
 * @max 100
 * @default 2
 * 
 * @param volume
 * @text Volume
 * @desc Set the SE volume.
 * @type number
 * @min 0
 * @max 100
 * @default 25
 * 
 * @param pitch
 * @text Pitch
 * @desc Set the SE pitch.
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * 
 * @param pan
 * @text Pan
 * @desc Set the SE pan.
 * @type number
 * @min -100
 * @max 100
 * @default 0
 */

var Imported = Imported || {};
Imported.GMZ_MessagePlus = true;

var GabeMZ                 = GabeMZ || {};
GabeMZ.MessagePlus         = GabeMZ.MessagePlus || {};
GabeMZ.MessagePlus.VERSION = [1, 0, 1];

$gameMessagePlus = null;

(() => {

    const pluginName = "GabeMZ_MessagePlus";
    GabeMZ.params = PluginManager.parameters(pluginName);

    // Setting the Message Window default params
    GabeMZ.MessagePlus.defaultWidth   = GabeMZ.params.defaultWidth;
    GabeMZ.MessagePlus.defaultHeight  = GabeMZ.params.defaultHeight;
    GabeMZ.MessagePlus.defaultXPos    = GabeMZ.params.defaultXPos;
    GabeMZ.MessagePlus.defaultYPos    = GabeMZ.params.defaultYPos;
    GabeMZ.MessagePlus.defaultPadding = GabeMZ.params.defaultPadding;

    // Setting the name box default params
    GabeMZ.MessagePlus.defaultNameBoxXOffset = parseInt(GabeMZ.params.nameBoxDefaultXOffset);
    GabeMZ.MessagePlus.defaultNameBoxYOffset = parseInt(GabeMZ.params.nameBoxDefaultYOffset);
    GabeMZ.MessagePlus.defaultNameBoxPadding = parseInt(GabeMZ.params.nameBoxDefaultPadding);

    // Setting the name box default params
    GabeMZ.MessagePlus.defaultNameBoxXOffset = parseInt(GabeMZ.params.nameBoxDefaultXOffset);
    GabeMZ.MessagePlus.defaultNameBoxYOffset = parseInt(GabeMZ.params.nameBoxDefaultYOffset);
    GabeMZ.MessagePlus.defaultNameBoxPadding = parseInt(GabeMZ.params.nameBoxDefaultPadding);

    // Setting the choice list default params
    GabeMZ.MessagePlus.defaultChoiceListXOffset = parseInt(GabeMZ.params.choiceListDefaultXOffset);
    GabeMZ.MessagePlus.defaultChoiceListYOffset = parseInt(GabeMZ.params.choiceListDefaultYOffset);
    GabeMZ.MessagePlus.defaultChoiceListPadding = parseInt(GabeMZ.params.choiceListDefaultPadding);

    // Setting the message text SFX default params
    GabeMZ.MessagePlus.defaultSFXId   = parseInt(GabeMZ.params.defaultSFXId);

    // Setting the pause sign default params
    GabeMZ.MessagePlus.defaultPauseSignXPos    = GabeMZ.params.defaultPauseSignXPos;
    GabeMZ.MessagePlus.defaultPauseSignYPos    = GabeMZ.params.defaultPauseSignYPos;
    GabeMZ.MessagePlus.defaultPauseSignVisible = JSON.parse(GabeMZ.params.defaultPauseSignVisible);

    // Setting the Balloon Mode params
    GabeMZ.MessagePlus.balloonPopFilename = GabeMZ.params.balloonPopFilename;
    GabeMZ.MessagePlus.balloonPopOffset   = parseInt(GabeMZ.params.balloonPopOffset);

    // Settings other things
    GabeMZ.MessagePlus.colorPicker = JSON.parse(GabeMZ.params.colorPicker);
    GabeMZ.MessagePlus.sfxList     = JSON.parse(GabeMZ.params.sfxList);

    // Setting the current params with the default values

    PluginManager.registerCommand(pluginName, "messageWindowSettingsEasy", args => {
        GabeMZ.MessagePlus.messageWindowSetParams(args);
    });

    PluginManager.registerCommand(pluginName, "messageWindowSettingsAdvanced", args => {
        GabeMZ.MessagePlus.messageWindowSetParams(args);
    });

    PluginManager.registerCommand(pluginName, "pauseSignSettings", args => {
        $gameMessagePlus.pauseSignXPos    = args.pauseSignXPos;
        $gameMessagePlus.pauseSignYPos    = args.pauseSignYPos;
        $gameMessagePlus.pauseSignVisible = GabeMZ.MessagePlus.getParamState(
            args.pauseSignVisible, $gameMessagePlus.pauseSignVisible);
            $gameMessagePlus.pauseSignUpdate  = true;
    });

    PluginManager.registerCommand(pluginName, "nameBoxWindowSettings", args => {
        $gameMessagePlus.nameBoxXOffset   = parseInt(args.nameBoxXOffset);
        $gameMessagePlus.nameBoxYOffset   = parseInt(args.nameBoxYOffset);
        $gameMessagePlus.nameBoxPadding   = parseInt(args.nameBoxPadding);
    });

    PluginManager.registerCommand(pluginName, "choiceListWindowSettings", args => {
        $gameMessagePlus.choiceListXOffset   = parseInt(args.choiceListXOffset);
        $gameMessagePlus.choiceListYOffset   = parseInt(args.choiceListYOffset);
        $gameMessagePlus.choiceListPadding   = parseInt(args.choiceListPadding);
    });

    PluginManager.registerCommand(pluginName, "messageWindowSettingsReset", args => {
        GabeMZ.MessagePlus.messageWindowResetSettings()
    });

    PluginManager.registerCommand(pluginName, "pauseSignSettingsReset", args => {
        $gameMessagePlus.pauseSignXPos    = GabeMZ.MessagePlus.defaultPauseSignXPos;
        $gameMessagePlus.pauseSignYPos    = GabeMZ.MessagePlus.defaultPauseSignYPos;
        $gameMessagePlus.pauseSignVisible = GabeMZ.MessagePlus.defaultPauseSignVisible;
        $gameMessagePlus.pauseSignUpdate  = true;
    });

    PluginManager.registerCommand(pluginName, "nameBoxWindowSettingsReset", args => {
        $gameMessagePlus.nameBoxXOffset   = GabeMZ.MessagePlus.defaultNameBoxXOffset;
        $gameMessagePlus.nameBoxYOffset   = GabeMZ.MessagePlus.defaultNameBoxYOffset;
        $gameMessagePlus.nameBoxPadding   = GabeMZ.MessagePlus.defaultNameBoxPadding;
    });

    PluginManager.registerCommand(pluginName, "choiceListWindowSettingsReset", args => {
        $gameMessagePlus.choiceListXOffset   = GabeMZ.MessagePlus.defaultChoiceListXOffset;
        $gameMessagePlus.choiceListYOffset   = GabeMZ.MessagePlus.defaultChoiceListYOffset;
        $gameMessagePlus.choiceListPadding   = GabeMZ.MessagePlus.defaultChoiceListPadding;
    });

    PluginManager.registerCommand(pluginName, "balloonModeSettings", args => {
        $gameMessagePlus.balloonMode = GabeMZ.MessagePlus.getParamState(
            args.balloonMode, $gameMessagePlus.balloonMode);
        $gameMessagePlus.pop         = GabeMZ.MessagePlus.getParamState(
        args.pop, $gameMessagePlus.pop);
        $gameMessagePlus.target      = { target: $gamePlayer, type: 0 };
    });

    PluginManager.registerCommand(pluginName, "sfxSettings", args => {
        $gameMessagePlus.currentSFXId = parseInt(args.sfxId);
        $gameMessagePlus.sfxState     = GabeMZ.MessagePlus.getParamState(
            args.sfxState, $gameMessagePlus.sfxState);
    });

    PluginManager.registerCommand(pluginName, "inputShowFast", args => {
        $gameMessagePlus.inputShowFast = JSON.parse(args.state);
    });

    PluginManager.registerCommand(pluginName, "customMessage", args => {
        $gameMessage.add(JSON.parse(args.message));
    });

    GabeMZ.MessagePlus.messageWindowSetParams = function(args) {
        $gameMessagePlus.windowWidth   = args.windowWidth;
        $gameMessagePlus.windowHeight  = args.windowHeight;
        $gameMessagePlus.windowXPos    = args.windowXPos;
        $gameMessagePlus.windowYPos    = args.windowYPos;
        $gameMessagePlus.windowPadding = args.windowPadding;
        GabeMZ.MessagePlus.disableBalloonMode();
    }

    GabeMZ.MessagePlus.messageWindowResetSettings = function() {
        $gameMessagePlus.windowWidth   = GabeMZ.MessagePlus.defaultWidth;
        $gameMessagePlus.windowHeight  = GabeMZ.MessagePlus.defaultHeight;
        $gameMessagePlus.windowXPos    = GabeMZ.MessagePlus.defaultXPos;
        $gameMessagePlus.windowYPos    = GabeMZ.MessagePlus.defaultYPos;
        $gameMessagePlus.windowPadding = GabeMZ.MessagePlus.defaultPadding;
        $gameMessagePlus.currentSFXId  = GabeMZ.MessagePlus.defaultSFXId
        GabeMZ.MessagePlus.disableBalloonMode();
    }

    GabeMZ.MessagePlus.messageWindowSaveTempSettings = function() {
        $gameTemp.msgSettings = {};
        $gameTemp.msgSettings.width        = $gameMessagePlus.windowWidth;
        $gameTemp.msgSettings.height       = $gameMessagePlus.windowHeight;
        $gameTemp.msgSettings.x            = $gameMessagePlus.windowXPos;
        $gameTemp.msgSettings.y            = $gameMessagePlus.windowYPos;
        $gameTemp.msgSettings.padding      = $gameMessagePlus.windowPadding;
        $gameTemp.msgSettings.currentSFXId = $gameMessagePlus.currentSFXId;
        $gameTemp.msgSettings.balloonMode  = $gameMessagePlus.balloonMode;
        $gameTemp.msgSettings.target       = $gameMessagePlus.target;
        $gameTemp.msgSettings.pop          = $gameMessagePlus.pop;
    }

    GabeMZ.MessagePlus.messageWindowLoadTempSettings = function() {
        $gameMessagePlus.windowWidth   = $gameTemp.msgSettings.width;
        $gameMessagePlus.windowHeight  = $gameTemp.msgSettings.height;
        $gameMessagePlus.windowXPos    = $gameTemp.msgSettings.x;
        $gameMessagePlus.windowYPos    = $gameTemp.msgSettings.y;
        $gameMessagePlus.windowPadding = $gameTemp.msgSettings.padding;
        $gameMessagePlus.currentSFXId  = $gameTemp.msgSettings.currentSFXId;
        $gameMessagePlus.balloonMode   = $gameTemp.msgSettings.balloonMode;
        $gameMessagePlus.target        = $gameTemp.msgSettings.target;
        $gameMessagePlus.pop           = $gameTemp.msgSettings.pop;
    }

    GabeMZ.MessagePlus.disableBalloonMode = function() {
        $gameMessagePlus.balloonMode = false;
        $gameMessagePlus.target      = null;
        $gameMessagePlus.pop         = false;
    }

    GabeMZ.MessagePlus.getParamState = function(param, oldState) {
        switch (param.toLowerCase()) {
            case "activate":
                return true;
            case "deactivate": 
                return false;
            case "unchange":
                return oldState;
        }
    }

    //-----------------------------------------------------------------------------
    // ColorManager
    //
    // The static class that handles the window colors.

    ColorManager.realColor = function(id) {
        if (GabeMZ.MessagePlus.colorPicker[id]) return GabeMZ.MessagePlus.colorPicker[id];
        return "#ffffff";
    };

    //-----------------------------------------------------------------------------
    // Game_Message
    //
    // The game object class for the state of the message window that displays text
    // or selections, etc.

    function Game_MessagePlus() {
        this.initialize(...arguments);
    }

    Game_MessagePlus.prototype.initialize = function() {
        this.windowWidth         = GabeMZ.MessagePlus.defaultWidth;
        this.windowHeight        = GabeMZ.MessagePlus.defaultHeight;
        this.windowXPos          = GabeMZ.MessagePlus.defaultXPos;
        this.windowYPos          = GabeMZ.MessagePlus.defaultYPos;
        this.windowPadding       = GabeMZ.MessagePlus.defaultPadding;
        this.battleWindowWidth   = this.windowWidth  
        this.battlewindowHeight  = this.windowHeight 
        this.battlewindowXPos    = this.windowXPos   
        this.battlewindowYPos    = this.windowYPos   
        this.battlewindowPadding = this.windowPadding
        this.nameBoxXOffset      = GabeMZ.MessagePlus.defaultNameBoxXOffset;
        this.nameBoxYOffset      = GabeMZ.MessagePlus.defaultNameBoxYOffset;
        this.nameBoxPadding      = GabeMZ.MessagePlus.defaultNameBoxPadding;
        this.choiceListXOffset   = GabeMZ.MessagePlus.defaultChoiceListXOffset;
        this.choiceListYOffset   = GabeMZ.MessagePlus.defaultChoiceListYOffset;
        this.choiceListPadding   = GabeMZ.MessagePlus.defaultChoiceListPadding;
        this.currentSFXId        = GabeMZ.MessagePlus.defaultSFXId
        this.pauseSignXPos       = GabeMZ.MessagePlus.defaultPauseSignXPos;
        this.pauseSignYPos       = GabeMZ.MessagePlus.defaultPauseSignYPos;
        this.pauseSignVisible    = GabeMZ.MessagePlus.defaultPauseSignVisible;
        this.pauseSignUpdate     = false;
        this.balloonMode         = false;
        this.currentEventId      = 0;
        this.target              = null;
        this.pop                 = false;
        this.sfxState            = true;
        this.inputShowFast       = true;
        this.forceClose          = false;
    }

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //
    // The interpreter for running event commands.

    // Show Text
    const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function(params) {
        $gameMessagePlus.currentEventId = this.eventId();
        return _Game_Interpreter_command101.call(this, params)
    }

    // Plugin Command
    const _Game_Interpreter_command357 = Game_Interpreter.prototype.command357;
    Game_Interpreter.prototype.command357 = function(params) {
        if (params[1] == "customMessage") this.setWaitMode("message");
        return _Game_Interpreter_command357.call(this, params);
    };

    //-----------------------------------------------------------------------------
    // Window_Base
    //
    // The superclass of all windows within the game.

    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _Window_Base_convertEscapeCharacters.call(this, text)
        // Return Item Name  
        text = text.replace(/\x1bITN\[(\d+)\]/gi, (_, p1) =>
            this.itemName(parseInt(p1), 0)
        );
        // Return Skill Name
        text = text.replace(/\x1bSKN\[(\d+)\]/gi, (_, p1) =>
            this.itemName(parseInt(p1), 1)
        );
        // Return Weapon Name
        text = text.replace(/\x1bWPN\[(\d+)\]/gi, (_, p1) =>
            this.itemName(parseInt(p1), 2)
        );
        // Return Armor Name
        text = text.replace(/\x1bARN\[(\d+)\]/gi, (_, p1) =>
            this.itemName(parseInt(p1), 3)
        );
        // Return Item Quantity
        text = text.replace(/\x1bITQ\[(\d+)\]/gi, (_, p1) =>
            this.itemQuantity(parseInt(p1), 0)
        );
        // Return Weapon Quantity
        text = text.replace(/\x1bWPQ\[(\d+)\]/gi, (_, p1) =>
            this.itemQuantity(parseInt(p1), 2)
        );
        // Return Armor Quantity
        text = text.replace(/\x1bARQ\[(\d+)\]/gi, (_, p1) =>
            this.itemQuantity(parseInt(p1), 3)
        );
        return text;
    }

    Window_Base.prototype.itemName = function(id, type) {
        const item = this.getItem(id, type);
        return item ? item.name : "";
    };

    Window_Base.prototype.itemQuantity = function(id, type) {
        const item = this.getItem(id, type);
        return item ? $gameParty.numItems(item) : 0;
    };

    Window_Base.prototype.itemIconIndex = function(id, type) {
        const item = this.getItem(id, type);
        return item ? item.iconIndex : 0;
    };

    Window_Base.prototype.getItem = function(id, type) {
        let item;
        switch (type) {
            case 0: // Item
                item = id >= 1 ? $dataItems[id] : null;
                break;
            case 1: // Skill
                item = id >= 1 ? $dataSkills[id] : null;
                break;
            case 2: // Weapon
                item = id >= 1 ? $dataWeapons[id] : null;
                break;
            case 3: // Armor
                item = id >= 1 ? $dataArmors[id] : null;
                break;
        }
        return item;
    }

    const _Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        let param;
        switch (code) {
            // Change Text Font
            case "FNT":
                param = this.obtainEscapeFullParam(textState);
                this.contents.fontFace = param;
                break;
            // Change Text Bold State
            case "B":
                param = this.obtainEscapeParam(textState);
                this.contents.fontBold = param;
                break;
            // Change Text Italic State
            case "IT":
                param = this.obtainEscapeParam(textState);
                this.contents.fontItalic = param;
                break;
            // Change Text Color
            case "CLR":
                param = this.obtainEscapeParam(textState);
                this.changeTextColor(ColorManager.realColor(param));
                break;
            // Change Text Outline Color
            case "OLC":
                param = this.obtainEscapeParam(textState);
                this.changeOutlineColor(ColorManager.realColor(param));
                break;
            // Change Text Outline Width
            case "OLW":
                param = this.obtainEscapeParam(textState);
                this.contents.outlineWidth = parseInt(param);
                break;
            // Change Message Face
            case "FC":
                param = this.obtainEscapeFullParam(textState);
                this.redrawFace(param, textState)
                break;
            // Change Message Face (Actor ID)
            case "ACTFC":
                param = this.obtainEscapeParam(textState);
                this.redrawFace($gameActors.actor(param).faceName(), $gameActors.actor(param).faceIndex(),  textState);
                break;
            // Change Message Face (Party Member ID)
            case "PRTFC":
                param = this.obtainEscapeParam(textState) - 1;
                this.redrawFace($gameParty.members()[param].faceName(), $gameParty.members()[param].faceIndex(),  textState);
                break;
            // Display Item Icon by ID
            case "ITI":
                this.processDrawIcon(this.itemIconIndex(this.obtainEscapeParam(textState), 0), textState);
                break;
            // Display Skill Icon by ID
            case "SKI":
                this.processDrawIcon(this.itemIconIndex(this.obtainEscapeParam(textState), 1), textState);
                break;
            // Display Weapon Icon by ID
            case "WPI":
                this.processDrawIcon(this.itemIconIndex(this.obtainEscapeParam(textState), 2), textState);
                break;
            // Display Armor Icon by ID
            case "ARI":
                this.processDrawIcon(this.itemIconIndex(this.obtainEscapeParam(textState), 3), textState);
                break;
            case "TGT":
                param = this.obtainEscapeFullParam(textState);
                if (!$gameMessagePlus.balloonMode) return;
                let target;
                if(param == 'this') {
                    target = $gameMap.event($gameMessagePlus.currentEventId);
                    $gameMessagePlus.target = { target: target, type: 0 };
                    return;
                }
                const regExp = /(\w+)(\d+)/i;
                const arr = regExp.exec(param);
                if (arr) {
                    if (arr[1] == 'p') {
                        const id = parseInt(arr[2]);
                        if ($gameParty.inBattle()) {
                            target = SceneManager._scene._spriteset._actorSprites[id - 1];
                            $gameMessagePlus.target = { target: target, type: 1 };
                            return;
                        } else if (id > 1) {
                            target = $gamePlayer.followers().follower(id - 2);
                        } else {
                            target = $gamePlayer;
                        }
                        $gameMessagePlus.target = { target: target, type: 0 };
                        return;
                    } else if (arr[1] == 'a') {
                        const id = parseInt(arr[2]);
                        if ($gameParty.inBattle()) {
                            target = SceneManager._scene._spriteset._actorSprites.find(sprite => sprite._actor ? sprite._actor.actorId() == id : null);
                            if (target) $gameMessagePlus.target = { target: target, type: 1 };
                            return;
                        }
                        if ($gameParty.leader().actorId() == id) {
                            target = $gamePlayer;
                        } else {
                            target = $gamePlayer.followers().data().find(follower => follower.actor() ? follower.actor().actorId() == id : null);
                        }
                        if (target) {
                            $gameMessagePlus.target = { target: target, type: 0 };
                            return;
                        } else {
                            this._pauseSkip = true;
                            $gameMessagePlus.forceClose = true;
                            return;
                        }
                    } else if (arr[1] == 'e') {
                        if ($gameParty.inBattle() && Akea.BattleSystem) {
                            const id = parseInt(arr[2]);
                            target = SceneManager._scene._spriteset._enemySprites[id - 1];
                            if (target) $gameMessagePlus.target = { target: target, type: 1 };
                            return;
                        }
                    }
                }
                target = param > 0 ? $gameMap.event(param) : $gamePlayer;
                $gameMessagePlus.target = { target: target, type: 0 };
                break;
            case "SPP":
                if (!$gameMessagePlus.balloonMode) return;
                $gameMessagePlus.pop = true;
                break;
            case "HPP":
                if (!$gameMessagePlus.balloonMode) return;
                $gameMessagePlus.pop = false;
                break;
            // Change Text SFX
            case "SFX":
                param = this.obtainEscapeFullParam(textState);
                switch (param.toLowerCase()) {
                    case 'on':
                        $gameMessagePlus.sfxState = true;
                        break;
                    case 'off':
                        $gameMessagePlus.sfxState = false;
                        break;
                    default:
                        $gameMessagePlus.currentSFXId = parseInt(param);
                        break;
                }
                break;
            // Enable Input Show Fast
            case "ISF":
                param = this.obtainEscapeFullParam(textState);
                $gameMessagePlus.inputShowFast = param.toLowerCase() == "on" ? true : false;
                break;
            default:
                _Window_Base_processEscapeCharacter.call(
                    this, 
                    code, 
                    textState
                );
                break;
        }
    }

    Window_Base.prototype.obtainEscapeFullParam = function(textState) {
        const regExp = /^\[\w+\]/;
        const arr = regExp.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            return arr[0].slice(1).slice(0, arr[0].length - 2)
        } else {
            return "";
        }
    };

    Window_Base.prototype.redrawFace = function(faceName, faceIndex, textState) {
        const rtl = $gameMessage.isRTL();
        const width = ImageManager.faceWidth;
        const height = this.innerHeight;
        const x = rtl ? this.innerWidth - width - 4 : 4;
        const y = 0;
        this.contents.clearRect(x, 0, width, height);
        const bitmap = ImageManager.loadFace(faceName);
        const pw = width;
        const ph = ImageManager.faceHeight;
        const sw = Math.min(width, pw);
        const sh = Math.min(height, ph);
        const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
        const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        bitmap.addLoadListener(() => {
            this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
        });
        const spacing = 20;
        const margin = width + spacing;
        textState.x = textState.rtl ? this.innerWidth - margin : margin;
        textState.startX = textState.x;
    }

    //-----------------------------------------------------------------------------
    // Window_Message
    //
    // The window for displaying text messages.

    const _Window_Message_initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function() {
        _Window_Message_initMembers.call(this);
        this._target = null;
        this._pop = new Sprite(ImageManager.loadSystem(GabeMZ.MessagePlus.balloonPopFilename));
        this._pop.visible = false;
        this.addChild(this._pop)
    }

    const _Window_Message__refreshPauseSign = Window_Message.prototype._refreshPauseSign;
    Window_Message.prototype._refreshPauseSign = function() {
        _Window_Message__refreshPauseSign.call(this);
        const x = eval($gameMessagePlus.pauseSignXPos);
        const y = eval($gameMessagePlus.pauseSignYPos);
        this._pauseSignSprite.move(x, y);
    };

    let _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        _Window_Message_updatePlacement.call(this)
        const text = $gameMessage.allText(); 
        this.setLines(text);
        this.padding = parseInt($gameMessagePlus.windowPadding);
        this.width = this.getWidthParam();
        this.height = this.getHeightParam();
        if (this.contents) {
            this.contents.destroy();
            this.createContents();
        }
        this.updatePosition();
    };

    const _Window_Message_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
        _Window_Message_update.call(this);
        if ($gameMessagePlus.forceClose) this.terminateMessage();
        if (this.isOpen() && $gameMessagePlus.balloonMode) this.updatePosition();
        if ($gameMessagePlus.pop && this._target) this.updatePop();
    }

    const _Window_Message__updatePauseSign = Window_Message.prototype._updatePauseSign;
    Window_Message.prototype._updatePauseSign = function() {
        _Window_Message__updatePauseSign.call(this);
        const sprite = this._pauseSignSprite;
        const visible = $gameMessagePlus.pauseSignVisible;
        if ($gameMessagePlus.pauseSignUpdate) {
            const x = eval($gameMessagePlus.pauseSignXPos);
            const y = eval($gameMessagePlus.pauseSignYPos);
            sprite.move(x, y);
            $gameMessagePlus.pauseSignUpdate = false;
        }
        sprite.visible = this.isOpen() && visible;
    };

    Window_Message.prototype.updatePosition = function() {
        this._target = $gameMessagePlus.target;
        const ojamaX = (Graphics.width - Graphics.boxWidth) / 2;
        const ojamaY = (Graphics.height - Graphics.boxHeight) / 2;
        let x, y;
        this._pop.scale.y = 1;
        if (this._target) {
            x = this.target().x - (this.width * 0.5);
            y = (this.target().y - this.height) - 40 - (this._pop.height - GabeMZ.MessagePlus.balloonPopOffset);
        } else {
            x = this.getXParam();
            y = this.getYParam();
        }
        if ($gameMessagePlus.balloonMode) {
            if ((x + this.width) > Graphics.width) {
                this.x = Graphics.width - this.width;
            } else if (x < 0) {
                this.x = 0;
            } else {
                this.x = x;
            }
            if ((y + this.height) > Graphics.height) {
                this.y = Graphics.height - this.height;
            } else if (y < (this.height - ojamaY)) {
                this.y = this.target().y + this._pop.height;
                this._pop.scale.y = -1;
            } else {
                this.y = y;
            }
        } else {
            this.x = x;
            this.y = y;
        }
        this.x -= ojamaX;
        this.y -= ojamaY;
        this._nameBoxWindow.updatePlacement();
        this._choiceListWindow.updatePlacement();
    }

    Window_Message.prototype.target = function() {
        const ojamaY = (Graphics.height - Graphics.boxHeight) / 2;
        const target = this._target.target;
        let x, y;
        if (this._target.type) {
            x = target.x;
            y = target.y + ojamaY - (target.height / 2)
        } else {
            x = target.screenX();
            y = target.screenY();
        }
        return { x: x, y: y };
    }
    
    Window_Message.prototype.getXParam = function() {
        switch ($gameMessagePlus.windowXPos.toLowerCase()) {
            // Unchange
            case "unchange":
                break;
            // Default
            case "default":
                return eval(GabeMZ.MessagePlus.defaultXPos);
            // Left
            case "left":
                return 0;
            // Center
            case "center":
                return (Graphics.width - this.width) / 2;
            // Right
            case "right":
                return (Graphics.width - this.width);
            default:
                return eval($gameMessagePlus.windowXPos);
        }
    }

    Window_Message.prototype.getYParam = function() {
        switch ($gameMessagePlus.windowYPos.toLowerCase()) {
            // Unchange
            case "unchange":
                break;
            case "default":
                return eval(GabeMZ.MessagePlus.defaultYPos);
            // Upper
            case "upper":
                return 0;
            // Center
            case "center":
                return (Graphics.height - this.height) / 2;
            // Bottom
            case "bottom":
                return (Graphics.height - this.height);
            default:
                return eval($gameMessagePlus.windowYPos);
        }
    }

    Window_Message.prototype.getWidthParam = function() {
        if ($gameMessagePlus.balloonMode) return this.autoWidth();
        switch ($gameMessagePlus.windowWidth.toLowerCase()) {
            // Unchange
            case "unchange":
                break;
            // Default
            case "default":
                return eval(GabeMZ.MessagePlus.defaultWidth);
            // Auto
            case "auto":
                return this.autoWidth()
            // Full
            case "full":
                return Graphics.width;
            default:
                return eval($gameMessagePlus.windowWidth);
        }
    }

    Window_Message.prototype.getHeightParam = function() {
        if ($gameMessagePlus.balloonMode) return this.autoHeight();
        switch ($gameMessagePlus.windowHeight.toLowerCase()) {
            // Unchange
            case "unchange":
                break;
            // Default
            case "default":
                return eval(GabeMZ.MessagePlus.defaultHeight);
            // Auto
            case "auto":
                return this.autoHeight()
            // Full
            case "full":
                return Graphics.height;
            default:
                return eval($gameMessagePlus.windowHeight);
        }
    }

    Window_Message.prototype.updatePop = function() {
        this._pop.visible = this.isOpen();
        if (!this.isOpen()) return;
        const ojamaX = (Graphics.width - Graphics.boxWidth) / 2;
        const ojamaY = (Graphics.height - Graphics.boxHeight) / 2;
        this._pop.visible = $gameMessagePlus.pop;
        this._pop.x = (this.target().x - this.x) - ojamaX - (this._pop.width / 2);
        if ((this.y + ojamaY) > this.target().y) {
            this._pop.y = (this.target().y - this.y) - ojamaY + (this._pop.height + GabeMZ.MessagePlus.balloonPopOffset)
        } else {
            this._pop.y = (this.target().y - this.y) - ojamaY - 40 - (this._pop.height);
        }
        
    }

    Window_Message.prototype.setLines = function(text) {
        this._lines = text.split('\n');
    }

    Window_Message.prototype.majorLine = function() {
        let lineSize = [];
        this._icons = 0;
        this._lines.forEach((line, id) => {
            lineSize.push(this.textSizeEx(line).width);
            this._lines[id] = line;
        });
        return this._lines[lineSize.indexOf(Math.max.apply(null, lineSize))];
    }

    Window_Message.prototype.autoWidth = function() {
        return this.textSizeEx(this.majorLine()).width + (this._icons * 24) + (this.padding * 2) + this._textState.x;
    }

    Window_Message.prototype.autoHeight = function() {
        return (this._lines.length * this.lineHeight()) + (this.padding * 2)
    }

    const _Window_Message_startWait = Window_Message.prototype.startWait;
    Window_Message.prototype.startWait = function(count) {
        if (!this._isProcessing) _Window_Message_startWait.call(this, count);
    };
    
    const _Window_Message_startPause = Window_Message.prototype.startPause;
    Window_Message.prototype.startPause = function() {
        if (!this._isProcessing) _Window_Message_startPause.call(this);
    };

    const _Window_Message_textSizeEx = Window_Message.prototype.textSizeEx;
    Window_Message.prototype.textSizeEx = function(text) {
        this._isProcessing = true
        const value = _Window_Message_textSizeEx.call(this, text);
        this._isProcessing = false;
        return value;
    };

    const _Window_Message_processCharacter = Window_Message.prototype.processCharacter;
    Window_Message.prototype.processCharacter = function(textState) {
        _Window_Message_processCharacter.call(this, textState);
        if (!$gameMessagePlus.sfxState) return;
        const sfxSettings = JSON.parse(GabeMZ.MessagePlus.sfxList[$gameMessagePlus.currentSFXId -  1]);
        const frequency = sfxSettings.frequency;
        if ((Math.floor(Math.random() * frequency) + 1) != frequency) return;
        const name   = sfxSettings.filename;
        const volume = sfxSettings.volume;
        const pitch  = sfxSettings.pitch;
        const pan    = sfxSettings.pan;
        let se = {
            name: name,
            volume: volume,
            pitch: pitch,
            pan: pan
        }
        AudioManager.playSe(se);
    };

    const _Window_Message_updateShowFast = Window_Message.prototype.updateShowFast;
    Window_Message.prototype.updateShowFast = function() {
        if ($gameMessagePlus.inputShowFast) _Window_Message_updateShowFast.call(this);
    };

    const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        _Window_Message_terminateMessage.call(this);
        $gameMessagePlus.forceClose = false;
    };

    //-----------------------------------------------------------------------------
    // Window_NameBox
    //
    // The window for displaying a speaker name above the message window.

    const _Window_NameBox_updatePlacement = Window_NameBox.prototype.updatePlacement;
    Window_NameBox.prototype.updatePlacement = function() {
        if (!this.isOpen()) {
            this.padding = $gameMessagePlus.nameBoxPadding;
            if (this.contents) {
                this.contents.destroy();
                this.createContents();
            }
        }
        _Window_NameBox_updatePlacement.call(this);
        this.x += $gameMessagePlus.nameBoxXOffset;
        this.y += $gameMessagePlus.nameBoxYOffset;
    };

    Window_NameBox.prototype.windowHeight = function() {
        const textHeight = this.textSizeEx(this._name).height;
        const height = textHeight + (this.padding * 2);
        return height;
    };

    //-----------------------------------------------------------------------------
    // Window_ChoiceList
    //
    // The window used for the event command [Show Choices].

    const _Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
    Window_ChoiceList.prototype.updatePlacement = function() {
        if (!this.isOpen()) {
            this.padding = $gameMessagePlus.choiceListPadding;
            if (!Imported.VisuMZ_1_MessageCore) this.refresh();
        }
        _Window_ChoiceList_updatePlacement.call(this);
        this.x = (this._messageWindow.x + this._messageWindow.width) - this.width;
        this.x += $gameMessagePlus.choiceListXOffset;
        this.y += $gameMessagePlus.choiceListYOffset;
    };

    //-----------------------------------------------------------------------------
    // DataManager
    //
    // The static class that manages the database and game objects.

    const _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        _DataManager_createGameObjects.call(this);
        $gameMessagePlus = new Game_MessagePlus();
    };

    const _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        const contents = _DataManager_makeSaveContents.call(this);
        contents.messagePlus = $gameMessagePlus;
        return contents;
    };

    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        $gameMessagePlus = contents.messagePlus;
    };

    //-----------------------------------------------------------------------------
    // BattleManager
    //
    // The static class that manages battle progress.

    const _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        GabeMZ.MessagePlus.messageWindowSaveTempSettings();
        GabeMZ.MessagePlus.messageWindowResetSettings();
        _BattleManager_startBattle.call(this)
    };

    const _BattleManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function() {
        GabeMZ.MessagePlus.messageWindowResetSettings();
        _BattleManager_processVictory.call(this);
    }

    const _BattleManager_displayDefeatMessage = BattleManager.displayDefeatMessage;
    BattleManager.displayDefeatMessage = function() {
        GabeMZ.MessagePlus.messageWindowResetSettings();
        _BattleManager_displayDefeatMessage.call(this);
    };

    const _BattleManager_displayEscapeSuccessMessage = BattleManager.displayEscapeSuccessMessage;
    BattleManager.displayEscapeSuccessMessage = function() {
        GabeMZ.MessagePlus.messageWindowResetSettings();
        _BattleManager_displayEscapeSuccessMessage.call(this);
    };

    const _BattleManager_displayEscapeFailureMessage = BattleManager.displayEscapeFailureMessage;
    BattleManager.displayEscapeFailureMessage = function() {
        GabeMZ.MessagePlus.messageWindowResetSettings();
        _BattleManager_displayEscapeFailureMessage.call(this);
    };

    //-----------------------------------------------------------------------------
    // Scene_Battle
    //
    // The scene class of the battle screen.

    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        _Scene_Battle_terminate.call(this);
        GabeMZ.MessagePlus.messageWindowLoadTempSettings();
    };

})();