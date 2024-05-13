// =====================
// HeartDisplayPlugin.js
// =====================

/*:
 * @target MZ
 * @plugindesc 塞尔达血量系统
 * @author Sang Hendrix & ChatGPT
 * @url http://facebook.com/hendrixguy
 *
 * @param showHearts
 * @text 游戏初始显示图像？
 * @type boolean
 * @desc 选择默认情况下是否启用心形。
 * @default true
 * 
 * @param heartImage
 * @text 心形图像文件
 * @type file
 * @dir img/
 * @desc 选择您的心形图像文件
 * 
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param showHeartBlink
 * @text 血量低闪烁提醒
 * @type boolean
 * @desc 选择当当前红心值较低时，心形是否应闪烁红色。
 * @default true
 * 
 * @param blinkSpeed
 * @text 闪烁速度
 * @type number
 * @desc 设置闪烁效果的闪烁速度。数字越大，闪烁越慢。
 * @default 20
 * 
 * @param blinkThreshold
 * @text 闪烁阈值
 * @type select
 * @desc 开始闪烁效果的血液阈值。选择当前血液和最大血液之间的比率。
 * @default 1/4
 * @option 1/5
 * @value 1/5
 * @option 1/4
 * @value 1/4
 * @option 1/3
 * @value 1/3
 * @option 1/2
 * @value 1/2
 * 
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param commonEventId
 * @text 触发共通事件
 * @type common_event
 * @desc 共通事件 ID，心为空时触发！
 * @default 1
 * 
 * @param BreakCommonEvent
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param currentHeartsVariable
 * @text 绑定变量
 * @type variable
 * @desc 选择一个变量来存储当前心形值。
 * @default 2
 *
 * @param maxHearts
 * @text 心默认最大值
 * @type number
 * @desc 游戏开始时要显示的默认最大心形。
 * @default 5
 * 
 * @param BreakMax
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param positionX
 * @text X 位置
 * @type number
 * @desc 选择第一个心形的 X 位置。
 * @default 8
 * 
 * @param positionY
 * @text Y 位置
 * @type number
 * @desc 选择第一个心形的 Y 位置。
 * @default 8
 * 
 * @param heartsPerRow
 * @text 每行心数
 * @type number
 * @desc 设置每行可以显示的心形限制。
 * @default 8
 *
 * @param rowSpacing
 * @text 行距
 * @type number
 * @desc 设置心形行之间的间距。
 * @default 40
 *
 * @param heartSpacing
 * @text 心间距
 * @type number
 * @desc 设置每颗心之间的间距。
 * @default 8
 * 
 * @help
 * Version 1.0.0
 * 此插件将帮助您使用心形创建类似塞尔达的HP系统。
 * 如果您想获得有关插件的帮助，请与我联系：
 * http://facebook.com/hendrixguy
 * 汉化:云书
 * 特征：
 * - 当HP量低时，心会闪烁
 * - 在游戏过程中更改最大心
 * - 增加和减少心
 * - 红心可以在游戏过程中隐藏或显示
 * - 可以设置每行和间距的心形
 * - 当用完心脏时可以自动触发公共事件ID
 * - 检查插件命令了解更多信息。
 条款：
 请不要声称它是你的。插件可用于商业和非商业游戏。
 *
 * @command setHeartVisibility
 * @text 设置心脏可见性
 * @desc 设置心形在屏幕上的可见性。
 * @arg visible
 * @type boolean
 * @text 可见
 * @desc 设置心形的可见性
 * @default true
 * 
 * @command increaseHeart
 * @text 增加心脏
 * @desc 将当前心形数增加 1。
 *
 * @command decreaseHeart
 * @text 减少心脏
 * @desc 将当前心形数减少 1。
 * 
 * @command setMaxHearts
 * @text 改变最大心形
 * @desc 更改最大心形的数量
 *
 * @arg newMaxHearts
 * @text 最大值红心
 * @type number
 * @desc 更改最大心形的数量
 * @default 5
*/
(() => {
	const parameters = PluginManager.parameters("HeartDisplayPlugin");
	const heartImagePath = parameters["heartImage"];
	const showHeartBlink = JSON.parse(parameters["showHeartBlink"]);
	const currentHeartsVariable = parseInt(parameters["currentHeartsVariable"]);
	let maxHearts = parseInt(parameters["maxHearts"]);
	const positionX = parseInt(parameters["positionX"]);
	const positionY = parseInt(parameters["positionY"]);
	const heartsPerRow = parseInt(parameters["heartsPerRow"]);
	const rowSpacing = parseInt(parameters["rowSpacing"]);
	const heartSpacing = parseInt(parameters["heartSpacing"]);
	const showHearts = JSON.parse(parameters["showHearts"]);

	let heartVisible = showHearts;

	const _createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
	const _Game_System_initialize = Game_System.prototype.initialize;
	let globalCurrentHearts = maxHearts;

	Game_System.prototype.initialize = function () {
		_Game_System_initialize.call(this);
		const currentHearts = globalCurrentHearts;
		if (typeof currentHearts !== 'number' || currentHearts < 0 || currentHearts > maxHearts) {
			globalCurrentHearts = maxHearts;
			this._currentHearts = maxHearts;
		} else {
			this._currentHearts = currentHearts;
		}
		console.log('Khởi tạo. Máu hiện tại =', this._currentHearts);
		console.log('Khởi tạo. Máu tối đa =', maxHearts);
		if (heartDisplay) {
			heartDisplay.refresh();
		}
	};

	const createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
	Scene_Map.prototype.createDisplayObjects = function () {
		createDisplayObjects.call(this);
		if (showHearts) {
			$gameVariables.setValue(currentHeartsVariable, maxHearts);
			heartDisplay = new HeartDisplay(maxHearts);
			heartDisplay.setHeartVisibility(heartVisible);
			this.addChild(heartDisplay);
		}
	};


	class HeartDisplay extends Sprite {
		constructor(maxHearts) {
			super();
			this._maxHearts = maxHearts;
			this._heartSprites = [];
			this.loadHeartImage();
			this._previousHearts = -1;
		}

		refresh() {
			this.updateHeartsDisplay();
		}


		updateHeartsDisplay() {
			if (!heartVisible) return;
			const currentHearts = $gameSystem._currentHearts;
			const blinkThreshold = parameters["blinkThreshold"];
			const thresholdHearts = this._maxHearts * (blinkThreshold === "1/2" ? 0.5 : blinkThreshold === "1/3" ? 1 / 3 : blinkThreshold === "1/4" ? 0.25 : 0.2);
			const shouldBlink = showHeartBlink && currentHearts <= thresholdHearts;
			const blinkSpeed = parseInt(parameters["blinkSpeed"]);
			const justReachedZero = this._previousHearts !== 0 && currentHearts === 0;
			const justIncreased = this._previousHearts !== -1 && this._previousHearts < currentHearts;
			const justDecreased = this._previousHearts !== -1 && this._previousHearts > currentHearts;

			for (let i = 0; i < this._maxHearts; i++) {
				if (this._heartSprites[i]) {
					const blinkThisHeart = shouldBlink && i < currentHearts;

					if (i < currentHearts) {
						if  (blinkThisHeart) {
							const blinkValue = 128 + Math.round(Math.sin(Graphics.frameCount / blinkSpeed) * 64);
							this._heartSprites[i].setBlendColor([255 * (1 - blinkValue / 255), 0, 0, blinkValue]);
							this._heartSprites[i].opacity = 255;
						} else {
							this._heartSprites[i].setBlendColor([0, 0, 0, 0]);
							this._heartSprites[i].opacity = 255;
						}


					} else {

						if (this._previousHearts < currentHearts && i === this._previousHearts) {
							this._heartTintFrames[i] = 0;
						} else if (this._previousHearts > currentHearts && i === currentHearts) {
							this._heartTintFrames[i] = 0;
						} else if (justIncreased && i === currentHearts - 1) {
							this._heartTintFrames[i] = 0;
						} else {
							this._heartTintFrames[i] = this._heartTintFrames[i] + 1;
						}
						// Fade từ màu đen sang màu gốc trong 15 frame
						if (justIncreased && i === currentHearts - 1) {
							if (this._heartTintFrames[i] < 15) {
								this._heartSprites[i].setBlendColor([0, 255, 0, greenValue]);
								this._heartSprites[i].opacity = 255;
							} else {
								this._heartSprites[i].setBlendColor([0, 255, 0, 0]);
								this._heartSprites[i].opacity = 255;
							}
						} else if (this._heartTintFrames[i] < 14) {
							this._heartSprites[i].setBlendColor([255, 0, 0, 255 * (1 - this._heartTintFrames[i] / 15)]);
						} else {
							this._heartSprites[i].setBlendColor([0, 0, 0, 255 * ((this._heartTintFrames[i] - 7) / 10)]);
							this._heartSprites[i].opacity = 255;
						}
					}
				}
			}
			if (currentHearts === 0 && this._previousHearts !== 0 && this._previousHearts !== -1) {
				const commonEventId = parseInt(parameters["commonEventId"]);
				$gameTemp.reserveCommonEvent(commonEventId);
			}
			this._previousHearts = currentHearts;

		}
		setHeartTint(index, tint) {
			if (index < 0 || index >= this._maxHearts) {
				return;
			}
	
			if (tint === "black") {
				this._heartSprites[index].setColorTone([-255, -255, -255, 255]);
				this._heartStates[index] = 0;
			} else {
				this._heartSprites[index].setColorTone([0, 0, 0, 0]);
				this._heartStates[index] = 1;
			}
		}

		update() {
			super.update();
			this.updateHeartsDisplay();
			this._heartSprites.forEach((heartSprite) => {
				heartSprite.visible = heartVisible;
			});
		}

		updateMaxHearts(newMaxHearts) {
			this._maxHearts = newMaxHearts;
			while (this._heartSprites.length > newMaxHearts) {
				this.removeChild(this._heartSprites.pop());
			}
			while (this._heartSprites.length < newMaxHearts) {
				const i = this._heartSprites.length;
				const row = Math.floor(i / heartsPerRow);
				const col = i % heartsPerRow;
		
				const backgroundSprite = new Sprite();
				backgroundSprite.bitmap = new Bitmap(this._heartImage.width, this._heartImage.height);
				backgroundSprite.bitmap.fillRect(0, 0, this._heartImage.width, this._heartImage.height, "rgba(0, 0, 0, 0)");
				backgroundSprite.x = positionX + col * (backgroundSprite.width + heartSpacing);
				backgroundSprite.y = positionY + row * rowSpacing;
				this.addChild(backgroundSprite);
		
				const heartSprite = new Sprite();
				heartSprite.bitmap = this._heartImage;
				heartSprite.x = positionX + col * (heartSprite.width + heartSpacing);
				heartSprite.y = positionY + row * rowSpacing;
				this.addChild(heartSprite);
				this._heartSprites.push(heartSprite);
			}
		}
		

		setHeartVisibility(visible) {
			heartVisible = visible;
    for (let i = 0; i < this._heartSprites.length; i++) {
        if (visible) {
            this._heartSprites[i].visible = this._heartStates[i] === 1;
        } else {
            this._heartSprites[i].visible = false;
        }}
		}

		loadHeartImage() {
			this._heartImage = ImageManager.loadBitmap("img/", heartImagePath);
			this._heartImage.addLoadListener(() => {
				this.createHeartSprites();
			});
		}

		createHeartSprites() {
			const HEARTS_PER_ROW = heartsPerRow;
			const ROW_SPACING = rowSpacing;
			this._heartTintFrames = new Array(this._maxHearts).fill(0);
			this._heartStates = new Array(this._maxHearts).fill(1);

			for (let i = 0; i < this._maxHearts; i++) {
				const row = Math.floor(i / HEARTS_PER_ROW);
				const col = i % HEARTS_PER_ROW;

				const backgroundSprite = new Sprite();
				backgroundSprite.bitmap = new Bitmap(this._heartImage.width, this._heartImage.height);
				backgroundSprite.bitmap.fillRect(0, 0, this._heartImage.width, this._heartImage.height, "rgba(0, 0, 0, 0)");
				backgroundSprite.x = positionX + col * (backgroundSprite.width + heartSpacing);
				backgroundSprite.y = positionY + row * ROW_SPACING;
				this.addChild(backgroundSprite);

				const heartSprite = new Sprite();
				heartSprite.bitmap = this._heartImage;
				heartSprite.x = positionX + col * (heartSprite.width + heartSpacing);
				heartSprite.y = positionY + row * ROW_SPACING;
				heartSprite.visible = heartVisible && this._heartStates[i] === 1;
				this.addChild(heartSprite);
				this._heartSprites.push(heartSprite);
			}
		}
	}
	let heartDisplay = null;


	PluginManager.registerCommand("HeartDisplayPlugin", "setHeartVisibility", args => {
		const visible = JSON.parse(args.visible);
		if (heartDisplay) {
			heartDisplay.setHeartVisibility(visible);
		}
	});

	PluginManager.registerCommand("HeartDisplayPlugin", "increaseHeart", () => {
		$gameSystem._currentHearts = Math.min($gameSystem._currentHearts + 1, maxHearts);
		$gameVariables.setValue(currentHeartsVariable, $gameSystem._currentHearts);
	});

	PluginManager.registerCommand("HeartDisplayPlugin", "decreaseHeart", () => {
		$gameSystem._currentHearts = Math.max($gameSystem._currentHearts - 1, 0);
		$gameVariables.setValue(currentHeartsVariable, $gameSystem._currentHearts);
	});

	PluginManager.registerCommand("HeartDisplayPlugin", "setMaxHearts", args => {
		const newMaxHearts = parseInt(args.newMaxHearts);
	
		if (!isNaN(newMaxHearts)) {
			maxHearts = newMaxHearts;
			if (heartDisplay) {
				heartDisplay.updateMaxHearts(newMaxHearts);
			}
		} else {
			console.error(`Invalid maxHearts value: ${args.newMaxHearts}`);
		}
	});
	

	const _Game_System_onBeforeSave = Game_System.prototype.onBeforeSave;
	Game_System.prototype.onBeforeSave = function () {
		_Game_System_onBeforeSave.call(this);
		$gameVariables.setValue(currentHeartsVariable, this._currentHearts);
	};

})();