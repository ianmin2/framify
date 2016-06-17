//The BASIC application service
app.service("cgi",[function(){
    
    //Handle background calls to the web server for database integration
    this.ajax = function(data){
        return $.ajax({
                    method: "GET",
                    url: "/php/index.php",
                    data: data       
                });
    };
                
}])