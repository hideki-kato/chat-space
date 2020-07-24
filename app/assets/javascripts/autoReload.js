$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat" data-message-id=${message.id}>
          <div class="message">
            <div class="message__name">
              ${message.user_name}
            </div>
            <div class="message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__post">
            <p class="message__content">
              ${message.content}
            </p>
            <img class="message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="chat" data-message-id=${message.id}>
          <div class="message">
            <div class="message__name">
              ${message.user_name}
            </div>
            <div class="message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__post">
            <p class="message__content">
              ${message.content}
            </p>
          </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function(){
    let last_message_id = $('.chat:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main').append(insertHTML);
        $('.main').animate({ scrollTop: $('.main')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});
  
  
