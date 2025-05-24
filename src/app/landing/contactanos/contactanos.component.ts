import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements AfterViewInit {

  serviceID = 'service_2025';
  templateID = 'template_2025';
  userID = 'qOciVGceMq0WS14pD';

  constructor(private renderer: Renderer2) {}

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
      form.reset();
    }, (error) => {
      console.log('FAILED...', error);
      alert('Error al enviar el mensaje, intenta de nuevo.');
    });
  }

  ngAfterViewInit(): void {
    const markers = document.querySelectorAll('.vet-marker');

    markers.forEach(marker => {
      // Crear tooltip div
      const tooltip = this.renderer.createElement('div');
      this.renderer.addClass(tooltip, 'vet-tooltip');
      const name = marker.getAttribute('data-name') || '';
      const text = this.renderer.createText(name);
      this.renderer.appendChild(tooltip, text);
      this.renderer.appendChild(marker, tooltip);

      // Click en el marker
      this.renderer.listen(marker, 'click', (event) => {
        event.stopPropagation();

        // Ocultar tooltips de otros markers
        document.querySelectorAll('.vet-tooltip').forEach(tt => {
          if (tt !== tooltip) {
            tt.classList.remove('show');
          }
        });

        // Toggle el tooltip del marker actual
        tooltip.classList.toggle('show');
      });
    });

    // Clic fuera para cerrar tooltips
    this.renderer.listen(document, 'click', () => {
      document.querySelectorAll('.vet-tooltip').forEach(tt => {
        tt.classList.remove('show');
      });
    });
  }
}
