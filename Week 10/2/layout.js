function getStyle(element) {
	if (!element.style) element.style = {};

	for (let prop in element.computedStyle) {
		var p = element.computedStyle.value;
		element.style[prop] = element.computedStyle[prop].value;

		if (element.style[prop].toString().match(/px$/)) {
			element.style[prop] = parseInt(element.style[prop]);
		}
		if (element.style[prop].toString().match(/^[0-9\.]$/)) {
			element.style[prop] = parseInt(element.style[prop]);
		}
	}
	return element.style;
}

function layout(element) {
	if (!element.computedStyle) return;

	var style = getStyle(element);

	if (style.display !== "flex")
		//ToyBrowser 只处理flex排版，忽略其他排版格式
		return;

	var items = element.children.filter((item) => item.type === "element");

	items
		.sort((a, b) => (a.order || 0) - (b.order || 0))

		[("width", "height")].forEach((size) => {
			if (style[size] === "" || style[size] === "auto") {
				style[size] = null;
			}
		});

	if (!style.flexDirection || style.flexDirection === "auto") style.flexDirection = "row";

	if (!style.alignItems || style.alignItems === "auto") style.alignItems = "stretch";

	if (!style.justifyContent || style.justifyContent === "auto") style.justifyContent = "flex-start";

	if (!style.flexWrap || style.flexWrap === "auto") {
		style.flexWrap = "nowrap";
	}

	if (!style.alignContent || style.alignContent === "auto") style.alignContent = "stretch";

	let mainSize, mainStart, mainEnd, mainSign, mainBase;
	crossSize, crossStart, crossEnd, crossSign, crossBase;

	if (style.flexDirection === "row") {
		mainSize = "width";
		mainStart = "left";
		mainEnd = "right";
		mainSign = +1;
		mainBase = 0;

		crossSize = "height";
		crossStart = "top";
		crossEnd = "bottom";
	}

	if (style.flexDirection === "row-reverse") {
		mainSize = "width";
		mainStart = "right";
		mainEnd = "left";
		mainSign = -1;
		mainBase = style.width;

		crossSize = "height";
		crossStart = "top";
		crossEnd = "bottom";
	}

	if (style.flexDirection === "column") {
		mainSize = "height";
		mainStart = "top";
		mainEnd = "bottom";
		mainSign = +1;
		mainBase = 0;

		crossSize = "width";
		crossStart = "left";
		crossEnd = "right";
	}

	if (style.flexWrap === "wrap-reverse") {
		let tmp = crossStart;
		crossStart = crossEnd;
		crossEnd = tmp;
		crossSign = -1;
	} else {
		crossBase = 0;
		crossSign = 1;
	}

	/**
	 *
	 *** 把元素收进行
	 *
	 **/
	let isAutoMainSize = false;
	if (!style[mainSize]) {
		style[mainSize] = 0;
		for (let i = 0; i < items.length; i++) {
			let itemStyle = item[i].style;
			if (itemStyle[mainSize] != null && itemStyle[mainSize] != "")
				style[mainSize] = style[mainSize] + itemStyle[mainSize];
		}
		isAutoMainSize = true;
	}

	let flexLine = [];
	let flexLines = [flexLine];
	var mainSpace = style[mainSize];
	var crossSpace = 0;

	for (let i = 0; i < items.length; i++) {
		let item = items[i];
		var itemStyle = getStyle(item);
		if (itemStyle[mainSize] == null) itemStyle[mainSize] = 0;

		if (itemStyle.flex) {
			flexLine.push(item);
		} else if (style.flexWrap === "nowrap" && isAutoMainSize) {
			mainSpace -= itemStyle[mainSize];
			if (item[crossSize] !== null && item[crossSize] !== void 0)
				crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
			flexLine.push(item);
		} else {
			if (itemStyle[mainSize] > item[mainSize]) itemStyle[mainSize] = item[mainSize];
			if (mainSpace < item[mainSize]) {
				flexLine.mainSpace = mainSpace;
				flexLine.crossSpace = crossSpace;
				flexLine = [item];
				flexLines.push(flexLine);
				mainSpace = style[mainSize];
				crossSpace = 0;
			} else {
				flexLine.push(item);
			}
			if (item[crossSize] !== null && item[crossSize] !== void 0)
				crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
			mainSpace -= itemStyle[mainSize];
		}
	}
	flexLine.mainSpace = mainSpace;
	console.log(items);
}

module.exports = layout;
