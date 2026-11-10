import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SpotifyService],
    standalone: false
})
export class SearchComponent implements OnInit {
  searchString:string = '';
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  resultCategory:string = null;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    //TODO: call search function in spotifyService and parse response
    if(!this.searchString || !this.searchString.trim()){
      return;
    }
    var category:string = this.searchCategory;
    this.spotifyService.searchFor(category, this.searchString).then((results) => {
      this.resources = results;
      this.resultCategory= category;
    });
  }
  get trackResults():TrackData[]{
    return this.resources as TrackData[];
  }

}
