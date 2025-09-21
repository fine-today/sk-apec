"use strict";

$(function () {
  var $header = $("#header");

  var $lang = $header.find(".language"),
    $langBtn = $lang.find(".lang-btn"),
    $langList = $lang.find(".lang-list"),
    $langItem = $langList.find(".lang-item");

  $langBtn.on("click", function () {
    $lang.toggleClass("active");
    if ($lang.hasClass("active")) {
      $langList.slideDown(100);
    } else {
      $langList.slideUp(100);
    }
  });
  $langItem.on("click", function () {
    var $this = $(this),
      thisText = $this.find("span").text();
    $lang.removeClass("active");
    $langBtn.text(thisText);
    if ($lang.hasClass("active")) {
      $langList.slideDown(100);
    } else {
      $langList.slideUp(100);
    }
  });
  $(window).on("load", function () {
    setTimeout(() => {
      $('.swiper-slide[data-slide="visual"]').addClass("sec1");
    }, 1000);
    setTimeout(() => {
      $('.swiper-slide[data-slide="visual"]').addClass("sec2");
    }, 2000);
    setTimeout(() => {
      $('.swiper-slide[data-slide="visual"]').addClass("sec5");
    }, 4000);
    setTimeout(() => {
      $('.swiper-slide[data-slide="visual"]').addClass("sec10");
    }, 5000);
    //$('.swiper-slide[data-slide="1"]').addClass("active");
  });
  $(window).on("scroll", function (e) {
    console.log(e);
  });

  $('[data-slide="overview"] .page2 .scroll').on("scroll", function () {
    const scrollY = $(this).scrollTop() / 1080;
    $(".page2 .bg").css({
      transform: `translateY(-${scrollY * 3800}px)`,
    });
  });
});

const menuName = [
  { id: 0, name: "visual", text: "" },
  { id: 1, name: "overview", text: "OVERVIEW" },
  { id: 2, name: "program", text: "PROGRAM" },
  { id: 3, name: "greeting", text: "" },
  { id: 4, name: "keynote", text: "KEYNOTE" },
  { id: 5, name: "location", text: "LOCATION" },
];

var swiper = new Swiper(".visual-slide", {
  direction: "vertical",
  initialSlide: 0,
  touchReleaseOnEdges: true,
  mousewheel: true,
  pagination: {
    el: ".gnb .menu-list",
    clickable: true,
    renderBullet: function (index, classname) {
      var el = `<div class="menu-item ${classname} ${menuName[index].name}">
              <button type="button" class="menu-anchor">
                <span>${menuName[index].text}</span>
              </button>
            </div>`;
      return el;
    },
  },
});

//
var swiper = new Swiper(".fade-slide", {
  effect: "fade",
  slidesPerView: 1,
  nested: true,
  mousewheel: {
    releaseOnEdges: true,
  },
});

//
var swiper = new Swiper(".overview-slide", {
  slidesPerView: "auto",
  spaceBetween: 24,
  nested: true,
  mousewheel: {
    releaseOnEdges: true,
  },
});

//
var swiper = new Swiper(".speakers-slide", {
  slidesPerView: "auto",
  spaceBetween: 30,
  nested: true,
  navigation: {
    nextEl: ".slide-next",
    prevEl: ".slide-prev",
  },
});

document.querySelectorAll(".scroll").forEach((el) => {
  el.addEventListener("wheel", (e) => {
    const atTop = el.scrollTop === 0;
    const atBottom = el.scrollHeight - el.scrollTop === el.clientHeight;

    if ((!atTop && e.deltaY < 0) || (!atBottom && e.deltaY > 0)) {
      e.stopPropagation();
    }
  });
});
