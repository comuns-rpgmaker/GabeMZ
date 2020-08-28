//============================================================================
// Gabe MZ - Fog Effects
//----------------------------------------------------------------------------
// 25/08/20 | Version: 1.0.3
// This software is released under the zlib License.
//============================================================================

/*:
 * @target MZ
 * @plugindesc Add fog effects on the game screen.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 * 
 * @help Gabe MZ - Fog Effects
 *  - This plugin is released under the zlib License.
 * 
 * This plugin provides a option to add fog effects on the game screen.
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
 *   Clear Screen
 *       | This command clear all screen, removing all fog effects from 
 *       | all layers.
 * 
 * Map Note Tag:
 *   <addFog layer: id>
 *       | This note tag add the fog effect from specific id to the
 *       | specific layer.
 * Usage Example:
 *   <addFog 0: 1> 
 *       | This tag adds the fog effects of ID 1 at layer 0.
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

/*:pt
 * @target MZ
 * @plugindesc Adicionas efeitos de névoa ao jogo.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMZ
 * 
 * @help Gabe MZ - Fog Effects
 *  - Esse plugin foi disponibilizado sob a licença zlib.
 * 
 * Esse plugin permite adicionar efeitos de névoa ao jogo.
 * 
 * Antes de mais nada é necessário configurar os efeitos de névoa que serão
 * utilizados no jogo, faça isso através dos parâmetros dese plugin. Feito
 * isso você poderá adicionar os efeitos de névoa configurados ao mapa
 * atrás de Comandos de Plugin ou pela caixa de notas de um mapa.
 * 
 * * As imagens usadas deverão estar no seguinte diretório: img/fogs/
 * 
 * Comandos de Plugin:
 *   Set Fog Effect
 *       | Esse comando permite configurar e adicionar um efeito de névoa
 *       | espécifico a uma camada específica.
 * 
 *   Remove Fog Effect from Layer
 *       | Esse comando remove o efeito de névoa da camada especificada.
 * 
 *   Clear Screen
 *       | Esse comando limpa toda a tela, removendo todos efeitos do
 *       | mapa atual.
 * 
 * Tag para Notas do Mapa:
 *   <addFog layer: id>
 *       | Essa nota adiciona o efeito de névoa correspondendo ao ID
 *       | indicado a camada especificada.
 * 
 * Exemplos de Uso:
 *   <addFog: 1: 1> 
 *       | Essa nota adiciona o efeito de névoa de ID 1 a camada 1.
 *   <addFog: 4: 3> 
 *       | Essa nota adiciona o efeito de névoa de ID 3 a camada 4.
 *   <addFog: 2: 7> 
 *       | Essa nota adiciona o efeito de névoa de ID 7 a camada 2.
 * 
 * Para suporte e acompanhar o lançamento de novos plugins nos acompanhe
 * através do nosso servidor do Discord:
 * https://discord.gg/GG85QRz
 * 
 * @param fogSettings
 * @text Fog Settings
 * @desc Define as configurações de efeitos de névoa que serão usadas pelo plugin
 * @type struct<fogSettingsStruct>[]
 * 
 * @command setFogEffect
 * @text Set Fog Effect
 * @desc Define e adiciona o efeito de névoa a camada especificada
 * 
 * @arg settings
 * @text Set Fog Effect
 * @desc Define e adiciona o efeito de névoa a camada especificada
 * @type struct<setFogStruct>[]
 * 
 * @command removeFogEffectLayer
 * @text Remove Fog Effect from Layer
 * @desc Remove o efeito de névoa da camada especificada
 * 
 * @arg fogLayer
 * @text Fog Effect Layer
 * @desc Defina a camada em que o efeito de névoa será removido
 * @type number[]
 * @min 1
 * 
 * @command clearScreen
 * @text Clear Screen
 * @desc Remove todos os efeitos de névoa da tela no mapa atual
 * 
 */

/*~struct~setFogStruct:pt
 * @param fogID
 * @text Fog Effect ID
 * @desc  Define o ID do efeito de névoa
 * @type number
 * @min 1
 * 
 * @param fogLayer
 * @text Fog Effect Layer
 * @desc Define a camda em que a névoa será adicionada
 * @type number
 * @min 1
 */

/*~struct~fogSettingsStruct:br
 * @param fogFilename
 * @text Fog Filename
 * @desc Defina o arquivo de imagem da névoa
 * @type file
 * @dir img/fogs/
 * 
 * @param fogOpacity
 * @text Fog Opacity
 * @desc Defina a opacidade da névoa
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @param fogBlendMode
 * @text Fog Blend Mode
 * @desc Defina a mesclagem da névoa
 * @type select
 * @option Normal
 * @value 0
 * @option Adicionar
 * @value 1
 * @option Subtrair
 * @value 2
 * @default 0
 * 
 * @param fogMoveX
 * @text Fog Move X
 * @desc Defina a constante de movimento horizontal da névoa
 * @type number
 * @decimals 1
 * @min -50
 * @max 50
 * @default 0
 * 
 * @param fogMoveY
 * @text Fog Move Y
 * @desc Defina a constante de movimento vertical da névoa
 * @type number
 * @decimals 1
 * @min -50
 * @max 50
 * @default 0
 */ 

