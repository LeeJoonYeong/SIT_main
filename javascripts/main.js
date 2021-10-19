'use strict';

// HTML 태그 변수.
export{$mn_awning};

const $video_wrap = document.querySelector('.video-wrap');
const $video_cont_box = document.querySelector('.video-wrap .video-box .content-box');
const $video_off_ico = document.querySelector('.video-wrap .video-box .cancel-ico');
const $mn_cvr_img = document.querySelector('.mn-cvr-img');
const $mn_conf = document.querySelector('.mn-conf');
const $mn_awning = document.querySelector('.mn-awning');
const $mn_grid_cont = document.querySelectorAll('.mn-conf .cont-box .grid-box div');
const $mn_grid_btn = document.querySelector('.mn-conf .cont-box .grid-box .more-box .btn-more');
const $mn_watch_mn_btn = document.querySelector('.mn-watch .watch-box .video-box .l-box .btn-play');
const $mn_watch_sub_btn = document.querySelectorAll('.mn-watch .watch-box .video-box .r-box .cont-box .btn-play');
const $mn_people = document.querySelector('.mn-people');
const $mn_people_li = document.querySelector('.mn-people ul:first-child');
const $mn_people_li_btn = document.querySelectorAll('.mn-people ul:last-child li');
const $mn_sitInfo_Slide_ico = document.querySelector('.mn-sit-info .slider .ico');
const $mn_sitInfo_Slide_ico_m = document.querySelector('.mn-sit-info .slider .ico-mb');
const $mn_sitInfo_Slide_yearBox = document.querySelectorAll('.mn-sit-info .slider .year-box');
const $mn_gallery = document.querySelector('.mn-gallery');
const $mn_gallery_li = {
    obj: document.querySelector('.mn-gallery .gallery-box ul'),
    shiftX: 0,
    count: 0,
    isClicking: false,
};
let isClicking = false;
let shiftX;
let preLeft;
let curLeft;
let count = 0;
let preMouseX;
let curMouseX;

// 스크롤 시, 이벤트 발생.
document.addEventListener('scroll', () => actionOpacity($mn_cvr_img, $mn_conf));

//////////////////// '메인 피플' 드래그 이벤트 zone. ////////////////////
$mn_people_li.addEventListener('mousedown', (event) => {

    const isMobile = window.getComputedStyle($mn_people_li).getPropertyValue('position');
    if(isMobile === 'static') {
        return;
    }

    // 클릭 시 스위치 켬.
    isClicking = true;

    shiftX = event.clientX - $mn_people_li.getBoundingClientRect().left;

    $mn_people_li.classList.remove('active');

    preLeft = window.getComputedStyle($mn_people_li).getPropertyValue('left');    ;
    preLeft = removeUnitText(preLeft);
});

$mn_people_li.addEventListener('mousemove', (event) =>{

    // 스위치 꺼져 있으면 함수 종료.
    if(!isClicking) {
        return;
    }
    
    let margin_left = window.getComputedStyle($mn_people).getPropertyValue('margin-left');
    margin_left = removeUnitText(margin_left);
    
    let result = event.clientX - margin_left - shiftX + 'px';
    $mn_people_li.style.left = result;

});

$mn_people_li.addEventListener('mouseup', (event) => {

    event.stopPropagation();
    onMouseUp_people();
});

// 기존 드래그 이벤트 방지.
$mn_people_li.ondragstart = () => {
    return false;
};
////////////////////////////////////////////////////////////////////////
////////////////// '메인 갤러리' 드래그 이벤트 zone. ///////////////////
$mn_gallery_li.obj.addEventListener('mousedown', (event) => {

    // 클릭 시 스위치 켬.
    $mn_gallery_li.isClicking = true;

    $mn_gallery_li.shiftX = event.clientX - $mn_gallery_li.obj.getBoundingClientRect().left;

    $mn_gallery_li.obj.classList.remove('active');

    preMouseX = event.clientX;

});

$mn_gallery_li.obj.addEventListener('mousemove', (event) => {

    // 스위치 꺼져 있으면 함수 종료.
    if (!$mn_gallery_li.isClicking) {
        return;
    }
    
    let margin_left = window.getComputedStyle($mn_gallery).getPropertyValue('margin-left');
    margin_left = removeUnitText(margin_left);

    curMouseX = event.clientX;
    let gap = Math.abs(preMouseX - curMouseX);
    if(gap > 200) {
        return;
    }

    // 결과 값.
    let result = event.clientX - margin_left - $mn_gallery_li.shiftX + 'px';
    $mn_gallery_li.obj.style.left = result;
});

$mn_gallery_li.obj.addEventListener('mouseup', (event) => {

    event.stopPropagation();
    onMouseUp_gallery(event); 
});

