import { FormBuilder, FormGroup } from "@angular/forms";
import { ApixuService } from "../apixu.service";
import {DatePipe} from '@angular/common';
import { Ng2Highcharts } from 'ng2-highcharts';
import { Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';
import { FusionChartsModule } from 'angular-fusioncharts';

import {
  animate,
} from '@angular/animations';

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherData: any;
  public show = 0;
  public weatherDataNext: any;
  public weatherDataHistory: any;

  public date: Date;
  public newdates = [];
  public history_data = [];
  public min_temp = new Array();
  public max_temp = new Array();
  public avg_temp = new Array();
  public humidity = new Array();
  public photo: any;
  chart = [];

  dataSource: Object;
  chartConfig: Object;
  constructor(
    private formBuilder: FormBuilder,
    private apixuService: ApixuService,
    private datePipe: DatePipe,


  ) {}

  ngOnInit() {
  document.body.className = "selector";
    this.weatherSearchForm = this.formBuilder.group({
      location: [""]
    });
    this.photo = 'http://www.gsfdcy.com/data/img1/50/1705368-leaf-wallpaper.jpg';
        this.chartConfig = {
            width: '700',
            height: '400',
            type: 'column2d',
            dataFormat: 'json',
        };

  for (let i = 6; i >=0; i--) {
  this.date = new Date();
  this.date.setDate( this.date.getDate() - i );
  this.newdates.push(this.datePipe.transform(this.date,"yyyy-MM-dd"));

  }
        console.log(this.newdates);

    }

  sendToAPIXU(formValues) {
    this.apixuService.getWeather(formValues.location).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
    });
    this.apixuService.getNextWeather(formValues.location).subscribe(data => {
      this.weatherDataNext = data;
      console.log(this.weatherDataNext);
    });
    for (let i = 1; i < 8; i++)
    {    
    this.apixuService.getHistoryWeather(formValues.location,this.newdates[i-1]).subscribe(data => {
      this.weatherDataHistory = data;
      this.history_data.push(this.weatherDataHistory);
      this.min_temp.push(this.weatherDataHistory.forecast.forecastday[0].day.mintemp_c);
      this.max_temp.push(this.weatherDataHistory.forecast.forecastday[0].day.maxtemp_c);
      this.humidity.push(this.weatherDataHistory.forecast.forecastday[0].day.avghumidity);
      this.avg_temp.push(this.weatherDataHistory.forecast.forecastday[0].day.avgtemp_c);


      this.dataSource = {
        "chart": {
          "caption": "Past 7 Days Observed Temperatures",
          "xAxisname": "Dates",
          "yAxisName": "Temp. in °C",
          "theme": "fusion"
        },
        "categories": [{
          "category": [{
            "label": this.newdates[0]
          }, {
            "label": this.newdates[1]
          }, {
            "label": this.newdates[2]
          }, {
            "label": this.newdates[3]
          }, {
            "label": this.newdates[4]
          }, {
            "label": this.newdates[5]
          }, {
            "label": this.newdates[6]
          }]
        }],
        "dataset": [{
          "seriesName": "Max. Temp",
          "renderAs": "line",
          "data": [{
            "value": this.max_temp[0]
          }, {
            "value": this.max_temp[1]
          }, {
            "value": this.max_temp[2]
          }, {
            "value": this.max_temp[3]
          }, {
            "value": this.max_temp[4]
          }, {
            "value": this.max_temp[5]
          }, {
            "value": this.max_temp[6]
          }]
        }, {
          "seriesName": "Min. Temp",
          "renderAs": "line",
          "data": [{
            "value": this.min_temp[0]
          }, {
            "value": this.min_temp[1]
          }, {
            "value": this.min_temp[2]
          }, {
            "value": this.min_temp[3]
          }, {
            "value": this.min_temp[4]
          }, {
            "value": this.min_temp[5]
          }, {
            "value": this.min_temp[6]
          }]
        }, {
          "seriesName": "Avg. Temp",
          "showAnchors" : "0",
          "data": [{
            "value": this.avg_temp[0]
          }, {
            "value": this.avg_temp[1]
          }, {
            "value": this.avg_temp[2]
          }, {
            "value": this.avg_temp[3]
          }, {
            "value": this.avg_temp[4]
          }, {
            "value": this.avg_temp[5]
          }, {
            "value": this.avg_temp[6]
          }]
        }]
      };

      this.dataSource2 = {
        "chart": {
          "caption": "Past 7 Days Observed Humidity",
          "xAxisname": "Dates",
          "yAxisName": "Humidity",
          "theme": "fusion"
        },
        "categories": [{
          "category": [{
            "label": this.newdates[0]
          }, {
            "label": this.newdates[1]
          }, {
            "label": this.newdates[2]
          }, {
            "label": this.newdates[3]
          }, {
            "label": this.newdates[4]
          }, {
            "label": this.newdates[5]
          }, {
            "label": this.newdates[6]
          }]
        }],
        "dataset": [{
          "seriesName": "Humidity",
          "renderAs": "line",
          "data": [{
            "value": this.humidity[0]
          }, {
            "value": this.humidity[1]
          }, {
            "value": this.humidity[2]
          }, {
            "value": this.humidity[3]
          }, {
            "value": this.humidity[4]
          }, {
            "value": this.humidity[5]
          }, {
            "value": this.humidity[6]
          }]
        }]
      };

    });
    }
  }
  
      toggle() {
    this.show = this.show + 1;
    animate('1s')  
    } 
  }

