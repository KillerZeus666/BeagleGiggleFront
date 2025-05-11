import { Component } from '@angular/core';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent {
  // Creamos un arreglo de preguntas con respuestas y un estado de apertura (true o false)
  faqs = [
    { 
      question: "¿Cuál es el horario de atención?", 
      answer: "Atendemos de lunes a viernes, de 9:00 AM a 6:00 PM.", 
      open: false 
    },
    { 
      question: "¿Cómo puedo realizar un pedido?", 
      answer: "Puedes realizar tu pedido a través de nuestra página web, seleccionando los productos que deseas y completando el formulario de compra.", 
      open: false 
    },
    { 
      question: "¿Qué métodos de pago aceptan?", 
      answer: "Aceptamos tarjetas de crédito, débito, PayPal y transferencias bancarias.", 
      open: false 
    },
    { 
      question: "¿Puedo cancelar mi pedido?", 
      answer: "Los pedidos pueden cancelarse antes de que sean enviados. Contacta con nuestro servicio al cliente para hacerlo.", 
      open: false 
    }
  ];

  // Método para manejar el estado de apertura/cierre de la respuesta
  toggleAnswer(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
