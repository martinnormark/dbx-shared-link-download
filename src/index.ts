import { Dropbox } from 'dropbox';

const sharedLink = '';

console.log('Will check shared link');

const dbx = new Dropbox({ accessToken: '' });

const sharedMetadata = await dbx.sharingGetSharedLinkMetadata()
