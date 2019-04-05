import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApixuService {
  constructor(private http: HttpClient) {}

  getWeather(location) {
    return this.http.get(
      "https://api.apixu.com/v1/current.json?key=7928173237374e29a2e63905190404&q=" +
        location
    );
  }

  getNextWeather(location) {
    return this.http.get(
    "http://api.apixu.com/v1/forecast.json?key=7928173237374e29a2e63905190404&q="+location+"&days=5"
    );
  }
  getHistoryWeather(location,dt_str) {
    return this.http.get(
    "http://api.apixu.com/v1/history.json?key=7928173237374e29a2e63905190404&q="+location+"&dt="+dt_str
    );
  }
}
