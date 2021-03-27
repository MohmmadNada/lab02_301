'use strict';
// 1. we want to make constructor function depond on json file argument 
const allObject = [];

function ImagesFun(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    allObject.push(this);
}
//function in (ImagesFun) to render it from html  and give it class = keyword
ImagesFun.prototype.render = function() {
    // get tepmlate by id and put it in the variable , by clone(make copy, we need rempve id becouse we have to elemnt with the same id , the origin one and clone one)
    let templateImg = $('#photo-template').clone();
    // put it in the correct location
    $('main').append(templateImg);
    // find some element on it and give it text from obj and attr 
    templateImg.find('h2').text(this.title);
    templateImg.find('p').text(this.description);
    templateImg.find('img').attr('src', this.image_url);
    templateImg.attr('class', this.keyword);
    templateImg.removeAttr('id');
}
ImagesFun.prototype.render();
// ---------------------------------- get data from json file -----------------------------------------------
//get data from page 1
function getImagesData() {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }
    $.ajax('data/page-1.json', ajaxSettings).then(data => {
        // console.log(data); 
        data.forEach(element => {
            let ImageObject = new ImagesFun(element.image_url, element.title, element.description, element.keyword, element.horns);
            ImageObject.render();
        });
    })
}
$(document).ready(getImagesData);
//get data from page 2
function getImagesData2() {
    //copy paste for now 
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }
    $.ajax('data/page-2.json', ajaxSettings).then(data => {
        // console.log(data);
        //we get data from json file
        // new obj from aray in json 
        data.forEach(element => {
            let ImageObject = new ImagesFun(element.image_url, element.title, element.description, element.keyword, element.horns);
            //add function for it 
            ImageObject.render();
        });
    })
}
$(document).ready(getImagesData2);

// -----------------make filter depond on data page  --------------------------->------- 
$(document).ready(function filterFun1() {
    //copy paste for now 
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }
    $.ajax('data/page-1.json', ajaxSettings).then(data => {
        let filterOption;
        data.forEach(element => {
            // console.log(element.keyword);
            $('select').append("<option></option>");
            filterOption = $('option').last().text(element.keyword).attr('value', element.keyword);
            //it take always the first option , so use last to get the last one i added 
            $(document).ready(function() {
                $('select').on('change', function() {
                    // console.log(selectOption);
                    let selected = $(this).val();
                    // console.log(selected);
                    $('main div').hide();
                    if (selected === 'default') {
                        $('main div').show();

                    } else {
                        allObject.find(element => {
                            if (element.keyword === selected) {
                                // console.log(selected);
                                $('main div.' + selected).show();
                            }
                        })
                    }
                })
            });
        });
    })

    // getImagesData();
});
$(document).ready(function filterFun2() {
    //copy paste for now 
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }
    $.ajax('data/page-2.json', ajaxSettings).then(data => {
        let filterOption;
        data.forEach(element => {
            // console.log(element.keyword);
            $('select').append("<option></option>");
            filterOption = $('option').last().text(element.keyword).attr('value', element.keyword);
            //it take always the first option , so use last to get the last one i added 
        });
    })

    // getImagesData();
});
// $(document).ready(getImagesData2);
// -----------finsh make options--------------
//we need get select option
// for lab 03 Feature 1: Pagination
//1. add tow click button , each one show  images form jason file not from two json file
//------------- get data from json 2 -----
// ------------------fisrt step-------------
//we need function to get data from json file

//---------------- finish ------------ 
// create 2 buttons and append it to the header 
$('header').append('<button></button ><button></button >');
// give it attr and id and text 
let button1 = $('button').first().attr('type', 'button').attr('id', 'firstButton').text('first Page');
let button2 = $('button').last().attr('type', 'button').attr('id', 'secondButton').text('second Page');
//add event on click to show elements note : 20elements from 1page and 20elements from 2page
// $(document).ready(filterFun1);
$(document).ready(function() {
    $('#firstButton').on('click', function(event) {
        // $(document).ready(getImagesData2);
        event.preventDefault();
        $('div').show();
        $('option').show();
        $('div').slice(22).hide();
        $('option').slice(22).hide();
        $('option').slice(21).hide();
    })
    $('#secondButton').on('click', function(event) {
        event.preventDefault();
        $('div').show();
        $('option').show();
        $('div').slice(0, 22).hide();
        $('div').slice(22).show();
        $('option').slice(0, 21).hide();
    })
});