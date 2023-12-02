$(document).ready(function(){

    console.log('Document is Ready')

    //  getting the date using Date() object and converting it to a string
    let date = new Date()
    let current_date = date.toDateString()

    //  display the date on the HTML page using JQUERY and JS
    $('').text('Date : ' + current_date)

    
    let review = ""
    let input_data = ""
    let product = ""
    let emotion = ""
    let emoji_url = ""

    //  making a function for AJAX request
    function ajax_request(api_url , input_data){

        $.ajax({

            // type of request
            type : '',

            // url
            url : api_url,

            //  JSON data
            data : JSON.stringify(input_data),

            //  datatype of expected response
            dataType : 'json',

            //  content type
            contentType : 'application/json',

            //  success method
            success : function(result)
            {
                //  extract the sentiment and emoji path
                emotion = result.sentiment
                emoji_url = result.path

                //  update the emoticon and sentiment accordingly
                if (product  ==  'Smartphone'){
                    $('#m_emoji').attr('src' , emoji_url)
                    $('#m_emotion').text(emotion)
                    $('#m_emoji').show()
                    $('#m_emotion').show()
                }

                else if (product  ==  'Digital Camera'){
                    $('#c_emoji').attr('src' , emoji_url)
                    $('#c_emotion').text(emotion)
                    $('#c_emoji').show()
                    $('#c_emotion').show()
                }

                else if (product  ==  'Headphones'){
                    $('#h_emoji').attr('src' , emoji_url)
                    $('#h_emotion').text(emotion)
                    $('#h_emoji').show()
                    $('#h_emotion').show()
                }

                else if (product  ==  'Video Games'){
                    $('#v_emoji').attr('src' , emoji_url)
                    $('#v_emotion').text(emotion)
                    $('#v_emoji').show()
                    $('#v_emotion').show()
                }
            },

            //  error method
            error : function(result)
            {
                console.log(result)
            }

        })

        console.log('ajax request sent')
        
    }


    // When the submit button under 'smartphone' is clicked
$('#m_button').click(function(){
    // Get the review for smartphone
    var review = $('#m_textbox').val();
    var input_data = {'customer_review': review};

    // Make an AJAX call to predict the sentiment for smartphone review
    ajax_request('/predict', input_data);

    // Set the product as 'Smartphone'
    product = 'Smartphone';
});

// Similarly, do this for other products as well
$('#c_button').click(function(){
    var review = $('#c_textbox').val();
    var input_data = {'customer_review': review};
    ajax_request('/predict', input_data);
    product = 'Digital Camera';
});

$('#h_button').click(function(){
    var review = $('#h_textbox').val();
    var input_data = {'customer_review': review};
    ajax_request('/predict', input_data);
    product = 'Headphones';
});

$('#v_button').click(function(){
    var review = $('#v_textbox').val();
    var input_data = {'customer_review': review};
    ajax_request('/predict', input_data);
    product = 'Video Games';
});


    //  if SAVE button is clicked, hit a post request on the API

    // When the Save button is clicked
$('#save_button').click(function(){
    console.log('Save button is clicked');

    // Prepare data to be sent for logging
    var input_data = {
        'date': new Date(),
        'product': product, 
        'review': review, 
        'sentiment': emotion
    };

    // Make an AJAX call to save the review data to a CSV file
    $.ajax({
        type: 'POST', 
        url: '/save', 
        data: JSON.stringify(input_data), 
        dataType: 'json',
        contentType: 'application/json',
        success: function(result) {
            console.log(result); 
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText); 
        }
    });

    // Clear the textboxes after saving
    $('#m_textbox').val('');
    $('#c_textbox').val('');
    $('#h_textbox').val('');
    $('#v_textbox').val('');
});
