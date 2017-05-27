var MIN_PRODUCT_HEIGHT={grid:250,carousel:335};
if(!window.history.pushState&&window.location.hash!=""){window.location=window.location.hash.substring(1)
}utag_data.isearch_allfilter="<>";
utag_data.display_grid="grid";
utag_data.isearch_result="";
function specificLoadingEvent(){heightOfItems();
$("#filters .column").first().addClass("first");
registerEvent("endImagesLoad",handleCategoryPageBehaviour);
registerEvent("resizeEvent",catPageResize);
$(window).scroll(function(){stickyFilters()
});
if(is_touch_device()){$(window).on("touchmove",stickyFilters);
$(".product-item .overlay").removeClass("overlay")
}filtersEventAndDesign();
selectedFilters();
setStickyVariables();
if((isTablet()&&$.jStorage.get("historyDisplay")!="grid")||$.jStorage.get("historyDisplay")=="carousel"){displayCarousel();
$("#catSelectGrid").removeClass("grid-active");
$("#catSelectCarousel").addClass("carousel-active");
setStickyVariables();
stickyScroll=0;
registerEvent("endImagesLoad",function(){setTimeout(carousel.adaptImageHeight.bind(carousel),100)
});
loadingImgs("","no-height");
fireEvent("carouselDisplay")
}else{loadingImgs();
fireEvent("gridDisplay")
}utag_data.isearch_result=$("#categoryProductsNumber").attr("data-totalresult");
arrangePushes();
bindVideoPushes();
if(!RESPONSIVE_MANAGER.isAllSmallMode()){minimizeProductsName()
}$.jStorage.set("lastCategoryPageVisited",window.location.href);
setTimeout(handleBackFromProductSheet,500)
}function getHeightOfProductCase(){var a;
if($("#products-grid").hasClass("carousel")){a=$(".product-item .displayed").parent().height();
a=(a<MIN_PRODUCT_HEIGHT.carousel)?MIN_PRODUCT_HEIGHT.carousel:a
}else{a=$(".product-item").first().height();
a=(a<MIN_PRODUCT_HEIGHT.grid)?MIN_PRODUCT_HEIGHT.grid:a
}return a
}function getWidthOfProductCase(){var a;
if($("#products-grid").hasClass("carousel")){a=Math.max.apply(null,$(".product-item").map(function(){return $(this).width()
}).get())
}else{a=$(".product-item").first().width()
}return a
}function getCarouselCurrentPage(){return $("#moreProducts").attr("data-detail")
}function getCarouselTotalResult(){return $("#categoryProductsNumber").attr("data-totalResult")
}function getLiHeightForCarousel(){var a=getHeightOfProductCase();
return(a<MIN_PRODUCT_HEIGHT.carousel)?MIN_PRODUCT_HEIGHT.carousel:a
}function setStickyVariables(){if($(".filtersHeader").length>0){stickyFiltersTop=$("#products-grid").offset().top-$(".filtersHeader").height()-$("#header").height()
}stickyScroll=$(".editorial").height();
if($("#catSelectCarousel").hasClass("carousel-active")){stickyScroll=0
}}function minimizeProductsName(){$(".productName.toMinimize").each(function(c){var b=$(this).html();
var a={};
if(b.length>20){a=splitToSpace(b,20);
b=a[0]+"<br/>";
if(a[1].length>18){a=splitToSpace(a[1],18);
b+=a[0]+"..."
}else{b+=a[1]
}$(this).html(b).removeClass("toMinimize")
}})
}function splitToSpace(c,e){var b=c.substr(e);
for(var d=0;
d<b.length;
d++){if(b[d]===" "){break
}}var a=[c.substr(0,e+d),c.substr(e+d+1)];
return a
}function getCarouselHeight(){var a=$(".product-item").get(0)?$(".product-item").outerHeight():0;
return $(".content").height()-a
}function selectMode(b){var a=$(b.currentTarget).attr("ref");
if(a=="grid"){displayGrid();
$("#catSelectGrid").addClass("grid-active");
$("#catSelectCarousel").removeClass("carousel-active");
setStickyVariables()
}else{if(a=="carousel"){displayCarousel();
$("#catSelectGrid").removeClass("grid-active");
$("#catSelectCarousel").addClass("carousel-active");
setStickyVariables();
stickyScroll=0
}}}function catPageResize(){$("#products-grid").removeAttr("style");
if(RESPONSIVE_MANAGER.isAllSmallMode()){$(".filtersHeader").addClass("sticky");
$(".column.facetBloc").removeAttr("style")
}else{$(".filtersHeader").removeClass("sticky");
$(".products-grid, .moreProducts, .editorial, #resetAllFilters").show();
if($("#filters").css("display")=="block"){$(".selected-filters").hide()
}}if(RESPONSIVE_MANAGER.isAllSmallMode()&&$("#products-grid").hasClass("carousel")){displayGrid();
$("#catSelectGrid").addClass("grid-active");
$("#catSelectCarousel").removeClass("carousel-active");
$(".filtersHeader").addClass("sticky");
setStickyVariables()
}if(RESPONSIVE_MANAGER.isAllSmallMode()&&$(".content > div").first().hasClass("editorial")){showDownDiv($(".editorial"));
stickyScroll=0
}else{if(!RESPONSIVE_MANAGER.isAllSmallMode()&&!$("#products-grid").hasClass("carousel")){showUpDiv($(".editorial"));
heightOfItems();
setStickyVariables()
}}if($("#products-grid").hasClass("carousel")){$(".moreProducts").hide();
loadingImgs("","no-height");
heightOfItems();
carousel.slidesVisibleCount=getSlidesVisibleCount();
carousel.liWidth=$("#products-grid").width()/carousel.slidesVisibleCount;
carousel.refreshCarousel();
carousel.navigateToGlobalSlide(carousel.currentGlobalSlide);
arrangePushes();
return true
}arrangePushes();
if(RESPONSIVE_MANAGER.isAllSmallMode()&&$("#buttonFilters").attr("ref")=="hide"){$(".products-grid, .moreProducts, .editorial").hide();
$("#resetAllFilters").show()
}if(FILTER_OPEN){multipleColumnsFilter()
}if(!RESPONSIVE_MANAGER.isAllSmallMode()){loadingImgs();
heightOfItems();
setStickyVariables();
stickyFilters()
}}function handleCategoryPageBehaviour(a){$(".product-item img.postLoaderResponsive").removeClass("postLoaderResponsive");
if($("#products-grid").hasClass("carousel")){heightOfItems();
showDownDiv($(".editorial"));
return false
}if(RESPONSIVE_MANAGER.isAllSmallMode()){showDownDiv($(".editorial"));
return false
}if(RESPONSIVE_MANAGER.isAllSmallMode()){showDownDiv($(".editorial"));
stickyScroll=0
}else{showUpDiv($(".editorial"));
heightOfItems()
}centerDiv();
setStickyVariables()
}function arrangePushes(){var b=$(".editorial .push");
b.height("");
var a=$(".editorial .push_page:not(.service)");
if(b.length>1&&a.length>0&&!RESPONSIVE_MANAGER.isAllSmallMode()){b.height($(".editorial").height())
}else{b.removeAttr("style")
}var d=$(".editorial .push_video");
if(RESPONSIVE_MANAGER.isAllSmallMode()){d.height("")
}if(d.length>0){d.find(".videoDisplay > div").height("")
}$(".editorial").removeAttr("style");
if($("#products-grid").hasClass("carousel")){var c=$("#footer").position().top-$(".editorial").position().top-$(".editorial").height()+50;
if(c>0){$(".editorial").css({"margin-top":c})
}}setStickyVariables()
}function heightOfItems(){$(".product-item").height("");
if(RESPONSIVE_MANAGER.isAllSmallMode()){$("#products-grid .push, .editorial").height("");
return
}var c=$("#products-grid .push > img").height();
if(c>MIN_PRODUCT_HEIGHT.grid){$(".product-item").height(c);
$("#products-grid .push").height(c)
}else{var b=getHeightOfProductCase();
var e=getWidthOfProductCase();
b=Math.max(b,e);
$(".product-item").height(b);
$("#products-grid .push").height(b)
}var d=$(".product-item").height();
if($("#products-grid").hasClass("carousel")){carousel.liHeight=d;
carousel.refreshCarousel();
return
}var a=$("#products-grid .service img.postLoaderResponsive").height();
var f=0;
if(d>a){f=(d-a)/2;
$("#products-grid .service img.postLoaderResponsive").css("margin-top",f)
}$("#products-grid").find(".product-img:not(.halfGridProduct .product-img)").css({"max-height":d});
$("#products-grid").find(".halfGridProduct .product-img").css({"max-height":(d*85/100)})
}function showDownDiv(a){$(".content").append(a.detach())
}function showUpDiv(a){$(".content").prepend(a.detach())
}function bindVideoPushes(){$(".push_video").on("click",function(){loadPlayer($(this).find(".videoDisplay"));
$(this).find("img").css("display","none");
$(this).unbind("click")
})
}function handleVideoDisplay(){if(RESPONSIVE_MANAGER.isAllSmallMode()){return
}var a=$(".editorial .push_video").first().height();
var b=$(".editorial").height();
if(a<b&&a>0){var c=(b-a)/2;
$(".editorial .push_video").first().css("margin-top",c)
}}function popinProductDetail(b){b.preventDefault();
var a=$(b.currentTarget).attr("data-sku")
}function displayGrid(){if($("#products-grid ul li").length>0){$("#products-grid").removeClass("carousel");
$("#products-grid .product-img, #products-grid .imageWrapper, .product-item .description").removeAttr("style");
var b=$(".editorial").detach();
$(".filtersHeader").before(b);
var d=$("#products-grid .product-item").detach();
b=$("#products-grid .push").detach();
var c=0;
d.removeClass("halfGridProduct");
d.each(function(e){var f=this;
$("#products-grid").append(f.outerHTML);
var g=maxPageSize-gridEmptyIndexes.length;
if(!Array.prototype.indexOf){arrayIndexOfIE8()
}if(b[c]!==undefined&&gridEmptyIndexes.indexOf(e%g)!==-1){$("#products-grid").append(b[c]);
c++
}});
$("#products-grid .push").show();
var a=$(".moreProducts").show().detach();
$("#products-grid").append(a);
$("#ulCarouselWrapper").remove();
$.jStorage.set("historyDisplay","grid");
catPageResize()
}else{return false
}fireEvent("gridDisplay2")
}function moreProducts(h){h.preventDefault();
var a=$(this).attr("data-activated");
if(a){$(this).attr("data-activated","");
var g=$("#findProducts");
var c="productFinderResults.jsp";
var b=$("a.moreProducts").attr("data-next");
var d=$("div.products-grid").attr("ref");
var f={internalname:d};
$("#productFinderPageNumber").val(b);
$('a[rel="prev"]').remove();
$(".more").remove();
$("#moreProducts").addClass("more-loader");
postAjax(g.serialize(),false,c,moreProductsSuccess,null,f)
}}function moreProductsSuccess(b){$(".hiddenLink").remove();
$("#moreProducts").after(b);
var a=$(".moreProducts:first").attr("data-next");
$(".moreProducts:first").slideToggle(800,function(){$(".moreProducts:first").remove();
if($('a[rel="next"]').length>0){var c=parseInt($("a.moreProducts").attr("data-detail"),10);
$(".moreProducts").on("click",moreProducts)
}});
loadingImgs();
buildNotCrawlableContent();
arrangePushes();
heightOfItems();
minimizeProductsName()
}function handleBackFromProductSheet(){var b=$.jStorage.get(localStorageSkuToScroll);
if(SHOULD_SCROLL_TO_SKU&&$("#sku_"+b).length>0){if($.jStorage.get("historyDisplay")=="carousel"){var a=$("#sku_"+b).parent().attr("data-productindex");
carousel.navigateToGlobalSlide(a)
}else{$("body, html").animate({scrollTop:$("#sku_"+b).offset().top})
}}};