//=============================================================================
// TMPlugin - 戻るボタン
// バージョン: 1.0.0
// 最終更新日: 2016/10/28
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc TM菜单场景返回按钮
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param buttonImage
 * @text 按钮图像
 * @desc ボタンとして表示する画像。
 * 初期値: backButton
 * @default backButton
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param sceneMenuX
 * @text 场景菜单X
 * @desc Scene_Menuの戻るボタンＸ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneMenuY
 * @text 场景菜单Y
 * @desc Scene_Menuの戻るボタンＹ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneItemX
 * @text 场景物品X
 * @desc Scene_Itemの戻るボタンＸ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneItemY
 * @text 场景物品Y
 * @desc Scene_Itemの戻るボタンＹ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneSkillX
 * @text 场景技能X
 * @desc Scene_Skillの戻るボタンＸ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneSkillY
 * @text 场景技能Y
 * @desc Scene_Skillの戻るボタンＹ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneEquipX
 * @text 场景装备X
 * @desc Scene_Equipの戻るボタンＸ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneEquipY
 * @text 场景装备Y
 * @desc Scene_Equipの戻るボタンＹ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneStatusX
 * @text 场景状态X
 * @desc Scene_Statusの戻るボタンＸ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneStatusY
 * @text 场景状态Y
 * @desc Scene_Statusの戻るボタンＹ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneOptionsX
 * @text 场景设置X
 * @desc Scene_Optionsの戻るボタンＸ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneOptionsY
 * @text 场景设置Y
 * @desc Scene_Optionsの戻るボタンＹ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneSaveX
 * @text 场景保存X
 * @desc Scene_Saveの戻るボタンＸ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneSaveY
 * @text 场景保存Y
 * @desc Scene_Saveの戻るボタンＹ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneLoadX
 * @text 场景读档X
 * @desc Scene_Loadの戻るボタンＸ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneLoadY
 * @text 场景读档Y
 * @desc Scene_Loadの戻るボタンＹ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneGameEndX
 * @text 场景退出X
 * @desc Scene_GameEndの戻るボタンＸ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneGameEndY
 * @text 场景退出Y
 * @desc Scene_GameEndの戻るボタンＹ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneShopX
 * @text 场景商店X
 * @desc Scene_Shopの戻るボタンＸ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneShopY
 * @text 场景商店Y
 * @desc Scene_Shopの戻るボタンＹ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneNameX
 * @text 场景名称X
 * @desc Scene_Nameの戻るボタンＸ座標。
 * 初期値: 0
 * @default 0
 *
 * @param sceneNameY
 * @text 场景名称Y
 * @desc Scene_Nameの戻るボタンＹ座標。
 * 初期値: 0
 * @default 0
 *
 * @help
 * 准备工作:
 
 * 在img/system文件夹中随插件分发的按钮图像。
 * 将其保存在img/system文件夹中。 文件名是backButton.png。
 * 如果你想使用原始的按钮图像，你可以使用与上述文件名相同的名称。
 * 如果你想使用原始的按钮图片，你必须提供一个与上述文件名相同的图片，或者将插件参数buttonImage改为。
 
 
 * 使用方法。
 
 * 用img/system文件夹中的按钮图片，把这个插件添加到你的网站。
 * * 如果你安装这个插件，后退按钮将自动显示。
 
 * 按钮的显示位置可以使用插件参数为每个场景进行调整，因此。
 * *根据你的喜好来改变它。
 
 * 按钮图像的透明区域（alpha值为0）对点击没有反应。
 
 * 没有插件命令。
 
 * * 本插件已通过RPG Tskool MV 1.3.3版测试。
 */

var Imported = Imported || {};
Imported.TMBackButton = true;

