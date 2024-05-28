import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private platform: Platform) {}

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    if (this.platform.is('hybrid')) {
      const savedImageFile = await this.savePicture(capturedPhoto);
      console.log('Saved image file:', savedImageFile);
    } else {
      this.savePictureWeb(capturedPhoto);
    }
  }

  private async savePicture(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      return savedFile.uri;
    } else {
      return Filesystem.getUri({
        directory: Directory.Data,
        path: fileName
      }).then((fileUri) => {
        return fileUri.uri;
      });
    }
  }

  private async savePictureWeb(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const fileName = new Date().getTime() + '.jpeg';

    saveAs(blob, fileName);
  }

  private async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!
      });

      return file.data;
    } else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  private convertBlobToBase64(blob: Blob): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }
}
