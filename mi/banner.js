
(function(){
	var a = document.getElementsByTagName("a");
	var len = a.length;
	for(var i = 0; i < len; i++){
		a[i].href = "javascript:;";
	}
})();

var width = 1226;

(function(){

	var banner = document.getElementsByClassName("banner")[0];
	var len = banner.getElementsByTagName("img").length;

	var prev = document.getElementsByClassName("prev")[0];
	var next = document.getElementsByClassName("next")[0];

	var index = 1;

	var counters = document.getElementsByClassName("banner-counter")[0].getElementsByTagName("span");
	function count(){
		for(var i = 0; i < len; i++){
			if(counters[i].className === "active"){
				counters[i].className = "";
				break;
			}
		}
		counters[index-1].className = "active";
	}

	banner.style.left = 0;

	var animated = false;
	function animate(ele, offset){
		animated = true;
		var time = 300;
		var interval = 10;
		var goal = parseInt(ele.style.left) + offset;
		var speed = Math.round(offset / (time / interval));
		var timer = setInterval(function(){
			if((speed < 0 && parseInt(ele.style.left) > goal) || (speed > 0 && parseInt(ele.style.left) < goal)){
				ele.style.left = parseInt(ele.style.left) + speed + "px";
			}else{
				clearInterval(timer);
				ele.style.left = goal + "px";
				animated = false;
			}
		}, interval);
	}

	next.onclick = function(){
		if(animated) return;
		if(index === len){
			animate(banner, width * (len - 1));
			index = 1;
		}else{
			animate(banner, -width);
			index++;
		}
		count();
	}

	prev.onclick = function(){
		if(animated) return;
		if(index === 1){
			animate(banner, - width * (len - 1));
			index = len;
		}else{
			animate(banner, width);
			index--;
		}
		count();
	}

	for(var i = 0; i < len; i++){
		counters[i].setAttribute("data-index", i + 1)
	}
	for(i = 0; i < len; i++){
		counters[i].onclick = function(){
			if(this.className === "active") return;
			var myIndex = parseInt(this.getAttribute("data-index"));
			if(myIndex === index) return;
			animate(banner, (- width * (myIndex - index)));
			index = myIndex;
			count();
		}
	}

	var timer;
	function play(){
		if(animated) return;
		timer = setInterval(function(){
			next.onclick();
		}, 5000)
	}
	play();
	function stop(){
		clearInterval(timer);
	}

	var container = document.getElementsByClassName("banner-container")[0];
	container.onmouseover = function(){
		stop();
	}
	container.onmouseout = function(){
		play();
	}

})();

(function(){

	var star = document.getElementsByClassName("star-content")[0];
	var starMore = document.getElementsByClassName("star-more")[0];
	var prev = starMore.getElementsByTagName("a")[0];
	var next = starMore.getElementsByTagName("a")[1];

	star.style.left = 0;

	var animated = false;
	function animate(ele, offset){
		animated = true;
		var time = 300;
		var interval = 10;
		var goal = parseInt(ele.style.left) + offset;
		var speed = Math.round(offset / (time / interval));
		var timer = setInterval(function(){
			if((speed < 0 && parseInt(ele.style.left) > goal) || (speed > 0 && parseInt(ele.style.left) < goal)){
				ele.style.left = parseInt(ele.style.left) + speed + "px";
			}else{
				clearInterval(timer);
				ele.style.left = goal + "px";
				animated = false;
			}
		}, interval);
	}

	function toNext(){
		if(animated) return;
		animate(star, -width);
		next.onclick = null;
		next.className = "disabled";
		prev.onclick = toPrev;
		prev.className = "active";
	}

	function toPrev(){
		if(animated) return;
		animate(star, width);
		prev.onclick = null;
		prev.className = "disabled";
		next.onclick = toNext;
		next.className = "active";
	}

	next.onclick = toNext;

	var timer;
	function play(){
		if(animated) return;
		timer = setInterval(function(){
			if(next.onclick){
				next.onclick();
			}else{
				prev.onclick();
			}
		}, 5000)
	}
	play();
	function stop(){
		clearInterval(timer);
	}

	var container = document.getElementsByClassName("star-container")[0];
	container.onmouseover = function(){
		stop();
	}
	container.onmouseout = function(){
		play();
	}
})();

