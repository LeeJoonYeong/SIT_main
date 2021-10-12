'use strict';

// HTML 태그 변수.
const $mn_cvr_img = document.querySelector('.mn-cvr-img');
const $mn_conf = document.querySelector('.mn-conf');
const $mn_awning = document.querySelector('.mn-awning');

//export {$mn_awning};
export{$mn_awning};

// 스크롤 시, 이벤트 발생.
document.addEventListener('scroll', () => actionOpacity($mn_cvr_img, $mn_conf));

// 투명도 액션 함수 (vertical).
function actionOpacity(obj, obj2 = 0) {

    let opa = 0; // 투명도.
    let top = obj.getBoundingClientRect().top;
    let height = obj.getBoundingClientRect().height;

    // 이미지가 화면 상에서 사라진다면 함수 종료.
    if (top > 0 || top < -height) {
        return;
    }

    // 가려지는 오브젝트가 있다면.
    if (obj2) {
        let padding_top = window.getComputedStyle(obj2).getPropertyValue('padding-top');

        // 단위 문자 지우기.
        padding_top = removeUnitText(padding_top);

        opa = (1 + (top - padding_top) / height);
    } else {
        opa = (1 + (top / height));
    }
    
    // 투명도 적용.
    obj.style.opacity = opa;
}

// 단위 문자 지우는 함수.
function removeUnitText(text) {

    for(let i = 0; i < text.length; i++) {
        if(typeof text === 'string') {
            text = text.slice(0, -1);
        }
    }
    return text;
}