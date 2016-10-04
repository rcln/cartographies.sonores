import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var L: any;

@Component({
  selector: 'cartography',
  templateUrl: 'app/cartography.component.html',
  styleUrls: [
        'assets/css/cartography.css'
    ]
})
export class CartographyComponent implements OnInit {
    ngOnInit(): void {
        var map_containers = document.getElementsByClassName('cartography');
        Array.prototype.forEach.call(map_containers, function(e){
            var map = L.map(e).setView([51.505, -0.09], 2);
            L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
                minZoom: 1,
                maxZoom: 10,
                subdomains:['mt0','mt1','mt2','mt3']
            }).addTo(map);
        });
    }
}
