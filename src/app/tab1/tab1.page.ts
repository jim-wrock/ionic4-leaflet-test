import { Component } from "@angular/core";
import { Map, latLng, tileLayer, Layer, marker, geoJSON, GeoJSON } from "leaflet";

@Component({
	selector: "app-tab1",
	templateUrl: "tab1.page.html",
	styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
	map: Map;
	propertyList: GeoJSON.FeatureCollection<any>;

	ionViewDidEnter() {
		this.leafletMap();
	}

	leafletMap() {
		// In setView add latLng and zoom
		this.map = new Map("mapId").setView([0, 100], 3);

		tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution: "edupala.com © ionic LeafLet",
		}).addTo(this.map);

		fetch("/assets/data.json")
			.then(res => res.json())
			.then(json => {
				console.log(json);
				this.propertyList = json;
				geoJSON(this.propertyList).addTo(this.map);
			});

		marker([28.6, 77])
			.addTo(this.map)
			.bindPopup("Ionic 4 <br> Leaflet.")
			.openPopup();
	}

	/** Remove map when we have multiple map object */
	ionViewWillLeave() {
		this.map.remove();
	}
}