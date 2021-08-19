//============================================================================
// Gabe MZ - Message Character Sound
//----------------------------------------------------------------------------
// 11/08/21 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This software is released under the zlib License.
//============================================================================

/*: 
 * @target MZ
 * @plugindesc [v1.0.0] Allows to play a character SE during the game messages.
 * @author Gabe (Gabriel Nascimento)
 * @url http://patreon.com/gabriel_nfd
 * 
 * @help Gabe MZ - Message Character Sound
 *  - This plugin is released under the zlib License.
 * 
 * This plugin allows you to play a character SE during the game messages.
 * 
 * For support and new plugins join our Discord server: 
 * https://discord.gg/GG85QRz
 * 
 * @param seSettings
 * @text Message SE Settings
 * 
 * @param seList
 * @parent seSettings
 * @text SE List
 * @desc Set a list of SE settings to be used.
 * @type struct<seListStruct>[]
 * @default ["{\"filename\":\"Cursor1\",\"frequency\":\"4\",\"volume\":\"25\",\"pitch\":\"100\",\"pan\":\"0\"}","{\"filename\":\"Cursor2\",\"frequency\":\"3\",\"volume\":\"25\",\"pitch\":\"100\",\"pan\":\"0\"}"]
 * 
 * @param defaultSEId
 * @parent seSettings
 * @text Default SE ID
 * @desc Set the default SE ID.
 * @type number
 * @min 1
 * @default 1
 * 
 * @command setState
 * @text Set Message Character Sound State
 * @desc Set the message character sound state.
 * 
 * @arg state
 * @text State
 * @desc Set the current state of the message character sound.
 * @type boolean
 * @default true
 * 
 * @command setId
 * @text Set Current Message Character Sound
 * @desc Set the current message character sound id.
 * 
 * @arg id
 * @text Id
 * @desc Set the id of the current message character sound.
 * @type number
 * @min 1
 * @default 1
 */

/*~struct~seListStruct:
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
Imported.GMZ_MessageCharacterSound = true;

var GabeMZ                           = GabeMZ || {};
GabeMZ.MessageCharacterSound         = GabeMZ.MessageCharacterSound || {};
GabeMZ.MessageCharacterSound.VERSION = [1, 0, 0];

(() => {

    const pluginName = "GabeMZ_MessageCharacterSound";
    const params = PluginManager.parameters(pluginName);

    GabeMZ.MessageCharacterSound.seList = [];
    GabeMZ.MessageCharacterSound.defaultSEId = parseInt(params.defaultSEId);

    for (const setting of JSON.parse(params.seList)) {
        GabeMZ.MessageCharacterSound.seList.push(JSON.parse(setting));
    }

    //-----------------------------------------------------------------------------
    // PluginManager
    //
    // The static class that manages the plugins.

    PluginManager.registerCommand(pluginName, "setState", args => {
        const state = args.state == "true";
        $gameSystem.setMessageCharacterSoundState(state);
    });

    PluginManager.registerCommand(pluginName, "setId", args => {
        const id = parseInt(args.id);
        $gameSystem.setMessageChracterSoundSEId(id);
    });

    //-----------------------------------------------------------------------------
    // Game_System
    //
    // The game object class for the system data.

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._messageCharacterSoundState = true;
        this._messageChracterSoundSEId = GabeMZ.MessageCharacterSound.defaultSEId;
    };

    Game_System.prototype.messageCharacterSoundState = function() {
        return this._messageCharacterSoundState;
    };

    Game_System.prototype.messageChracterSoundSEId = function() {
        return this._messageChracterSoundSEId;
    };

    Game_System.prototype.setMessageCharacterSoundState = function(state) {
        this._messageCharacterSoundState = state;
    };

    Game_System.prototype.setMessageChracterSoundSEId = function(id) {
        this._messageChracterSoundSEId = id;
    };

    //-----------------------------------------------------------------------------
    // Window_Message
    //
    // The window for displaying text messages.

    const _Window_Message_initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function() {
        _Window_Message_initMembers.call(this, ...arguments);
        this._characterIndex = 0; 
    };

    const _Window_Message_newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function() {
        _Window_Message_newPage.call(this, ...arguments)
        this._characterIndex = 0;
    };

    const _Window_Message_processCharacter = Window_Message.prototype.processCharacter;
    Window_Message.prototype.processCharacter = function() {
        _Window_Message_processCharacter.call(this, ...arguments);
        this._characterIndex++;
        if (!$gameSystem.messageCharacterSoundState()) return;
        const seSettings = GabeMZ.MessageCharacterSound.seList[$gameSystem.messageChracterSoundSEId() - 1];
        const frequency = seSettings.frequency;
        if (!(this._characterIndex % frequency)) this.playCharacterSound(seSettings);
    };

    Window_Message.prototype.playCharacterSound = function(seSettings) {
        const name   = seSettings.filename;
        const volume = seSettings.volume;
        const pitch  = seSettings.pitch;
        const pan    = seSettings.pan;
        const se     = {
            name: name,
            volume: volume,
            pitch: pitch,
            pan: pan
        }
        AudioManager.playSe(se);
    };

})();