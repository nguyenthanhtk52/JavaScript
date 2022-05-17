
$(document).ready(function(){
   
    $('.load').fadeOut(2000);

    fetch('https://gnews.io/api/v4/top-headlines?&token=0b0723789a31ee23cf1a0dabcd73bf86')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
       // console.log(data);
        const html = data.articles.map(
            title => 
            `<div class="div2"> <div class="image1"> <img src="`+ title.image +`" style ="width:30% ; float: left;"></div>` +
            `<div class="text" > <a href="` + title.url +`" target ="_blank" alt="gnews"><b>`+title.title+`</b></a>` +
            `<p><i>` + title.publishedAt + `</i></p>` +
            `<p>`+ title.content + 
            `</p> </div> </div>`
        )
        document.getElementById("div1").innerHTML = html;
    })


    $("#clickSearch").click(function(){
            $("#modalSearch").show() ;
            //target = true ;
        });
    $(".close").click(function(){
            $("#modalSearch").hide()
           // target = false ;
        });
       var modal = document.getElementById('modalSearch');
       window.onclick = function(event){
            if(event.target == modal)
           {
               modal.style.display = "none" ;
           } 
        }
    
    function getSearch(){
        var keyword =$('#textinput').val();
        var url = `https://gnews.io/api/v4/search?q=${keyword}&token=0b0723789a31ee23cf1a0dabcd73bf86`;
        var timeFrom = Date.now();
       // console.log(url);

        $("#textinput").val(""); 
        $('#modalSearch').hide() ;
        $('.load').fadeOut(2000);
        
        fetch(url)
        .then(function(response){
            return response.json() ;

        })
        .then(function(data){
           // console.log(data.articles);
           var timeTo = Date.now();
            document.getElementById("div1").innerHTML = "";
            var html = data.articles.map(
                       title => 
                        '<div class="div2"> <div class="image1"> <img src="'+ title.image +'" style ="width:30% ; float: left;"></div>' +
                        '<div class="text" > <a href="' + title.url +'" target ="_blank" alt="gnews"><b>'+title.title+'</b></a>' +
                        '<p><i>' + title.publishedAt + '</i></p>' +
                        '<p>'+ title.content + 
                        '</p> </div> </div>'
                      )
                      document.getElementById("div1").innerHTML =`<p>Time search :`+(timeTo - timeFrom)+` miliseconds</p>`+ html;
        })
    }
    $(document).on('click','#hideButton',getSearch)

    var input = document.getElementById("textinput");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode == 13) {
       event.preventDefault();// bỏ đi hàm xử lý mặc định với sự kiện
       document.getElementById("hideButton").click(getSearch);
      }
    });

 });
   