'use strict';

// 카테고리 열거체.
const category = {
    'sit-conference': 0,
    'sit-project': 1,
    'community': 2,
    'story': 3,
    'sit-introduce': 4,
    'watch': 5,
};

// HTML 태그 변수.
//const $mn_awning = document.querySelector('.mn-awning');
import { $mn_awning } from "./main.js";

const $category = document.querySelectorAll('.nav-wrap .category-box ul li a');
const $search_ico = document.querySelector('.nav-wrap .category-box .search-ico');
const $cancel_ico = document.querySelector('.nav-wrap .category-box .cancel-ico');
const $add_wrap = document.querySelector('.add-wrap');
const $comm_box = document.querySelector('.add-wrap .add-box .comm-box');
const $story_box = document.querySelector('.add-wrap .add-box .story-box');
const $search_wrap = document.querySelector('.search-wrap');

/* ----------------------------------------------*/

/* 'SIT프로젝트' 카테고리 마우스 이벤트 */
// 마우스를 올렸을 시.
$category[category["sit-project"]].addEventListener('mouseover', () => {
      
    $add_wrap.style.transform = 'scale(1, 0)';

})

/* '커뮤니티' 카테고리 마우스 이벤트 */
// 마우스를 올렸을 시.
$category[category["community"]].addEventListener('mouseover', () => {
      
    $add_wrap.style.transform = 'scale(1)';
    $comm_box.style.display = 'block';
    $story_box.style.display = 'none';
})

/* '스토리' 카테고리 마우스 이벤트 */
// 마우스를 올렸을 시.
$category[category["story"]].addEventListener('mouseover', () => {
      
    $add_wrap.style.transform = 'scale(1)';
    $story_box.style.display = 'block';
    $comm_box.style.display = 'none';
})

/* 'SIT 소개' 카테고리 마우스 이벤트 */
// 마우스를 올렸을 시.
$category[category["sit-introduce"]].addEventListener('mouseover', () => {

    $add_wrap.style.transform = 'scale(1, 0)';
})

/* ----------------------------------------------*/

/* '에디션 박스' 마우스 이벤트 */
// 마우스를 뗄 시.
$add_wrap.addEventListener('mouseleave', () => {

    $add_wrap.style.transform = 'scale(1, 0)';
})

/* ----------------------------------------------*/

/* '검색' 아이콘 마우스 이벤트 */
// 마우스 클릭 시.
$search_ico.addEventListener('click', () => {

    $search_ico.style.display = 'none';
    $cancel_ico.style.display = 'list-item';
    $search_wrap.style.display = 'block';
    $mn_awning.style.display = 'block';


})

/* '검색 취소' 아이콘 마우스 이벤트 */
// 마우스 클릭 시.
$cancel_ico.addEventListener('click', () => {

    $cancel_ico.style.display = 'none';
    $search_ico.style.display = 'list-item';
    $search_wrap.style.display = 'none';
    $mn_awning.style.display = 'none';

})