var GabeMZ                = GabeMZ || {};
GabeMZ.FogEffects         = GabeMZ.FogEffects || {};
GabeMZ.FogEffects.VERSION = [1, 0, 3];

(() => {

    const pluginName = "GabeMZ_FogEffects";
    GabeMZ.params = PluginManager.parameters(pluginName);

    GabeMZ.FogEffects.fogSettings = JSON.parse(GabeMZ.params.fogSettings);
    GabeMZ.FogEffects.fogList = [];
    GabeMZ.FogEffects.currentMap = 0
    
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
        let layers = JSON.parse(args.fogLayer);
        layers.forEach( layer => {GabeMZ.FogEffects.tempFog.push([null, parseInt(layer)])});
        GabeMZ.FogEffects.needRefresh = true;
    });

    PluginManager.registerCommand(pluginName, "clearScreen", args => {
        let layer = parseInt(args.fogLayer);
        GabeMZ.FogEffects.tempFog = {id: null, layer: null};
        GabeMZ.FogEffects.needRefresh = true;
    });

    //-----------------------------------------------------------------------------
    // ImageManager
    //
    // The static class that loads images, creates bitmap objects and retains them.

    ImageManager.loadFogs = function(filename) {
        return this.loadBitmap("img/fogs/", filename);
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Base
    //
    // The superclass of Spriteset_Map and Spriteset_Battle.

    let _Spriteset_Base_createLowerLayer = Spriteset_Base.prototype.createLowerLayer;
    Spriteset_Base.prototype.createLowerLayer = function() {
        _Spriteset_Base_createLowerLayer.call(this);
        this.createFogList();
    };

    let _Spriteset_Base_update = Spriteset_Base.prototype.update;
    Spriteset_Base.prototype.update = function() {
        _Spriteset_Base_update.call(this);
        if (GabeMZ.FogEffects.needRefresh) this.refreshFogList();
        if (!GabeMZ.FogEffects.fogList) return;
        GabeMZ.FogEffects.fogList.forEach(fog => {
            if (fog) this.updateFog(fog);
        });
    };

    Spriteset_Base.prototype.createFogList = function() {
        if (GabeMZ.FogEffects.currentMap == $gameMap.mapId()) {
            GabeMZ.FogEffects.fogList.forEach( (fog, id) => {
                if (fog) this.createFog(fog.id, id);
            });
        } else {
            GabeMZ.FogEffects.currentMap = $gameMap.mapId()
            this.clearList();
            let reg = /<addFog\s*(\d+):\s*(\d+)>/g;
            let match;
            while (match = reg.exec($dataMap.note)) {
                this.createFog(match[2], match[1]);
            }
        }
    }

    Spriteset_Base.prototype.createFog = function(id, layer) {
        if (layer < 1) return;
        let fogSetting = JSON.parse(GabeMZ.FogEffects.fogSettings[id - 1]);
        this._fog = new TilingSprite();
        this._fog.bitmap = ImageManager.loadFogs(fogSetting.fogFilename);
        this._fog.move(-48, -48, Graphics.width + 96, Graphics.height + 96);
        this._fog.opacity = parseInt(fogSetting.fogOpacity);
        this._fog.blendMode = parseInt(fogSetting.fogBlendMode);
        this._fog.constX = 0;
        this._fog.constY = 0;
        this._fog.speedX = -parseFloat(fogSetting.fogMoveX);
        this._fog.speedY = -parseFloat(fogSetting.fogMoveY);
        this._fog.id = id;
        this.addChildAt(this._fog, 1); 
        GabeMZ.FogEffects.fogList[layer] = this._fog;
    }

    Spriteset_Base.prototype.refreshFogList = function() {
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
    }

    Spriteset_Base.prototype.clearList = function() {
        GabeMZ.FogEffects.fogList.forEach(fog => {this.removeChild(fog)});
        GabeMZ.FogEffects.fogList = [];
    }

    Spriteset_Base.prototype.updateFog = function(fog) {
        fog.constX += fog.speedX;
        fog.origin.x = ($gameMap.displayX() * $gameMap.tileWidth()) + fog.constX;
        fog.constY += fog.speedY;
        fog.origin.y = ($gameMap.displayY() * $gameMap.tileHeight()) + fog.constY;
    }

})();