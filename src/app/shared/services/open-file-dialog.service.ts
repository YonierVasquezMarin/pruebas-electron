import { Injectable } from '@angular/core';
import { ChannelAnswer } from '../class/channel-answer';
import { SYSTEM_ACTIONS } from '../system-actions/system-actions.enum';

@Injectable({
    providedIn: 'root',
})
export class OpenFileDialogService {
    async openFileDialog(params: Object): Promise<ChannelAnswer> {
        return new Promise((resolve, reject) => {
            const arg = window.ipcRenderer.sendSync('open-file-dialog', params);
            if (arg.ok) {
                resolve(arg);
            } else {
                reject(SYSTEM_ACTIONS.FILE_NOT_SELECTED);
            }
        });
    }
}
