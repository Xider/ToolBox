/***
 * JQuery ManHua Dialog
 * version:manhuaDialog.1.0.js
***/
$(function() {
	$.fn.manhuaDialog = function(options) {
		var defaults = {
			Event : "click",								
			title : "title",								
			type : "text",									
			content : "content",							
			width : 500,									
			height : 400,									
			scrollTop : 200,								
			isAuto : false,									
			time : 2000,									
			isClose : false,  								
			timeOut : 2000									
			
		};
		var options = $.extend(defaults,options);
		
		$("body").prepend("<div id='floatBoxBg'></div><div id='floatBox' class='floatBox'><div class='title'><h4></h4><span id='closeDialog'>X</span></div><div class='content'></div></div>");
		var $this = $(this);								
		var $blank = $("#floatBoxBg");						
		var $title = $("#floatBox .title h4");				
		var $content = $("#floatBox .content");				
		var $dialog = $("#floatBox");						
		var $close = $("#closeDialog");						
		var stc,st;
		$close.live("click",function(){
			$blank.animate({opacity:"0"},"normal",function(){$(this).hide();});
  			$dialog.animate({top:($(document).scrollTop()-parseInt(options.height))+"px"},"normal",function(){$(this).hide();});
			if(st){
				clearTimeout(st);
			}
			if(stc){
				clearTimeout(stc);
			}
		});		
		$content.css("height",parseInt(options.height)-70);
		$this.live(options.Event,function(e){	
			$title.html(options.title);
			switch(options.type){
				case "url":									
					$content.ajaxStart(function(){
						$(this).html("loading...");
					});
					$.get(options.content,function(html){
						$content.html(html);						
					});
					break;
				case "text":								
					$content.html(options.content);
					break;
				case "id":									
					$content.html($("#"+options.content+"").html());
					break;
				case "iframe":								
					$content.html("<iframe src=\""+options.content+"\" width=\"100%\" height=\""+(parseInt(options.height)-70)+"px"+"\" scrolling=\"auto\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>");
					break;
				default:									
					$content.html(options.content);
					break;
			}
			
			$blank.show();
			$blank.animate({opacity:"0.5"},"normal");		
			$dialog.css({display:"block",left:(($(document).width())/2-(parseInt(options.width)/2))+"px",top:($(document).scrollTop()-parseInt(options.height))+"px",width:options.width,height:options.height});
			$dialog.animate({top:($(document).scrollTop()+options.scrollTop)+"px"},"normal");
			if (options.isClose){
				stc = setTimeout(function (){			
					$close.trigger("click");
					clearTimeout(stc);
				},options.timeOut);	
			}
			
		});	
		if (options.isAuto){
			st = setTimeout(function (){			
				$this.trigger(options.Event);
				clearTimeout(st);
			},options.time);	
		}
	}
});