// 기존 드래그 이벤트 방지.
$mn_gallery_li.obj.ondragstart = () => false;
///////////////////////////////////////////////////////////////////////

// 마우스가 해당 컨테이너를 벗어나 mouseup이 될 경우도 스위치 끔.
document.body.addEventListener('mouseup', (event) =>{

    onMouseUp_people();
    onMouseUp_gallery(event);
    
});

// '메인 와치' 메인 비디오 재생 버튼 클릭 시, 이벤트 호출.
$mn_watch_mn_btn.addEventListener('click', () => {

    $video_wrap.style.display = 'block';
    $video_cont_box.innerHTML = '<iframe width="100" height="50" src="https://www.youtube.com/embed/eM3oRYWsBzE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    $video_cont_box.firstElementChild.style.width = '100%';
    $video_cont_box.firstElementChild.style.height = '100%';
});

// '메인 와치' 서브 비디오 재생 버튼 클릭 시,
mnWatchSubVideoBtnClick($mn_watch_sub_btn, $video_cont_box);

// '메인 와치' 비디오 팝업 끄기 버튼 클릭 시, 팝업 끔.
$video_off_ico.addEventListener('click', () => {

    $video_wrap.style.display = 'none';
});

// '메인 피플' 버튼 클릭 시,
mnPeopleBtnCilck($mn_people_li_btn);

// '메인 sit-info slider year-box' 버튼 클릭 시,
mnSitInfoSlideCilck($mn_sitInfo_Slide_yearBox);

// '메인 컨퍼런스' '더 보기' 버튼 클릭 이벤트.
$mn_grid_btn.onclick = () => {

    for(let i = 0; i < $mn_grid_cont.length; i++) {

        // 'visibility', 'Class Contain Boolean' 값 가져오기.
        const visibility = window.getComputedStyle($mn_grid_cont[i]).getPropertyValue('visibility');
        const isActive = $mn_grid_cont[i].classList.contains('active');

        if (visibility === 'visible' && !isActive) { // 관리 제외 대상자 조건.
            continue;
        } else if (visibility === 'visible' && isActive) { // 컨텐츠 접기.
            $mn_grid_cont[i].classList.remove('active');
            $mn_grid_btn.textContent = '더 보기';
        } else if (visibility === 'hidden') { // 컨텐츠 펼치기.
            $mn_grid_cont[i].classList.add('active');
            $mn_grid_btn.textContent = '접 기';
        }
    }
};

// 투명도 액션 함수 (vertical).
function actionOpacity(obj, obj2 = 0) {

    let opa = 0; // 투명도.
    let top = obj.getBoundingClientRect().top;
    let height = obj.getBoundingClientRect().height;
    let padding_top = window.getComputedStyle(obj2).getPropertyValue('padding-top');
    padding_top = removeUnitText(padding_top);

    // 이미지가 화면 상에서 사라진다면 함수 종료.
    if (top >= padding_top || top - padding_top < -height) {
        return;
    }

    // 가려지는 오브젝트가 있다면.
    if (obj2) {
        opa = (1 + (top - padding_top) / height);
    } else {
        opa = (1 + (top / height));
    }
    
    // 투명도 적용.
    obj.style.opacity = opa;
}

// 단위 문자 지우는 함수. (소수점 버림)
function removeUnitText(text) {

    let result ='';

    for(let i = 0; i < text.length; i++) {

        if(text[i].charCodeAt() === 46) {
            break;
        }

        if(text[i].charCodeAt() === 45) {
            result += text[i];
        }

        if(text[i].charCodeAt() > 47 && text[i].charCodeAt() < 58) {
            result += text[i];
        }
    }

    return Number(result);
}

// '메인 와치' 서브 비디오 재생 버튼 클릭 시, 팝업 노출 및 iframe 삽입.
function mnWatchSubVideoBtnClick(Btn_Arr_Obj, Cont_Box_Obj) {

    for(let i = 0; i < Btn_Arr_Obj.length; i++) {
        Btn_Arr_Obj[i].addEventListener('click', () => {
            setVideo(i);
        });
    }

    function setVideo(index) {
        switch(index) {
            case 0: Cont_Box_Obj.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/7UjPyahzklM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                break;
            case 1: Cont_Box_Obj.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/eqg1xIWhZ64" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                break;
            case 2: Cont_Box_Obj.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/vIZOxUfF2hM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                break;
        }
        Cont_Box_Obj.firstElementChild.style.width = '100%';
        Cont_Box_Obj.firstElementChild.style.height = '100%';
        $video_wrap.style.display = 'block';
    }
}

