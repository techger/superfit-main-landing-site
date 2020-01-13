import { Injectable } from '@angular/core';
import { tap, take, map } from "rxjs/operators"
import { Observable } from 'rxjs';
import {
  IPhotoResponse_V1,
  IVideoResponse_V1
} from "superfitjs";
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class PhotoService {

  private images = new Map<string, any>()

  constructor(
    private readonly apiService: ApiService
  ) {

  }

  private fetchAndCachePhotos(ids: string[]): Observable<IPhotoResponse_V1[]> {
    return this.apiService.fetchPhotos(ids)
      .pipe(
        tap(photos => {
          for (let photo of photos) {
            this.images.set(photo.id, photo)
          }
        }),
        take(1)
      )
  }

  private fetchAndCacheVideos(ids: string[]): Observable<IVideoResponse_V1[]> {
    return this.apiService.fetchVideos(ids)
      .pipe(
        tap(videos => {
          for (let video of videos) {
            this.images.set(video.id, video)
          }
        }),
        take(1)
      )
  }

  async getPhoto(id: string): Promise<IPhotoResponse_V1 | undefined> {
    let cachedPhoto = this.images.get(id)
    if (cachedPhoto) {
      return cachedPhoto
    } else {
      return this
        .fetchAndCachePhotos([id])
        .pipe(map(photos => photos[0]))
        .toPromise()
    }
  }

  async getVideo(id: string): Promise<IVideoResponse_V1 | undefined> {
    let cachedVideo = this.images.get(id)
    if (cachedVideo) {
      return cachedVideo
    } else {
      return this
        .fetchAndCacheVideos([id])
        .pipe(map(videos => videos[0]))
        .toPromise()
    }
  }
}

