import FileResizer from 'react-image-file-resizer';

export function compresserImage(image, format = "PNG", qualite = 100) 
{
    return new Promise((resolve) => {
        FileResizer.imageFileResizer(
            image,
            1920,
            1080,
            format,
            qualite,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
        )
    });
}
        