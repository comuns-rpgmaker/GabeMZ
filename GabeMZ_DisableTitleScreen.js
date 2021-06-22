//==========================================================================
// Gabe MZ - Disable Title Screen
//----------------------------------------------------------------------------
// 20/08/20 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This software is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.0] Disable the default Title Screen.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 *
 * @help Gabe MZ - Diblade Title Screen
 *  - This plugin is released under the zlib License.
 * 
 * This plugin disable the default title screen of RPG Maker.
 * 
 * Set the Default Title Screen parameter to set if the default title screen
 * will still be accessible via the menu and the "Return to Title Screen" event 
 * command. 
 * 
 * Also is possible to enable or disable this option through a Plugin Command. 
 * 
 * Plugin Commands:
 *   Set Title Screen
 *       | This command allows to enable or disable the default Title Screen 
 *       | in game start
 *
 * @param defaultTitleScreen
 * @text Default Title Screen
 * @desc Enable or disable the default Title Screen in game start.
 * @type boolean
 * @default false
 * 
 * @command defaultTitle
 * @text Set Title Screen
 * @desc Set enable or disable the default Title Screen.
 *
 * @arg defaultTitleScreen
 * @type boolean
 * @default false
 * @text Default Title Screen
 * @desc Enable or disable the default Title Screen.
 */

/*:pt
 * @target MZ
 * @plugindesc [v1.0.0] Desabilita a Tela de Título padrão.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 *
 * @help
 * Gabe MZ - Disable Title Screen
 *  - Esse plugin foi disponibilizado sob a licença zlib.
 * 
 * Esse plugin desabilita a tela de título padrão do RPG Maker MZ.
 * 
 * Configure o parâmetro Default Title Screen para definir se a tela de título padrão 
 * ainda será acessível através do menu e do comando de evento "Voltar à Tela de 
 * Título". 
 * 
 * Também é possível ativar ou desativar essa opção através de um Plugin Command.
 * 
 * Plugin Commands:
 *   Set Title Screen
 *       | Esse comando ativa ou desativa a Tela de Título padrão no início do 
 *       | jogo.
 *
 * @param defaultTitleScreen
 * @text Default Title Screen
 * @desc Ativa ou desativa a Tela de Título padrão no início do jogo.
 * @type boolean
 * @default false
 * 
 * @command defaultTitle
 * @text Set Title Screen
 * @desc Define se a Tela de Título padrão será ativa ou não.
 *
 * @arg defaultTitleScreen
 * @type boolean
 * @default false
 * @text Default Title Screen
 * @desc Ativa ou desativa a tela de título padrão.
 */

var Imported = Imported || {};
Imported.GMZ_DisableTitleScreen = true;

var GabeMZ                = GabeMZ || {};
GabeMZ.DisableTitleScreen = GabeMZ.DisableTitleScreen || {};
GabeMZ.DisableTitleScreen.VERSION = [1, 0, 0];

(() => {

    const pluginName = "GabeMZ_DisableTitleScreen";
    GabeMZ.params = PluginManager.parameters(pluginName);
    GabeMZ.DisableTitleScreen.titleInGame = GabeMZ.params.defaultTitleScreen == "true";
    GabeMZ.DisableTitleScreen.mapFadeOut = true;

    //-----------------------------------------------------------------------------
    // PluginManager
    //
    // The static class that manages the plugins.

    PluginManager.registerCommand(pluginName, "defaultTitle", args => {
        const bool = args.defaultTitleScreen == "true";
        GabeMZ.DisableTitleScreen.titleInGame = bool;
    });

    //-----------------------------------------------------------------------------
    // DataManager
    //
    // The static class that manages the database and game objects.

    const _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        const contents = _DataManager_makeSaveContents.call(this);
        contents.disableTitle = GabeMZ.DisableTitleScreen.titleInGame;
        return contents;
    }

    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        GabeMZ.DisableTitleScreen.titleInGame = contents.disableTitle;
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //
    // The interpreter for running event commands.

    const _Game_Interpreter_command354 = Game_Interpreter.prototype.command354
    Game_Interpreter.prototype.command354 = function() {
        if (!GabeMZ.DisableTitleScreen.titleInGame) {
            GabeMZ.DisableTitleScreen.mapFadeOut = true;
            DataManager.setupNewGame();
            SceneManager.goto(Scene_Map);
            return true;
        } else {
            _Game_Interpreter_command354.call(this);
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //
    // The scene class for initializing the entire game.

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        if (GabeMZ.DisableTitleScreen.titleInGame) {
            _Scene_Boot_start.call(this);
        } else {
            SoundManager.preloadImportantSounds();
            if (DataManager.isBattleTest()) {
                DataManager.setupBattleTest();
                SceneManager.goto(Scene_Battle);
            } else if (DataManager.isEventTest()) {
                DataManager.setupEventTest();
                SceneManager.goto(Scene_Map);
            } else {
                this.checkPlayerLocation();
                DataManager.setupNewGame();
                SceneManager.goto(Scene_Map);
            }
            this.resizeScreen();
            this.updateDocumentTitle();
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Map
    //
    // The scene class of the map screen.

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        if (!GabeMZ.DisableTitleScreen.titleInGame) GabeMZ.DisableTitleScreen.mapFadeOut = false;
    };

    const _Scene_Map_needsSlowFadeOut = Scene_Map.prototype.needsSlowFadeOut;
    Scene_Map.prototype.needsSlowFadeOut = function() {
        return  _Scene_Map_needsSlowFadeOut.call(this) || GabeMZ.DisableTitleScreen.mapFadeOut;
    };

    //-----------------------------------------------------------------------------
    // Scene_GameEnd
    //
    // The scene class of the game end screen.

    const _Scene_GameEnd_commandToTitle = Scene_GameEnd.prototype.commandToTitle;
    Scene_GameEnd.prototype.commandToTitle = function() {
        if (!GabeMZ.DisableTitleScreen.titleInGame) {
            this.fadeOutAll();
            DataManager.setupNewGame();
            SceneManager.goto(Scene_Map);
        } else {
            _Scene_GameEnd_commandToTitle.call(this);
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Gameover
    //
    // The scene class of the game over screen.

    const _Scene_Gameover_gotoTitle = Scene_Gameover.prototype.gotoTitle;
    Scene_Gameover.prototype.gotoTitle = function() {
        if (!GabeMZ.DisableTitleScreen.titleInGame) {
            DataManager.setupNewGame();
            SceneManager.goto(Scene_Map);
        } else {
            _Scene_Gameover_gotoTitle.call(this);
        }
    };

})();