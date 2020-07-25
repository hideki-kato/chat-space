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

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main').append(html)
      $('form')[0].reset();
      $('.main').animate({ scrollTop: $('.main')[0].scrollHeight});
      $('.input__send').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.input__send').prop('disabled', false);
    });
  });
});

