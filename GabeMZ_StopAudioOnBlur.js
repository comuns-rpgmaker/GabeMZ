//============================================================================
// Gabe MZ - Stop Audio On Blur
//----------------------------------------------------------------------------
// 25/06/21 | Version: 1.0.2 | Audio load with blurred window bug fix
// 22/06/21 | Version: 1.0.1 | Improved code for availability 
// 18/05/21 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This plugin is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.2] Stops playing audio when game window is blurred. 
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 * 
 * @help Gabe MZ - Stop Audio On Blur
 *  - This plugin is released under the zlib License.
 * 
 * This is a simple plugin to stop playing game audio when the window is blurred.
 * It's especially useful when you want to create cutscenes that have the audio 
 * synchronized with event commands.
 */

var Imported = Imported || {};
Imported.GMZ_StopAudioOnBlur = true;

var GabeMZ                     = GabeMZ || {};
GabeMZ.StopAudioOnBlur         = GabeMZ.StopAudioOnBlur || {};
GabeMZ.StopAudioOnBlur.VERSION = [1, 0, 2];

(() => {

    function onFocus() {
        AudioManager.replayOnHoldAudio();
    }

    function onBlur() {
        AudioManager.saveOnHoldAudio();
    }

    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    //-----------------------------------------------------------------------------
    // WebAudio
    //
    // The audio object of Web Audio API.

    const _WebAudio_play = WebAudio.prototype.play;
    WebAudio.prototype.play = function(loop, offset) {
        _WebAudio_play.call(this, ...arguments);
        const loadListener = () => {
            if (!window.document.hasFocus()) {
                AudioManager.saveOnHoldAudio();
            }
        };
        this.addLoadListener(loadListener);
    };

    //-----------------------------------------------------------------------------
    // AudioManager
    //
    // The static class that handles BGM, BGS, ME and SE.

    AudioManager._onHoldAudio = {
        bgm: null,
        bgs: null
    };

    AudioManager.saveOnHoldAudio = function() {
        this._onHoldAudio.bgm = this.saveBgm();
        this._onHoldAudio.bgs = this.saveBgs();
        const bgm = this.saveBgm();
        const bgs = this.saveBgs();
        bgm.volume = 0;
        bgs.volume = 0;
        this.updateBgmParameters(bgm);
        this.updateBgsParameters(bgs);
    };
    
    AudioManager.replayOnHoldAudio = function() {
        if (this._onHoldAudio.bgm) AudioManager.replayBgm(this._onHoldAudio.bgm, true);
        if (this._onHoldAudio.bgs) AudioManager.replayBgs(this._onHoldAudio.bgs, true);
    }

    const _AudioManager_replayBgm = AudioManager.replayBgm;
    AudioManager.replayBgm = function(bgm, blur) {
        _AudioManager_replayBgm.call(this, ...arguments);
        if (!blur || !this._bgmBuffer) return;
        if (!this._meBuffer) {
            this._bgmBuffer.play(true, bgm.pos || 0);
        }
    };

    const _AudioManager_replayBgs = AudioManager.replayBgs;
    AudioManager.replayBgs = function(bgs, blur) {
        _AudioManager_replayBgs.call(this, ...arguments);
        if (!blur || !this._bgsBuffer) return;
        this._bgsBuffer.play(true, bgs.pos || 0);
    };

})();