(function(){
	var nav = document.getElementsByClassName("list-nav");
	var len = nav.length;
	for(var i = 0; i < len; i++){
		(function(i){
			var li = nav[i].getElementsByTagName("li");
			var parent = document.getElementsByClassName("list-content");
			var page = parent[i].getElementsByClassName("list-right");
			var len = li.length;
			for(var j = 0; j < len; j++){
				(function(j){
					li[j].onmouseover = function(){
						for(var k = 0; k < len; k++){
							page[k].style.display = "none";
							li[k].className = "";
						}
						li[j].className = "active";
						page[j].style.display = "block";
					}
				})(j);
			}
		})(i);
	}
})();

(function(){

	var recommand = document.getElementsByClassName("recommand-content")[0];

	var btn = document.getElementsByClassName("recommand-more")[0].getElementsByTagName("a");
	var prev = btn[0];
	var next = btn[1];

	recommand.style.left = 0;

	var index = 1;
	var animated = false;
	function animate(ele, offset){
		animated = true;
		var time = 300;
		var interval = 10;
		var goal = parseInt(ele.style.left) + offset;
		var speed = Math.round(offset / (time / interval));
		var timer = setInterval(function(){
			if((speed < 0 && parseInt(ele.style.left) > goal) || (speed > 0 && parseInt(ele.style.left) < goal)){
				ele.style.left = parseInt(ele.style.left) + speed + "px";
			}else{
				clearInterval(timer);
				ele.style.left = goal + "px";
				animated = false;
			}
		}, interval);
	}

	function toNext(){
		if(animated) return;
		if(index === 3){
			next.className = "disabled";
		}else{
			prev.className = "active";
		}
		if(index === 4) return;
		animate(recommand, -width);
		index++;
	}

	function toPrev(){
		if(animated) return;
		if(index === 2){
			prev.className = "disabled";
		}else{
			next.className = "active";
		}
		if(index === 1) return;
		animate(recommand, width);
		index--;
	}

	next.onclick = toNext;
	prev.onclick = toPrev;

	var container = document.getElementsByClassName("recommand-container")[0];
	var timer;
	var dir = "ltr";
	function play(){
		if(animated) return;
		timer = setInterval(function(){
			if(dir === "ltr"){
				toNext();
				if(index === 4){
					dir = "rtl";
				}
			}
			if(dir === "rtl"){
				toPrev();
				if(index === 1){
					dir = "ltr";
				}
			}
		}, 5000)
	}
	play();
	function stop(){
		clearInterval(timer);
	}
	container.onmouseout = play;
	container.onmouseover = stop;

})();

(function(){

	var boxes = document.getElementsByClassName("box-content");
	var num = boxes.length;

	var width = 296;
	var animated = false;

	for(var i = 0; i < num; i++){
		(function(i){
			var box = boxes[i];

			box.style.left = 0;

			var counters = box.parentNode.getElementsByTagName("span");
			var len = counters.length;
			var prev = box.parentNode.getElementsByClassName("prev")[0];
			var next = box.parentNode.getElementsByClassName("next")[0];
			var index = 1;

			next.onclick = function(){
				if(animated) return;
				if(index === len) return;
				if(index === (len - 1)){
					next.className = "next disabled";
				}else{
					prev.className = "prev";
					next.className = "next";
				}
				animate(box, -width);
				index++;
				count(counters, index, len);
			}

			prev.onclick = function(){
				if(animated) return;
				if(index === 1) return;
				if(index === 2){
					prev.className = "prev disabled";
				}else{
					prev.className = "prev";
					next.className = "next";
				}
				animate(box, width);
				index--;
				count(counters, index, len);
			}

			for(var j = 0; j < len; j++){
				counters[j].setAttribute("data-index", j + 1);
			}

			for(var k = 0; k < len; k++){
				(function(k){
					counters[k].onclick = function(){
						if(animated) return;
						var myIndex = parseInt(this.getAttribute("data-index"));
						if(myIndex === index) return;
						animate(box, - (myIndex - index) * width);
						index = myIndex;
						count(counters, index, len);
					}
				})(k);
			}

		})(i);
	}

	function animate(ele, offset){
		animated = true;
		var time = 300;
		var interval = 10;
		var goal = parseInt(ele.style.left) + offset;
		var speed = Math.round(offset / (time / interval));
		var timer = setInterval(function(){
			if((speed < 0 && parseInt(ele.style.left) > goal) || (speed > 0 && parseInt(ele.style.left) < goal)){
				ele.style.left = parseInt(ele.style.left) + speed + "px";
			}else{
				clearInterval(timer);
				ele.style.left = goal + "px";
				animated = false;
			}
		}, interval);
	}

	function count(ele, index, length){
		for(var i = 0; i < length; i++){
			if(ele[i].className === "active"){
				ele[i].className = "";
				break;
			}
		}
		ele[index - 1].className = "active";
	}

})();