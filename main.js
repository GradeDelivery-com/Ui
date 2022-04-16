

var URL = "https://yi2u2j61yd.execute-api.eu-west-1.amazonaws.com/dev";
function sendFeedback(){

var feedback = $("#feedback").val();
 
    $.ajax({
        url: `${$("#ApiUrl").val()}/send-feedback/${feedback}`,
        type: "GET",
        success: function(data) { 
alert(data)


 },
        error: function(xhr, ajaxOptions, thrownError) {
                  alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                }
    });
}



    $(document).ready(function() {
        $("#ApiUrl").val(URL)

        let url2= "https://yi2u2j61yd.execute-api.eu-west-1.amazonaws.com/dev/list-all";
        console.log(url2); 

        fetch(url2)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));


    // The event listener for the file upload
    document.getElementById('txtFileUpload').addEventListener('change', upload, false);
    

    // Method that checks that the browser supports the HTML5 File API
    function browserSupportFileUpload() {
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
        isCompatible = true;
        }
        return isCompatible;
    }

    // Method that reads and processes the selected file
    function upload(evt) {
        if (!browserSupportFileUpload()) {
            alert('The File APIs are not fully supported in this browser!');
            } else {
                var data = null;
                var file = evt.target.files[0];
                var reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function(event) {
                    var csvData = event.target.result;
                    // https://wmtrd5o50a.execute-api.eu-west-1.amazonaws.com/dev/upload-class-data
                    var settings = {
                    "url": `${$("#ApiUrl").val()}/upload-class-data?class=${$("#ClassName").val()}`,
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "text/csv"
                    },
                    "data": csvData
                    };

                    $.ajax(settings).done(function (response) {
                    console.log(response);


                    if (response && response.length > 0) {
                    var UniqueNames= $.unique(response.map(function (d) {
                    return d.ClassName;}));
                    alert('Course: '+UniqueNames+'  Imported -' + response.length + '- rows successfully!');



                    } else {
                        alert('No data to import!');
                    }
                    });
                };
                reader.onerror = function() {
                    alert('Unable to read ' + file.fileName);
                };
            }
        }
    });