var TMPlugin = TMPlugin || {};
TMPlugin.BackButton = {};
TMPlugin.BackButton.Parameters = PluginManager.parameters('TMBackButton');
TMPlugin.BackButton.ButtonImage = TMPlugin.BackButton.Parameters['buttonImage'] || 'backButton';
TMPlugin.BackButton.SceneMenuX = +(TMPlugin.BackButton.Parameters['sceneMenuX'] || 0);
TMPlugin.BackButton.SceneMenuY = +(TMPlugin.BackButton.Parameters['sceneMenuY'] || 0);
TMPlugin.BackButton.SceneItemX = +(TMPlugin.BackButton.Parameters['sceneItemX'] || 0);
TMPlugin.BackButton.SceneItemY = +(TMPlugin.BackButton.Parameters['sceneItemY'] || 0);
TMPlugin.BackButton.SceneSkillX = +(TMPlugin.BackButton.Parameters['sceneSkillX'] || 0);
TMPlugin.BackButton.SceneSkillY = +(TMPlugin.BackButton.Parameters['sceneSkillY'] || 0);
TMPlugin.BackButton.SceneEquipX = +(TMPlugin.BackButton.Parameters['sceneEquipX'] || 0);
TMPlugin.BackButton.SceneEquipY = +(TMPlugin.BackButton.Parameters['sceneEquipY'] || 0);
TMPlugin.BackButton.SceneStatusX = +(TMPlugin.BackButton.Parameters['sceneStatusX'] || 0);
TMPlugin.BackButton.SceneStatusY = +(TMPlugin.BackButton.Parameters['sceneStatusY'] || 0);
TMPlugin.BackButton.SceneOptionsX = +(TMPlugin.BackButton.Parameters['sceneOptionsX'] || 0);
TMPlugin.BackButton.SceneOptionsY = +(TMPlugin.BackButton.Parameters['sceneOptionsY'] || 0);
TMPlugin.BackButton.SceneSaveX = +(TMPlugin.BackButton.Parameters['sceneSaveX'] || 0);
TMPlugin.BackButton.SceneSaveY = +(TMPlugin.BackButton.Parameters['sceneSaveY'] || 0);
TMPlugin.BackButton.SceneLoadX = +(TMPlugin.BackButton.Parameters['sceneLoadX'] || 0);
TMPlugin.BackButton.SceneLoadY = +(TMPlugin.BackButton.Parameters['sceneLoadY'] || 0);
TMPlugin.BackButton.SceneGameEndX = +(TMPlugin.BackButton.Parameters['sceneGameEndX'] || 0);
TMPlugin.BackButton.SceneGameEndY = +(TMPlugin.BackButton.Parameters['sceneGameEndY'] || 0);
TMPlugin.BackButton.SceneShopX = +(TMPlugin.BackButton.Parameters['sceneShopX'] || 0);
TMPlugin.BackButton.SceneShopY = +(TMPlugin.BackButton.Parameters['sceneShopY'] || 0);
TMPlugin.BackButton.SceneNameX = +(TMPlugin.BackButton.Parameters['sceneNameX'] || 0);
TMPlugin.BackButton.SceneNameY = +(TMPlugin.BackButton.Parameters['sceneNameY'] || 0);

