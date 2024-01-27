import { Injectable } from '@angular/core';
import { SYSTEM_ACTIONS } from '../system-actions/system-actions.enum';
import { ChannelAnswer } from '../class/channel-answer';

@Injectable({
  providedIn: 'root'
})
export class ConvertPdfToImagesService {
  async convertPdfToImages(params: Object): Promise<ChannelAnswer> {
    return new Promise((resolve, reject) => {
      const arg = window.ipcRenderer.sendSync('convert-pdf-to-images', params);
      if (arg.ok) {
        resolve(arg);
      } else {
        reject(SYSTEM_ACTIONS.RESOURCE_NOT_GENERATED);
      }
    });
  }
}
