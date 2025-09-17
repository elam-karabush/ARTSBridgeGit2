import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { updateRecord } from 'lightning/uiRecordApi';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';

import { publish, MessageContext } from 'lightning/messageService';
import RefreshFiles from '@salesforce/messageChannel/RefreshFiles__c';

export default class FileUploader extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api fileTypes;
    @api label;

    @wire(MessageContext)
    messageContext;

    handleUploadFinished(event) {
        let files = event.detail.files;
        let msg = 
            files.length > 1 
            ? files.length + ' files uploaded successfully.' 
            : 'File successfully uploaded.';

        const toastEvt = new ShowToastEvent({
            title: 'Success',
            variant: 'success',
            message: msg,
        });
        this.dispatchEvent(toastEvt);
        
        publish(this.messageContext, RefreshFiles, null);
    }
}