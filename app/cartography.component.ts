import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Language } from './language';
import { LanguageService } from './language.service';

declare var L: any;

@Component({
  selector: 'cartography',
  templateUrl: 'app/cartography.component.html',
  styleUrls: [
        'assets/css/cartography.css',
        'assets/css/MarkerCluster.css',
        'assets/css/MarkerCluster.Default.css'
    ]
})
export class CartographyComponent implements OnInit {
    languages: Language[] = [];
    constructor(
        private router: Router,
        private languageService: LanguageService
    ){ }
    ngOnInit(): void {
        var map_container = document.getElementsByClassName('cartography')[0];
        this.map = L.map(map_container).setView([51.505, -0.09], 2);
        L.tileLayer('//{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            minZoom: 1,
            maxZoom: 10,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(this.map);
        var markers_danger = L.markerClusterGroup({ chunkedLoading: true });
        var markers_live = L.markerClusterGroup({ chunkedLoading: true });
        this.languageService.getLanguages()
            .then((languages) => {
                        this.languages = languages;
                        for(var i in this.languages){
                            var lng = languages[i]; 
                            var title = lng.name;
                            var positions = lng.positions;
                            var lat = positions[0];
                            var lng = positions[1];
                            //var state = lng.
                            var marker = L.marker(L.latLng(lat, lng), { title: title });
                            var marker.bindPopup(title);
                            //if 
                            markers_danger.addLayer(marker);
                            markers_live.addLayer(marker);
                        }
                        this.map.addLayer(markers_danger);
                        this.map.addLayer(markers_live);
                    }
                );

        /*    
        console.log(languages_to_show);
        for(var i = 0; i < languages_to_show.length; i++){
            console.log(languages_to_show[i]);
        }*/

    }
}
