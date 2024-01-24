import { Injectable } from '@angular/core';
import { ChannelAnswer } from '../class/channel-answer';
import { SYSTEM_ACTIONS } from '../system-actions/system-actions.enum';

@Injectable({
    providedIn: 'root',
})
export class OpenFileDialogService {
    constructor() {}

    async openFileDialog(params: Object): Promise<ChannelAnswer> {
        return new Promise((resolve, reject) => {
            window.ipcRenderer.send('open-file-dialog', params);
            window.ipcRenderer.on(
                'file-dialog-opened',
                (event: any, arg: ChannelAnswer) => {
                    if (arg.ok) {
                        resolve(arg);
                    } else {
                        reject(SYSTEM_ACTIONS.FILE_NOT_SELECTED);
                    }
                }
            );
        });
    }
}
