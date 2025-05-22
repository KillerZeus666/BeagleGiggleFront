import { Component } from '@angular/core';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent {

  // Cambia estos valores por los que te dio EmailJS
  serviceID = 'service_2025';
  templateID = 'template_2025';
  userID = 'qOciVGceMq0WS14pD';

  // Recibimos también el formulario para poder resetearlo
  sendEmail(formValues: { name: string; email: string; title: string; message: string }, form: any) {
    emailjs.send(this.serviceID, this.templateID, {
      name: formValues.name,
      email: formValues.email,
      title: formValues.title,
      message: formValues.message
    }, this.userID)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Mensaje enviado correctamente, pronto nos pondremos en contacto contigo.');
      form.reset(); // Limpiamos el formulario
    }, (error) => {
      console.log('FAILED...', error);
      alert('Error al enviar el mensaje, intenta de nuevo.');
    });
  }
}
