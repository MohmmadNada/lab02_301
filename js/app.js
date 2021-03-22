'use strict';
// make constructor function
//this parameter from json file
function ImagesFun(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
}
//take element from html by prototype function 
ImagesFun.prototype.render = function() {
        // get tepmlate by id and put it in the variable , by clone(make copy, we need rempve id becouse we have to elemnt with the same id , the origin one and clone one)
        let templateImg = $('#photo-template').clone();
        // put it in the correct location
        $('main').append(templateImg);
        // find some element on it and give it text from obj and attr 
        templateImg.find('h2').text(this.title);
        templateImg.find('p').text(this.description);
        templateImg.find('img').attr('src', this.image_url);
    }
    // call function
ImagesFun.prototype.render();
// ------------------fisrt step-------------
//we need function to get data from json file
function getImagesData() {
    //copy paste for now 
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }
    $.ajax('data/page-1.json', ajaxSettings).then(data => {
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
// to be after loaded the page
$(document).ready(getImagesData);
// -----------------second step --------------------------->-------
$(document).ready(function filterFun() {
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
        });
    })

    // getImagesData();
});
//we didnt call it , why ot still work 
// filterFun();
// -----------finsh make options--------------
const selectOption = $('select').children('option:selected').val();
//we need get select option
console.log(selectOption);



/*$(document).ready(function() {

    const buttonElement = $('button');
    console.log(buttonElement);

    $('button').on('click', function() {
        // counter++;
        // console.log("button is clicked!! counter: ", counter);
        // use toggleClass function to add/remove a specific class;
        // console.log(this); <button ..></button>
        // console.log($(this));
        $(this).siblings('ul').toggleClass('on');
        // or I can use this $('ul').toggleClass('on');
    });
});
*/