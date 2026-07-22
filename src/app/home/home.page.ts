import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonIcon,
  IonRange,
  IonCol,
  IonRow,
  IonFooter,
  IonLabel,
  IonToolbar,
  IonItem,
  IonList,
  IonContent,
  IonTitle,
  IonHeader,
} from '@ionic/angular/standalone';
import { NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  play,
  pause,
  playBackCircleOutline,
  playForwardCircleOutline
} from 'ionicons/icons';

addIcons({
  play,
  pause,
  playBackCircleOutline,
  playForwardCircleOutline
});

// @ts-ignore
import { Howl } from 'howler';

export interface Track {
  name: string;
  path: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,

    // Ionic components
    FormsModule,
    IonButton,
    IonCol,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonRange,
    IonRow,
    IonTitle,
    IonToolbar,
  ],
})
export class HomePage implements OnInit {
  playlist: Track[] = null as any;
  loadedPlaylist: Track[] = null as any;

  activeTrack: Track = null as any;
  player: Howl = null as any;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', { static: false }) range: IonRange = null as any;

  constructor() {}

  ngOnInit() {
    this.loadedPlaylist = [
      {
        name: 'Funny Song',
        path: './assets/mp3/bensound-funnysong.mp3',
      },
      {
        name: 'Jazzy Frenchie',
        path: './assets/mp3/bensound-jazzyfrenchy.mp3',
      },
      {
        name: 'Love',
        path: './assets/mp3/bensound-love.mp3',
      },
      {
        name: 'A New Beginning',
        path: './assets/mp3/bensound-anewbeginning.mp3',
      },
      {
        name: 'Better Days',
        path: './assets/mp3/bensound-betterdays.mp3',
      },
      {
        name: 'Cute',
        path: './assets/mp3/bensound-cute.mp3',
      },
      {
        name: 'Hey',
        path: './assets/mp3/bensound-hey.mp3',
      },
      {
        name: 'Tomorrow',
        path: './assets/mp3/bensound-tomorrow.mp3',
      },
      {
        name: 'Slow Motion',
        path: './assets/mp3/bensound-slowmotion.mp3',
      },
      {
        name: 'Moose',
        path: './assets/mp3/bensound-moose.mp3',
      },
      {
        name: 'Adventure',
        path: './assets/mp3/bensound-adventure.mp3',
      },
    ];
    this.initializeSongs();
  }

  start(track: Track) {
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {},
    });
    this.player.play();
  }

  togglePlayer(pause: any) {
    this.isPlaying = !pause;
    if (pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  next() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index != this.playlist.length - 1) {
      this.start(this.playlist[index + 1]);
    } else {
      this.start(this.playlist[0]);
    }
  }

  prev() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index > 0) {
      this.start(this.playlist[index - 1]);
    } else {
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }

  seek() {
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000);
  }

  initializeSongs() {
    this.playlist = this.loadedPlaylist;
  }

  filterSongs(event: any) {
    this.initializeSongs();
    const val = event.target.value;
    if (!val) {
      return;
    }
    this.playlist = this.playlist.filter((currentSong) => {
      if (currentSong.name && val) {
        if (currentSong.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
      }
      return false;
    });
  }
}
