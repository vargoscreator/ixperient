document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.aigenerator__content').forEach((container) => {
      const slider = container.querySelector('.aigenerator__slider');
      const nextButton = container.querySelector('.aigenerator__slider-next');

      new Swiper(slider, {
          loop: true,
          spaceBetween: 10,
          slidesPerView: 2,
          slidesPerGroup: 2,
          navigation: {
              nextEl: nextButton,
          },
          breakpoints: {
              340: {
                  loop: true,
                  slidesPerView: 2.23,
                  slidesPerGroup: 2,
              },
              768: {
                  loop: false,
                  slidesPerView: 3,
                  slidesPerGroup: 3,
              },
              1000: {
                  loop: false,
                  slidesPerView: 4,
                  slidesPerGroup: 4,
              },
          },
      });
  });

});
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio >= 0.8) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.8
});
const capsule = document.querySelector('.autoposting__capsule');
if (capsule) {
  observer.observe(capsule);
}

gsap.registerPlugin(ScrollTrigger);

    const image = document.querySelector(".imageScroll__image");
    const wrapper = document.querySelector(".imageScroll");

    gsap.to(image, {
        x: () => {
            const scrollWidth = wrapper.offsetWidth;
            const imageWidth = image.offsetWidth;
            return scrollWidth - imageWidth;
        },
        ease: "none",
        scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true, 
        }
    });
    const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');

burger.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove('active');
  }
});

gsap.registerPlugin(ScrollTrigger);

const getEndValue = () => {
  const width = window.innerWidth;
    if (width < 364) return "top-=80 top";
  if (width < 480) return "top-=90 top";
  if (width < 768) return "top-=150 top";
  if (width < 1280) return "top-=110 top";
  return "top-=60 top";
};

gsap.to(".autoposting__capsule-image", {
  scrollTrigger: {
    trigger: ".autoposting__capsule-image",
    start: () => `top-=${window.innerHeight * 0.2} top`,
    endTrigger: ".autoposting__middle-image",
    end: getEndValue,
    scrub: true,
    pin: true,
    pinSpacing: false,
  }
});


// Резкое изменение картинки в конце
ScrollTrigger.create({
  trigger: ".autoposting__middle-image",
  start: "top-=100 top",
  onEnter: () => {
    gsap.to(".autoposting__capsule-image img", {
      scale: 0.6,
      duration: 0.3,
      ease: "power2.out"
    });
  },
  onLeaveBack: () => {
    gsap.to(".autoposting__capsule-image img", {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  }
});

