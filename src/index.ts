import { Dropbox, sharing } from 'dropbox';

const sharedLink = '<shared_link_uri>';

console.log('Will check shared link');

const dbx = new Dropbox({ accessToken: process.env.DBX_ACCESS_TOKEN });

console.log('Auth done');

(async function () {

    const metadata: any = await dbx.sharingGetSharedLinkMetadata({ url: sharedLink });

    if (metadata?.result?.link_permissions?.allow_download === true) {
        const files = await listFiles(sharedLink, '');

        console.log(files);
    }

})()

async function listFiles(sharedLinkUrl: string, path: string) {
    const files = await dbx.filesListFolder({ 
        path: path,
        recursive: false, // not supported for shared links
        shared_link: { url: sharedLinkUrl }
    });

    const filesList: string[] = [];

    const fileMaps = files.result.entries
        .map(async f => {
            if (f['.tag'] == 'file') {
                filesList.push(f.path_lower);
            }
            else if (f['.tag'] == 'folder') {
                const ddd = await listFiles(sharedLinkUrl, f.path_lower);

                filesList.push(...ddd);
            }
        });

    await Promise.all(fileMaps);

    return filesList;
}