$(function() {

  //header to full height:
  function heightDetect() {
    $(".s-header").css("height", $(window).height());
  };

  heightDetect()
  $(window).resize(function() {
    heightDetect()
  });

  // Preloader:
  $(window).load(function() {
    $(".loaderInner").fadeOut();
    $(".loader").delay(400).fadeOut("slow");
  });

  //Link to TOP:
  $("body").append('<div class="top"><i class="fa fa-arrow-up" aria-hidden="true"></i>');

  $(window).scroll(function() {
    if ($(this).scrollTop() > $(this).height()) {
      $(".top").addClass("active");
    } else {
      $(".top").removeClass("active");
    }
  });

  $("body").on("click", ".top", function() {
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
  });

  //Animation initilal:

new WOW().init();

  //Slide menu:
      $(".mouse").click(function() {
          $("html, body").animate({
              scrollTop: $("header").height()
          }, "slow");
          return false;
      });
      $("#home-mnu").click(function() {
        $("html, body").animate({
          scrollTop: 0
        }, "slow");
          return false;
      });
      $("#about-mnu").click(function() {
          $("html, body").animate({
              scrollTop: $("#about").offset().top
          }, "slow");
          return false;
      });
      $("#services-mnu").click(function() {
          $("html, body").animate({
              scrollTop: $("#services").offset().top
          }, "slow");
          return false;
      });
      $("#works-mnu").click(function() {
          $("html, body").animate({
              scrollTop: $("#works").offset().top
          }, "slow");
          return false;
      });
      $("#portfolio-mnu").click(function() {
          $("html, body").animate({
              scrollTop: $("#portfolio").offset().top
          }, "slow");
          return false;
      });
      $("#contacts-mnu").click(function() {
          $("html, body").animate({
              scrollTop: $("#contacts").offset().top
          }, "slow");
          return false;
      });

  //Pop-up:
  $(".toform-btn").magnificPopup({
      type: 'inline',

      fixedContentPos: false,
      fixedBgPos: true,

      overflowY: 'auto',

      closeBtnInside: true,
      preloader: false,

      midClick: true,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom'
  });

  //contact form (not done):
$(".cont-btn").click(function() {
    $(".success").addClass("visible");
    setTimeout(function() {
        $(".success").fadeOut('slow');
    }, 2000);
});


  //E-mail Ajax Send
  $(".callback").submit(function() {
      var th = $(this);
      $.ajax({
          type: "POST",
          url: "mail.php",
          data: th.serialize()
      }).done(function() {
          $(".success").addClass("visible");
          setTimeout(function() {
              th.trigger("reset");
              $(".success").removeClass("visible");
              $.magnificPopup.close();
          }, 2000);
      });
      return false;
  });

  //No drag
  $("img, a").on("dragstart", function(event) {
      event.preventDefault();
  });

$('.po-items').owlCarousel({
  items: 3
});


});
