"use strict";

$(function () {
  var $header = $("#header");
  var $window = $(window);
  var $body = $("body");

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
  /*
  var sectionPosition = [];
  $window.on("scroll", function (e) {
    var figure = {
      visualHalf: 0,
      overviewHalf: 0,
      position: [],
    };
    $("section.sec").each(function () {
      figure.position.push($(this).position().top);
    });
    figure.visualHalf = $window.height() / 2;
    figure.overviewHalf = figure.position[2] - $window.height() / 2;
    if ($window.scrollTop() > figure.overviewHalf) {
      // sec2~3
      var opacityFigure =
        ($window.scrollTop() - figure.overviewHalf) /
        (figure.position[2] - figure.overviewHalf);
      var opacity = function () {
        if (opacityFigure < 0.1) {
          return 0;
        } else if (opacityFigure >= 1) {
          return 1;
        } else {
          return opacityFigure;
        }
      };
      $body.find(".body-bg").css({ opacity: opacity() });
    } else if ($window.scrollTop() > figure.visualHalf) {
      // sec1~2
      var opacityFigure =
        ($window.scrollTop() - figure.visualHalf) /
        (figure.position[1] - figure.visualHalf);
      var opacity = function () {
        if (opacityFigure < 0.1) {
          return 1;
        } else if (opacityFigure >= 1) {
          return 0;
        } else {
          return 1 - opacityFigure;
        }
      };
      $body.find(".body-bg").css({ opacity: opacity() });
    } else if ($window.scrollTop() <= figure.visualHalf) {
      $body.find(".body-bg").css({ opacity: 1 });
    }
  });*/

  $window.on("scroll", function (e) {
    var $overview = $("section[data-slide=overview]");
    var figure = {
      scrollTop: $window.scrollTop(),
      position: [],
      pageHeight: 0,
      aniGap: 2000,
    };

    $("section.sec").each(function () {
      figure.position.push($(this).position().top);
    });

    $overview.find(".page").each(function () {
      figure.pageHeight = figure.pageHeight + $(this).outerHeight();
    });
    $overview.height(figure.pageHeight + figure.aniGap - 100);

    if (figure.scrollTop >= figure.position[1]) {
      $overview.addClass("page-ani1").removeClass("page-ani2 page-ani-scroll");
      if (figure.scrollTop > figure.position[1] + $window.outerHeight()) {
        $overview
          .addClass("page-ani2")
          .removeClass("page-ani1 page-ani-scroll");
      }
      if (
        figure.scrollTop >
        figure.position[1] + $window.outerHeight() + figure.aniGap
      ) {
        $overview
          .addClass("page-ani-scroll")
          .removeClass("page-ani1 page-ani2");
      }
      if (figure.scrollTop >= figure.position[2]) {
        $overview.removeClass("page-ani1 page-ani2 page-ani-scroll");
      }
    } else if (figure.scrollTop < figure.position[1]) {
      $overview.removeClass("page-ani1 page-ani2 page-ani-scroll");
    }
  });

  // scroll~ 뿅~
  $('[data-slide="overview"] .page2').on("scroll", function () {
    const scrollY = $(this).scrollTop() / 1080;
    $(".page2 .bg").css({
      transform: `translateY(-${scrollY * 3800}px)`,
    });
  });
});

/* gnb-anchor */
var $htmlBody = $("html, body"),
  $menuBtn = $(".menu-item .menu-anchor");
var sectionPosition = [];

$menuBtn.click(function (event) {
  $("section.sec").each(function () {
    sectionPosition.push($(this).position().top);
  });
  var $this = $(this),
    thisAnchor = $this.attr("data-anchor");
  var section = {
    overview: sectionPosition[1],
    program: sectionPosition[2],
    keynote: sectionPosition[4],
    location: sectionPosition[5],
  };
  console.log(thisAnchor);
  $htmlBody.animate(
    {
      scrollTop: section[thisAnchor],
    },
    {
      duration: 250,
    }
  );
  event.preventDefault();
});

/*
const menuName = [
  { id: 0, name: "visual", text: "" },
  { id: 1, name: "overview", text: "OVERVIEW" },
  { id: 2, name: "program", text: "PROGRAM" },
  { id: 3, name: "greeting", text: "" },
  { id: 4, name: "keynote", text: "KEYNOTE" },
  { id: 5, name: "location", text: "LOCATION" },
];
*/

/*
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
});*/

/*
var swiper = new Swiper(".fade-slide", {
  effect: "fade",
  slidesPerView: 1,
  nested: true,
  mousewheel: {
    releaseOnEdges: true,
  },
});*/

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

$(".speakers-slide .slide-wrap").on("click", function () {
  var $this = $(this),
    thisModalData = $this.attr("data-modal");
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
