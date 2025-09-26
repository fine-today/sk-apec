"use strict";

$(function () {
  var $header = $("#header");
  var $window = $(window);

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
  $window.on("wheel scroll", function (e) {
    var $overview = $("section[data-slide='overview']");
    var figure = {
      scrollTop: $window.scrollTop(),
      position: [],
      pageHeight: 0,
      aniGap: 1500,
    };
    $("section.sec").each(function () {
      figure.position.push($(this).position().top);
    });

    // section animation
    $("section.sec").each(function (i, elem) {
      console.log(i);
      if ($window.scrollTop() > figure.position[i] - $window.height() * 0.3) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });
    var $banner = $('section.sec[data-slide="location"] .banner-box');
    console.log(
      $window.scrollTop(),
      $banner.offset().top,
      $window.height() * 0.3
    );
    if ($window.scrollTop() > $banner.offset().top - $window.height() * 0.8) {
      $banner.addClass("active");
    } else {
      $banner.removeClass("active");
    }
    figure.pageHeight =
      $overview.find(".page1").outerHeight() / 2 +
      $overview.find(".page2").outerHeight();

    $overview.outerHeight(figure.pageHeight + figure.aniGap);

    if ($window.scrollTop() >= figure.position[1] - 100) {
      $overview.addClass("page-ani1").removeClass("page-ani2 page-ani-scroll");
      if (
        $window.scrollTop() >
        figure.position[1] + $window.outerHeight() / 2
      ) {
        $overview
          .addClass("page-ani2")
          .removeClass("page-ani1 page-ani-scroll");
      }
      if (
        $window.scrollTop() >
        figure.position[1] + $window.outerHeight() / 2 + figure.aniGap
      ) {
        $overview
          .addClass("page-ani-scroll")
          .removeClass("page-ani1 page-ani2");
      }
      if ($window.scrollTop() >= figure.position[2]) {
        $overview.removeClass("page-ani1 page-ani2 page-ani-scroll");
      }
    } else if ($window.scrollTop() < figure.position[1] - 100) {
      $overview.removeClass("page-ani1 page-ani2 page-ani-scroll");
    }

    //bg 애니메이션
    const scrollY =
      ($(window).scrollTop() - figure.position[1]) /
      (figure.position[2] - figure.position[1]);
    $(".page2 .bg").css({
      transform: `translateY(-${scrollY * 400}vh)`,
    });

    // section ani
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
      thisModalId = $this.attr("data-modal"),
      $modalBox = $(".modal-box");
    $modalBox.addClass("active");
    // modalData
    if (modalData) {
      modalData.forEach(function (elem) {
        if (elem.id == thisModalId) {
          const { id, speaker, content } = elem;
          $modalBox.find(".title h2").text(speaker.name);
          $modalBox.find(".title .role").text(speaker.role);
          $modalBox.find(".title .company").text(speaker.company);
          $modalBox.find(".con-wrap .con").html(content);
          $modalBox
            .find(".photo > img")
            .attr({ src: speaker.image, alt: speaker.name });
        }
      });
    }
    $("html").addClass("modal-active");
  });

  $(".modal-box .close").on("click", function () {
    $(".modal-box").removeClass("active");
    $("html").removeClass("modal-active");
  });
});
