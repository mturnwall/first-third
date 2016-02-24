let currentId = 1,
    tabMap = [3, 2, 1, 0],
    pointer;

/**
 * Switch between tabs using the carousel feature
 * @param  {DOM Node} el - tab button that was clicked
 * @author  Michael Turnwall
 */
function switchTab(el) {
    let id = tabMap[el.getAttribute('data-tab') - 1],
        currentTab = document.querySelector('.tabBtn--active');

    if (id !== currentId) {
        $('.tabsContent').slick('slickGoTo', id);
        currentTab.className = currentTab.className.replace(' tabBtn--active', '');
        el.className += ' tabBtn--active';
        // console.log((id * 25) + '%');
        pointer.style.left = ((el.getAttribute('data-tab') - 1) * 25) + 11 + '%';
        currentId = id;
    }
}

$(document).ready(function() {
    let tabBtns = document.querySelector('.tabs');
    pointer = document.querySelector('.tabPointer');
    $('.tabsContent').slick({
        arrows: false,
        slidesToShow: 1,
        autoplay: false,
        infinite: false,
        initialSlide: 3,
        cssEase: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
        speed: 1000,
        swipe: false,
        draggable: false,
        useTransform: true
    });
    tabBtns.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(e.target);
    });
});
