import { Component } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-ruleta-premios',
  templateUrl: './ruleta-premios.component.html',
  styleUrls: ['./ruleta-premios.component.css']
})
export class RuletaPremiosComponent {
  premios = [
    'Juguete Sorpresa',
    '30% en consulta general',
    '25% en peluquería',
    'Collar/placa Personalizado',
    'Premio comestible saludable para tu mascota',
    'Corte de uñas gratis',
    'Imán con foto de tu mascota',
  ];

  rotacion = 0;
  girando = false;
  premioGanado: string | null = null;

  girarRuleta() {
    if (this.girando) return;

    this.girando = true;
    const vueltas = Math.floor(Math.random() * 5) + 5;
    const anguloPorPremio = 360 / this.premios.length;
    const premioIndex = Math.floor(Math.random() * this.premios.length);
    const anguloFinal = (360 - (premioIndex * anguloPorPremio)) + (vueltas * 360);

    this.rotacion = anguloFinal;

    setTimeout(() => {
      this.premioGanado = this.premios[premioIndex];
      this.girando = false;

      // Generar PDF cuando ya tenemos el premio
      this.generarCuponPDF(this.premioGanado);
    }, 4000); // Duración animación
  }

  generarCuponPDF(premio: string) {
  const doc = new jsPDF();

  // Fondo blanco con sombra sutil (simulada con un rectángulo gris claro)
  doc.setFillColor(245, 245, 245);
  doc.rect(10, 10, 190, 277, 'F');

  // Marco azul grueso alrededor del cupón
  doc.setDrawColor('#4fa9d5');
  doc.setLineWidth(4);
  doc.rect(15, 15, 180, 267);

  // Título principal
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#4fa9d5');
  doc.text('Cupón de Premio', 105, 45, { align: 'center' });

  // Línea decorativa debajo del título
  doc.setDrawColor('#72c0ea');
  doc.setLineWidth(2);
  doc.line(50, 52, 160, 52);

  // Texto de felicitación
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor('#222');
  const textoIntro = '¡Felicidades! Has ganado:';
  doc.text(textoIntro, 30, 80);

  // Premio resaltado
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bolditalic');
  doc.setTextColor('#4fa9d5');
  doc.text(premio, 105, 100, { align: 'center' });

  // Texto adicional instrucciones
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor('#333');
  const instrucciones = 'Presenta este cupón en tu próxima visita a BeagleGiggle para reclamar tu premio.';
  doc.text(instrucciones, 30, 130, { maxWidth: 150, align: 'left' });

  // Línea separadora
  doc.setDrawColor('#72c0ea');
  doc.setLineWidth(1);
  doc.line(30, 145, 180, 145);

  // Notas / condiciones
  doc.setFontSize(10);
  doc.setTextColor('#555');
  doc.text('* Cupón válido por 30 días desde la fecha de emisión.', 30, 160);
  doc.text('* No acumulable con otras promociones.', 30, 168);

  // Pie de página discreto
  doc.setFontSize(9);
  doc.setTextColor('#999');
  doc.text('© 2025 BeagleGiggle. Todos los derechos reservados.', 105, 280, { align: 'center' });

  // Guardar PDF
  doc.save('cupon-premio-beaglegiggle.pdf');
}

}