// '메인 피플' 마우스 버튼 Up시 드래그 방향 판단 후, 컨텐츠 이동 함수. (모바일)
function onMouseUp_people() {

    const isMobile = window.getComputedStyle($mn_people_li).getPropertyValue('position');
    if(isMobile === 'static') {
        return;
    }

    if(!isClicking) {
        return;
    }

    isClicking = false;
    $mn_people_li.classList.add('active');

    curLeft = window.getComputedStyle($mn_people_li).getPropertyValue('left');
    curLeft = removeUnitText(curLeft);

    let gap = preLeft - curLeft;
    if(gap > 0) {      
        switch(count) {
            case 0:              
                mnPeopleBtnColorChange($mn_people_li_btn, ++count);
                break;
            case 1:              
                mnPeopleBtnColorChange($mn_people_li_btn, ++count);
                break;
            case 2:
                mnPeopleBtnColorChange($mn_people_li_btn, count);
                break;
        }
    } else if(gap < 0) {
        switch(count) {
            case 0:
                mnPeopleBtnColorChange($mn_people_li_btn, count);
                break;
            case 1:                
                mnPeopleBtnColorChange($mn_people_li_btn, --count);
                break;
            case 2:               
                mnPeopleBtnColorChange($mn_people_li_btn, --count);
                break;
        }
    }  
}

// '메인 피플' 버튼 클릭 함수. (모바일)
function mnPeopleBtnCilck(obj) {

    for(let i = 0; i < obj.length; i++) {
        obj[i].addEventListener('click', () => mnPeopleBtnColorChange(obj, i));
    }

}

// '메인 피플' 버튼 클릭시 컬러 변경 및 컨텐츠 이동 함수. (모바일)
function mnPeopleBtnColorChange(obj, index) {

    for (let i = 0; i < obj.length; i++) {
        if(i === index) {
            obj[i].classList.add('active');
        } else {
            obj[i].className = '';
        }
    }

    switch(index) {
        case 0:
            $mn_people_li.style.left = 0;
            count = 0;
            break;
        case 1:
            $mn_people_li.style.left = -100 + '%';
            count = 1;
            break;
        case 2:
            $mn_people_li.style.left = -200 + '%';
            count = 2;
            break;
    }
}

// '메인 갤러리' 마우스 버튼 Up시 드래그 방향 판단 후, 컨텐츠 이동 함수.
function onMouseUp_gallery(event) {

    if(!$mn_gallery_li.isClicking) {
        return;
    }

    $mn_gallery_li.friction = 0;
    $mn_gallery_li.isClicking = false;
    $mn_gallery_li.obj.classList.add('active');

    curMouseX = event.clientX;

    let gap = preMouseX - curMouseX;
    if(gap > 0) {      
        switch($mn_gallery_li.count) {
            case 0:              
                mnGalleryYearMoving($mn_gallery_li.obj, ++$mn_gallery_li.count);
                break;
            case 1:              
                mnGalleryYearMoving($mn_gallery_li.obj, ++$mn_gallery_li.count);
                break;
            case 2:
                mnGalleryYearMoving($mn_gallery_li.obj, $mn_gallery_li.count);
                break;
        }
    } else if(gap < 0) {
        switch($mn_gallery_li.count) {
            case 0:
                mnGalleryYearMoving($mn_gallery_li.obj, $mn_gallery_li.count);
                break;
            case 1:                
                mnGalleryYearMoving($mn_gallery_li.obj, --$mn_gallery_li.count);
                break;
            case 2:               
                mnGalleryYearMoving($mn_gallery_li.obj, --$mn_gallery_li.count);
                break;
        }
    }  
}

// '메인 갤러리' 슬라이더 년도 클릭 함수.
function mnSitInfoSlideCilck(object) {

    for(let i = 0; i < object.length; i++) {
        object[i].addEventListener('click', () => mnGalleryYearMoving($mn_gallery_li.obj, i));
    }

}

// '메인 갤러리' 슬라이더 년도 클릭시 아이콘 이동 및 컨텐츠 이동 함수.
function mnGalleryYearMoving(obj, index) {

    switch(index) {
        case 0:
            obj.style.left = 0;
            $mn_gallery_li.count = index;
            $mn_sitInfo_Slide_ico.style.left = 0;
            $mn_sitInfo_Slide_ico_m.style.left = 0;
            break;
        case 1:
            obj.style.left = -100 / 3 + '%';
            $mn_gallery_li.count = index;
            $mn_sitInfo_Slide_ico.style.left = 46 + '%';
            $mn_sitInfo_Slide_ico_m.style.left = 50 + '%';
            break;
        case 2:
            obj.style.left = -100 / 3 * 2 + '%';
            $mn_gallery_li.count = index;
            $mn_sitInfo_Slide_ico.style.left = 92 + '%';
            $mn_sitInfo_Slide_ico_m.style.left = 100 + '%';
            break;
    }
}