(function() {

  //-----------------------------------------------------------------------------
  // Window_Selectable
  //

  var _Window_Selectable_processTouch = Window_Selectable.prototype.processTouch;
  Window_Selectable.prototype.processTouch = function() {
    if (this.isOpenAndActive() && TouchInput.isTriggered()) {
      var backButton = SceneManager._scene._backButtonSprite;
      if (this.isCancelEnabled() && backButton && backButton.width) {
        var x = backButton.x;
        var y = backButton.y;
        if (TouchInput.x >= x && TouchInput.x < x + backButton.width &&
            TouchInput.y >= y && TouchInput.y < y + backButton.height &&
            +backButton.bitmap.getAlphaPixel(TouchInput.x - x, TouchInput.y - y) > 0) {
          this.processCancel();
          return;
        }
      }
    }
    _Window_Selectable_processTouch.call(this);
  };

  //-----------------------------------------------------------------------------
  // Scene_MenuBase
  //

  var _Scene_MenuBase_create = Scene_MenuBase.prototype.create;
  Scene_MenuBase.prototype.create = function() {
    _Scene_MenuBase_create.call(this);
    this.createBackButton();
  };

  Scene_MenuBase.prototype.createBackButton = function() {
    this._backButtonSprite = new Sprite();
    this._backButtonSprite.bitmap = ImageManager.loadSystem(TMPlugin.BackButton.ButtonImage);
    this._backButtonSprite.x = this.backButtonX();
    this._backButtonSprite.y = this.backButtonY();
    this.addChild(this._backButtonSprite);
  };

  Scene_MenuBase.prototype.backButtonX = function() {
    return 0;
  };

  Scene_MenuBase.prototype.backButtonY = function() {
    return 0;
  };

  //-----------------------------------------------------------------------------
  // Scene_Menu
  //

  Scene_Menu.prototype.backButtonX = function() {
    return TMPlugin.BackButton.SceneMenuX;
  };

  Scene_Menu.prototype.backButtonY = function() {
    return TMPlugin.BackButton.SceneMenuY;
  };

  //-----------------------------------------------------------------------------
  // Scene_Item
  //

  Scene_Item.prototype.backButtonX = function() {
    return TMPlugin.BackButton.SceneItemX;
  };

  Scene_Item.prototype.backButtonY = function() {
    return TMPlugin.BackButton.SceneItemY;
  };

  //-----------------------------------------------------------------------------
  // Scene_Skill
  //

  Scene_Skill.prototype.backButtonX = function() {
    return TMPlugin.BackButton.SceneSkillX;
  };

  Scene_Skill.prototype.backButtonY = function() {
    return TMPlugin.BackButton.SceneSkillY;
  };

  //-----------------------------------------------------------------------------
  // Scene_Equip
  //

  Scene_Equip.prototype.backButtonX = function() {
    return TMPlugin.BackButton.SceneEquipX;
  };

  Scene_Equip.prototype.backButtonY = function() {
    return TMPlugin.BackButton.SceneEquipY;
  };

  //-----------------------------------------------------------------------------
  // Scene_Status
  //

  Scene_Status.prototype.backButtonX = function() {
    return TMPlugin.BackButton.SceneStatusX;
  };

  Scene_Status.prototype.backButtonY = function() {
    return TMPlugin.BackButton.SceneStatusY;
  };

  //-----------------------------------------------------------------------------
  // Scene_Options
  //

  Scene_Options.prototype.backButtonX = function() {
    return TMPlugin.BackButton.SceneOptionsX;
  };

  Scene_Options.prototype.backButtonY = function() {
    return TMPlugin.BackButton.SceneOptionsY;
  };

  //-----------------------------------------------------------------------------
  // Scene_Save
  //

  Scene_Save.prototype.backButtonX = function() {
    return TMPlugin.BackButton.SceneSaveX;
  };

  Scene_Save.prototype.backButtonY = function() {
    return TMPlugin.BackButton.SceneSaveY;
  };

  //-----------------------------------------------------------------------------
  // Scene_Load
  //

  Scene_Load.prototype.backButtonX = function() {
    return TMPlugin.BackButton.SceneLoadX;
  };

  Scene_Load.prototype.backButtonY = function() {
    return TMPlugin.BackButton.SceneLoadY;
  };

  //-----------------------------------------------------------------------------
  // Scene_GameEnd
  //

  Scene_GameEnd.prototype.backButtonX = function() {
    return TMPlugin.BackButton.SceneGameEndX;
  };

  Scene_GameEnd.prototype.backButtonY = function() {
    return TMPlugin.BackButton.SceneGameEndY;
  };

  //-----------------------------------------------------------------------------
  // Scene_Shop
  //

  Scene_Shop.prototype.backButtonX = function() {
    return TMPlugin.BackButton.SceneShopX;
  };

  Scene_Shop.prototype.backButtonY = function() {
    return TMPlugin.BackButton.SceneShopY;
  };

  //-----------------------------------------------------------------------------
  // Scene_Name
  //

  Scene_Name.prototype.backButtonX = function() {
    return TMPlugin.BackButton.SceneNameX;
  };

  Scene_Name.prototype.backButtonY = function() {
    return TMPlugin.BackButton.SceneNameY;
  };

})();
