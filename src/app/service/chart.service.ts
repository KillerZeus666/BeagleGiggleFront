// chart.service.ts
import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration, ChartTypeRegistry } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  createChart(ctx: string | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>, 
              config: ChartConfiguration<keyof ChartTypeRegistry, number[], string>): Chart {
    return new Chart(ctx, config);
  }
}