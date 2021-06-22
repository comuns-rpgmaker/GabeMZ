//============================================================================
// Gabe MZ - Stop Audio On Blur
//----------------------------------------------------------------------------
// 18/05/21 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This plugin is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.0] Stops playing audio when game window is blurred. 
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
GabeMZ.StopAudioOnBlur.VERSION = [1, 0, 0];

(() => {

    let onHoldAudio = {
        bgm: null,
        bgs: null
    };

    function onFocus() {
        if (onHoldAudio.bgm) AudioManager.replayBgm(onHoldAudio.bgm, true);
        if (onHoldAudio.bgs) AudioManager.replayBgs(onHoldAudio.bgs, true);
    }

    function onBlur() {
        onHoldAudio.bgm = AudioManager.saveBgm();
        onHoldAudio.bgs = AudioManager.saveBgs();
        const bgm = AudioManager.saveBgm();
        const bgs = AudioManager.saveBgs();
        bgm.volume = 0;
        bgs.volume = 0;
        AudioManager.updateBgmParameters(bgm);
        AudioManager.updateBgsParameters(bgs);
    }

    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    //-----------------------------------------------------------------------------
    // AudioManager
    //
    // The static class that handles BGM, BGS, ME and SE.

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