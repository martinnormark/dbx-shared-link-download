import { Dropbox, sharing } from 'dropbox';

const sharedLink = '<shared_link_uri>';

console.log('Will check shared link');

const dbx = new Dropbox({ accessToken: process.env.DBX_ACCESS_TOKEN });

console.log('Auth done');

const metadataCall = dbx.sharingGetSharedLinkMetadata({ url: sharedLink })
    .then((data: any) => {
        console.log(data);

        const filesRequest = dbx.filesListFolder({ 
            path: '',
            recursive: false, // not supported for shared links
            shared_link: { url: sharedLink }
        })
        .then((files: any) => {
            console.log('shared files', files.entries)
        })
        .catch((err: any) => console.error(err));
    })
    .catch((err: any) => {
        console.error(err);
    });

Promise.all([metadataCall])
    .then(() => console.log('Done that'));