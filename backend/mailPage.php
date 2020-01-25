<!-- 
  This file contains an html template that is sent to the user's email. 
  All markers are to be replaced with appropriate values during email
  configuration in EmailSender class.
-->

<section class="ticket">
  <header class="tichet__check" style="padding-left:1.5rem;padding-right:1.5rem;background-color:rgba(241, 235, 230, 0.95);position:relative;padding-top:2.5rem;padding-bottom:2.5rem;">
    <h2 class="ticket__check-title" style="font-weight:700;font-size:2.2rem;text-transform:uppercase;color:#C76F00;">Электронный билет</h2>
  </header>

  <div class="ticket__info-wrapper" style="padding-left:1.5rem;padding-right:1.5rem;background-color:rgba(241, 235, 230, 0.95);position:relative;padding-top:2rem;padding-bottom:3rem;">
    <p class="ticket__info" style="font-size:1.4rem;color:#000000;">
      На фильм: <span class="ticket__details ticket__title" style="font-weight:700;">{%MOVIE_NAME%}</span>
    </p>
    <p class="ticket__info" style="font-size:1.4rem;color:#000000;">
      Места: {%SEATS%}
    </p>
    <p class="ticket__info" style="font-size:1.4rem;color:#000000;">
      В зале: <span class="ticket__details ticket__hall" style="font-weight:700;">{%HALL_NAME%}</span>
    </p>
    <p class="ticket__info" style="font-size:1.4rem;color:#000000;">
      Начало сеанса: <span class="ticket__details ticket__start" style="font-weight:700;">{%TIME%}</span>
    </p>
    <img class="ticket__info-qr" src="cid:qr" alt="qr-code" style="display:block;margin-top:3rem;margin-bottom:0;margin-right:auto;margin-left:auto;width:200px;height:200px;">
    <p class="ticket__hint" style="font-weight:300;font-size:1.3rem;margin-top:2rem;">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
    <p class="ticket__hint" style="font-weight:300;font-size:1.3rem;margin-top:2rem;">Приятного просмотра!</p>
  </div>
</section>