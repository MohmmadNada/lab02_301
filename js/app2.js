'use strict';
const allObject = [];

function ImagesFun(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    allObject.push(this);
}
ImagesFun.prototype.render = function() {
    let template = $('#mustache-template').html();
    console.log(template);
    let html = Mustache.render(template, this);
    $('main').append(html);
    return html;
}

//get data from json 
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
        // $.ajax('data/page-2.json', ajaxSettings).then(data => {
        //     // console.log(data); 
        //     data.forEach(element => {
        //         let ImageObject = new ImagesFun(element.image_url, element.title, element.description, element.keyword, element.horns);
        //         ImageObject.render();
        //     });
        // })
}

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
$(document).ready(getImagesData);
$(document).ready(getImagesData2);
ImagesFun.prototype.render();
/******** all images show  */
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

/**** add all key for filter  */
$('header').append('<button></button ><button></button >');
let button1 = $('button').first().attr('type', 'button').attr('id', 'firstButton').text('first Page');
let button2 = $('button').last().attr('type', 'button').attr('id', 'secondButton').text('second Page');
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